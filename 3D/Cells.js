class Cell{
    //El constructor es el método inicial que se encarga de crear cada celda.
    constructor(x,y,z,life,rule,geometry,material,cubesSize){
        //Se ppreguntan los parámetros iniciales de cada una de las celdas

        this.x=x; 
        this.y=y;   //Posición en el tensor o matríz de 3 dimensiones.
        this.z=z;

        this.life=life; //Estado inicial de la celda.
        this.life2=life;//Estado auxiliar de la celda (Se verá más adelante).

        this.rule=rule;//La regla con la que el sistema trabajará.
        this.n=0;//Variable que cuenta el número de celdas vivas al rededor de cada celda(Solo se inicializó).


        this.cube=new THREE.Mesh(geometry,material);
        this.cube.position.z=this.z*2/cubesSize-1;     //Variables para la parte gráfica.
        this.cube.position.y=this.y*2/cubesSize;
        this.cube.position.x=this.x*2/cubesSize-1;
    }

    //Métodos que cada celda sabe hacer.
    draw(){ //Dibujarse en la pantalla
        if (this.life){
            scene.add(this.cube)
        }
        else{
            scene.remove(this.cube)
        }
    }
    compare(O){ //Sabiendo el número de celdas que tiene vivas al rededor decide que hacer, 
                //si cambiar o mantener el estado actual.
        this.n=O;
        if (this.life){//Si la celda está viva
            if(this.rule.E1<=this.n && this.n<=this.rule.E2){ 
                //Y se cumple la condición de mantener el estado, se guarda en una variable auxiliar.
                
                this.life2=true;
            }
            else{
                //Si no se cumplen las condiciones se cambia el estado de la celda.
                this.life2=false;
        }}
        else{//Si la celda no está viva
            if(this.rule.F1<=this.n && this.n<=this.rule.F2){
                //y se cumple la regla para revivir, se cambia el valor del estado auxiliar.
                this.life2=true;
            }
        }}
    //NO SE PUEDE CAMBIAR AÚN EL ESTADO DE LA CELDA, PRIMERO SE DEBE VERIFICAR EL ESTADO DEL SISTEMA COMPLETO.
    dens(){
        //Retorna la densidad local de cada celda.
        return this.n/26
    }
}