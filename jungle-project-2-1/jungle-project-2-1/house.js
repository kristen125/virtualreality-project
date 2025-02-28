class house {
  constructor() {
    // Main cabin structure
    this.createMainStructure();
    this.createRoof();
  }

  createMainStructure() {
    // Cabin walls
    const walls = document.createElement('a-box');
    walls.setAttribute('position', '0 2 0');
    walls.setAttribute('width', '6');
    walls.setAttribute('height', '4');
    walls.setAttribute('depth', '6');
    walls.setAttribute('color', '#8B4513');
    scene.appendChild(walls);

    // Door
    const door = document.createElement('a-box');
    door.setAttribute('position', '0 1.5 3.01');
    door.setAttribute('width', '1.2');
    door.setAttribute('height', '2.4');
    door.setAttribute('depth', '0.1');
    door.setAttribute('color', '#4A2F1B');
    scene.appendChild(door);
  }

  createRoof() {
    // Roof
    const roof = document.createElement('a-cone');
    roof.setAttribute('position', '0 5 0');
    roof.setAttribute('radius-bottom', '4.5');
    roof.setAttribute('radius-top', '0');
    roof.setAttribute('height', '3');
    roof.setAttribute('color', '#4A2F1B');
    scene.appendChild(roof);
  }
}

// Add this to your window.onload function, right after scene = document.querySelector("a-scene");
let house = new house();