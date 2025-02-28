let randomPosition = (l, u) => Math.floor(Math.random() * (u - l) + l);
let scene, clouds = [], trees = [], goose = [], rocks = [], cabin;

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// New FallableModel class
class FallableModel {
    constructor(modelId, position) {
        this.obj = document.createElement('a-entity');
        this.obj.setAttribute('gltf-model', modelId);
        this.obj.setAttribute('position', position);
        this.obj.setAttribute('scale', '0.015 0.015 0.015');

        this.obj.addEventListener('click', (event) => {
            event.stopPropagation();
            this.fall();
        });

        scene.appendChild(this.obj);
        this.isFallen = false;
    }

    fall() {
        if (!this.isFallen) {
            this.obj.setAttribute('animation', {
                property: 'rotation',
                from: '0 0 0',
                to: '0 0 90',
                dur: 2000,
                easing: 'easeOutQuad'
            });
            this.isFallen = true;
        }
    }
}

// Your existing Tree class with updated falling animation
class Tree {
    constructor(x, z) {
        this.x = x;
        this.z = z;
        this.r = 0;
        this.dr = 0;

        let offset = 2;
        this.obj = document.createElement("a-box");
        this.obj.setAttribute("height", 10);
        this.obj.setAttribute("width", 2);
        this.obj.setAttribute("depth", 2);
        this.obj.setAttribute("opacity", 0);

        let trunk = document.createElement("a-cylinder");
        trunk.setAttribute("position", {x: 0, y: 0 + offset, z: 0});
        trunk.setAttribute("height", 3);
        trunk.setAttribute("radius", 0.75);
        trunk.setAttribute("color", "brown");
        this.obj.append(trunk);

        let size = 2;
        for(let t = 1; t < 7; t++) { 
            let leaves = document.createElement("a-cone");
            leaves.setAttribute("position", {x: 0, y: 0.5 + t + offset, z: 0});
            leaves.setAttribute("height", 1.5);
            leaves.setAttribute("radius-bottom", size);
            leaves.setAttribute("radius-top", 0.1);
            leaves.setAttribute("color", "green");
            size -= 0.3;
            this.obj.append(leaves);
        }

        this.obj.setAttribute("position", {x: this.x, y: -1.5, z: this.z});

        this.obj.addEventListener('click', (event) => {
            event.stopPropagation();
            this.fall();
        });

        scene.append(this.obj);
        this.isFallen = false;
    }

    fall() {
        if (!this.isFallen) {
            this.obj.setAttribute('animation', {
                property: 'rotation.x',
                from: 0,
                to: 90,
                dur: 1000,
                easing: 'easeOutQuad'
            });
            this.isFallen = true;
        }
    }

    falldown() {
        if (this.r > -60) {
            this.r += this.dr;
            this.obj.setAttribute("rotation", {x: this.r, y: 0, z: 0});
        }
    }
}

class Cabin {
    constructor() {
        this.doorOpen = false;
        this.createMainStructure();
        this.createRoof();
        this.createDoor();
    }

    createMainStructure() {
        const walls = document.createElement('a-box');
        walls.setAttribute('position', '0 2 0');
        walls.setAttribute('width', '6');
        walls.setAttribute('height', '4');
        walls.setAttribute('depth', '6');
        walls.setAttribute('color', '#8B4513');
        scene.appendChild(walls);
    }

    createDoor() {
        this.door = document.createElement('a-box');
        this.door.setAttribute('position', '0 1.5 3.01');
        this.door.setAttribute('width', '1.2');
        this.door.setAttribute('height', '2.4');
        this.door.setAttribute('depth', '0.1');
        this.door.setAttribute('color', '#4A2F1B');

        this.door.setAttribute('animation', {
            property: 'rotation',
            dur: 1000,
            from: '0 0 0',
            to: '0 90 0',
            startEvents: 'click',
            dir: 'alternate'
        });

        this.door.addEventListener('click', () => {
            this.toggleDoor();
        });

        scene.appendChild(this.door);
    }

    createRoof() {
        const roof = document.createElement('a-cone');
        roof.setAttribute('position', '0 5 0');
        roof.setAttribute('radius-bottom', '4.5');
        roof.setAttribute('radius-top', '0');
        roof.setAttribute('height', '3');
        roof.setAttribute('color', '#4A2F1B');
        scene.appendChild(roof);
    }

    toggleDoor() {
        this.doorOpen = !this.doorOpen;
        if (this.doorOpen) {
            this.door.emit('click');
        }
    }
}

class Rock {
    constructor(x, z) {
        this.obj = document.createElement('a-entity');
        let scale = Math.random() * 1.5 + 0.5;

        this.obj.setAttribute('geometry', {
            primitive: 'dodecahedron',
            radius: scale
        });

        this.obj.setAttribute('material', {
            color: '#696969',
            roughness: 0.8,
            metalness: 0.2
        });

        this.obj.setAttribute('position', {
            x: x,
            y: scale/2,
            z: z
        });

        this.obj.setAttribute('rotation', {
            x: Math.random() * 360,
            y: Math.random() * 360,
            z: Math.random() * 360
        });

        // Add falling animation to rocks
        this.obj.addEventListener('click', (event) => {
            event.stopPropagation();
            this.fall();
        });

        scene.appendChild(this.obj);
        this.isFallen = false;
    }

    fall() {
        if (!this.isFallen) {
            this.obj.setAttribute('animation', {
                property: 'rotation',
                from: '0 0 0',
                to: '0 0 90',
                dur: 2000,
                easing: 'easeOutQuad'
            });
            this.isFallen = true;
        }
    }
}

function animate() {
    clouds.forEach(cloud => {
        cloud.fly();
    });
    requestAnimationFrame(animate);
}

function isNearCabin(x, z) {
    return Math.sqrt(x * x + z * z) < 10;
}

function makeModelFallable(model) {
    if (model) {
        model.addEventListener('click', function(event) {
            event.stopPropagation();
            model.setAttribute('animation', {
                property: 'rotation',
                from: '0 0 0',
                to: '0 0 90',
                dur: 2000,
                easing: 'easeOutQuad'
            });
        });
    }
}

window.onload = function() {
    scene = document.querySelector("a-scene");

    scene.addEventListener('loaded', function() {
        // Create cabin first
        cabin = new Cabin();

        // Make existing 3D models fallable
        let models = document.querySelectorAll('[gltf-model]');
        models.forEach(model => makeModelFallable(model));

        // Create trees (avoiding cabin area)
        for (let i = 0; i < 200; i++) {
            let x = randomPosition(-100, 100);
            let z = randomPosition(-50, 50);

            if (isNearCabin(x, z)) {
                continue;
            }

            let tree = new Tree(x, z);
            trees.push(tree);
        }

        // Create clouds
        for (let i = 0; i < 50; i++) {
            let x = rnd(-70, 70);
            let y = rnd(40, 30);
            let z = rnd(-70, 70);
            let cloud = new Cloud(x, y, z);
            clouds.push(cloud);
        }

        // Create rocks (avoiding cabin area)
        for (let i = 0; i < 80; i++) {
            let x = randomPosition(-100, 100);
            let z = randomPosition(-50, 50);

            if (isNearCabin(x, z)) {
                continue;
            }

            let rock = new Rock(x, z);
            rocks.push(rock);
        }

        animate();
    });
};