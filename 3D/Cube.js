class Cubes{
    //De forma análoga a cells es lo que el cubo en general sabe hacer.
    constructor(cubesize,dens,rule){
        this.size=cubesize; //Tamaño del cubo que contrendrá las celdas.
        this.dens=dens; //Densisdad inicial
        this.rule=rule; //Regla con la que trabaja

        this.geometry= new THREE.BoxGeometry(3/(2*this.size),3/(2*this.size),3/(2*this.size));
        //Variable que guarda la información visual de cada celda
    };
    //Métodos
    createCube(){
        //Crea las celdas dentro de una matríz de tres dimennsiones.
        let material;
        let cubeColor;
        this.cubes=[]; //Creación de la matriz tridimensional.
        for (let i=0;i<this.size;i++){
            this.cubes.push([]) //"Se crea" la primera dimensión
            for (let j=0;j<this.size;j++){
                this.cubes[i].push([]) //Luego la segunda dimensión
                for(let k=0;k<this.size;k++){
                    //Finalmente la tercera dimensión de la matriz se llena de celdas.
                    cubeColor=((i*i+k*k+j*j)/(3*this.size*this.size)+50)*0xff0000
                    material= new THREE.MeshBasicMaterial({color: cubeColor,transparent:true, opacity:0.3});
                    //Según el valor de la densidad inicial se llena de n% celdas vivas.
                    if (Math.random()*100<=this.dens){
                        this.cubes[i][j].push(new Cell(i,j,k,true,this.rule,this.geometry,material,this.size));
                    }
                    else{
                        this.cubes[i][j].push(new Cell(i,j,k,false,this.rule,this.geometry,material,this.size));
                    };
                };
            };
        };
        return this.cubes;  //Retorna la matriz creada, la cual contiene toda la información.
    };
    doThings(){ //En esete método cada cubo hace una cosa en específico
        this.cubes.forEach(xc=>{
            xc.forEach(yc=>{
                yc.forEach(zc=>{
                    let O=this.createEntorn(zc);//Crea una vecindad con todas las celdas vivas próximas.
                    zc.compare(O) //Compara si debe estar viva o muerta según las condiciones del juego.
                });
            });
        });
    };
    createEntorn(zc){//Selecciona de las 26 celdas de al rededor sólo las que están vivas
        let n=0;
        for(let i=-1;i<2;i++){
            for(let j=-1;j<2;j++){
                for(let k=-1;k<2;k++){
                    if(i!=0 || k!=0 || j!=0){
                        if(zc.x+i!=-1 && zc.y+j!=-1 && zc.z+k!=-1 && zc.z+k!=this.size && 
                            zc.x+i!=this.size && zc.y+j!=this.size){
                            if (this.cubes[zc.x+i][zc.y+j][zc.z+k].life){
                                n+=1; //Y las cuenta para que se pueda comparar con este valor.
                            }
                        }
                    }
                }
            }
        }
        return n; //Retorna el número de celdas vivas en la vecindad.
    }
    actualice(renderer,scene,camera){ 
        //Aún no se ha actualizado el estado de todo el sistema, así que de eso se encarga este método.
        this.dens=0 //Resetea la densisdad DEL SISTEMA COMPLETO.
        this.lives=0 //Resetea el número de celdas vivas en cada generación.
        this.cubes.forEach(xc=>{
            xc.forEach(yc=>{
                yc.forEach(zc=>{
                    if(zc.life){
                        this.lives+=1; //Cuenta el número de celdas vivas
                        this.dens+=zc.dens();//Hace un conteo de la densidad
                    }
                    zc.life=zc.life2; //Actualiza el estado del sistema
                    if(this.size<=50){ 
                        //Por temas de optimización el sistema no se dibuja para cubos muy grandes.
                        zc.draw()
                    };
                });
            });
        });
        renderer.render(scene,camera); //Actualiza la imágen que se verá en pantalla.
    };
    getDens(){return this.dens};    //Devuelve la densidad del sistema.
    getLives(){return this.lives};  //Devuelve el número de celdas vivas.
};