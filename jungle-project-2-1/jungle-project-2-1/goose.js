let rnd = (l,u) => Math.random() * (u-l) + l
let scene;
let animals = [];
window.onload = function(){
  scene = document.querySelector("a-scene");

  for(let i = 0; i < 10; i++){
    let x = rnd(-10,10);
    let z = rnd(-10,10);
    let animal = document.createElement("a-gltf-model");
    animal.setAttribute("src","#whi");
    animal.setAttribute("animation-mixer","");
    animal.setAttribute("position",{x:x,y:0,z:z});
    scene.append(animal);

    animals.push(animal)
  }

  loop();
}
function loop(){
  for(let animal of animals){
    animal.object3D.position.z += 0.01;
  }

  setTimeout(loop,10);
}