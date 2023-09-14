const scene=new THREE.Scene();  //Se crea la escena donde estarán los cubos interactuando.
scene.background =new THREE.Color(0x000000) //Color del fondo del cubo.

//Creación de la caámara, desde donde se verá todo.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);   
const renderer = new THREE.WebGLRenderer(precision='lowp');

renderer.setSize(window.innerWidth,window.innerHeight); //Ajustes para la parte visual.
document.body.appendChild(renderer.domElement);

let rule={E1:5,E2:7,F1:6,F2:6}  //Regla con la que trabajaremos

let main=new Main();    //Creación de los datos iniciales.
let dens=main.getDens(); //Densisdad inicial
let cubesSize=main.getCubesSize();  //Tamaño del cubo inicial

//Creación del sistema completo
let cube= new Cubes(cubesSize,dens,rule);   
cube.createCube();

camera.position.y=2;

//Variables varias para el funcionamiento del programa.
let angle=0;
let gen=0;
let densn0=0
let densn1=1
console.log("Generacion // Densidad")
function animate(){
    if (densn0!=densn1 && isNaN(densn1)!=true){
        //Si el sistema está estable, o si desaparecen todas las celdas el programa se detiene.
        requestAnimationFrame(animate);
    }
    //Posición de la camara en el espacio
    camera.position.z=3;
    camera.position.x=2;
    camera.position.y=2.87;
    camera.lookAt(0,0.5,0);

    densn0=cube.getDens()/(cube.getLives()) //Densidad de la generación n-1
    //Funcionamiento del programa
    cube.doThings();
    cube.actualice(renderer,scene,camera); //Actualizar a la generación n
    gen+=1//Conteo de las generaciones
    densn1=cube.getDens()/(cube.getLives()) //Densisdad de la generación n

    //Arrojar los datos de densidad a la consola de Javascript.
    if (isNaN(densn1)){
        console.log(gen,0)
    }
    else{
        console.log(gen,densn1)
    }
}
animate(); //Inicio del programa.
