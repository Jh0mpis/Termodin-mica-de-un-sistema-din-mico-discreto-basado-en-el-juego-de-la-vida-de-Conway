class Main{
    constructor(){
        this.cubesSize=0;   //Se inicializan las variiables del programa, 
        this.dens=0;        //tamaño del cubo y densidad inicial
        if(this.cubesSize==0){
            this.cubesSize=prompt("Valor de los lados del cubo (30 por defecto)");
            //A través de la máquina virtual se pregunta el tammaño del cubo al usuario.
        }
        if(this.cubesSize==0){    
            this.cubesSize=30;
            //Si no ingresa un valor, por defecto será 30.
        }
        if(this.dens==0){
            this.dens=prompt("Porcentaje de cubos vivios 0-100 (30 por defecto)");
            //A través de la máquina virtual se pregunta la densidad inicial al usuario.
        }
        if(this.dens==0){
            this.dens=30;
            //Si no ingresa un valor, por defecto será 30.
        }
        if(this.cubesSize%2!=0){
            this.cubesSize+=1;
            //Por preferencia el tamaño del cubo será par.
        }
    };
    getDens(){return this.dens};            //Da el valor de la densisdad inicial
    getCubesSize(){return this.cubesSize};  //Da el valor del tamaño del cubo
}