let val = 0.75, strength = 0;
window.onload = function(){

  //lamp.onclick = function(){
    //strength += val;
    //val = -val;
    //lamp.setAttribute("light",{intensity:strength});
  //}  

  loop();
}

function loop(){
  light_source.object3D.rotation.z += 0.00050;
  window.requestAnimationFrame( loop );
}