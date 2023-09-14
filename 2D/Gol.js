const canvas= document.getElementById("canvas")

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
canvas.style.backgroundColor = '#000000';
const ctx=canvas.getContext('2d');
let rule={E1:2,E2:3,F1:3,F2:3}
let rule2={E1:3,E2:4,F1:3,F2:4}
class Cell{
    constructor(x,y,size,life,rule,r,g,b){
        this.x=x;
        this.y=y;
        this.size=size;
        this.life=life;
        this.life2=life;
        this.rule=rule;
        this.r=r;
        this.g=g;
        this.b=b;
        this.n=0;
    }
    draw(){
        ctx.beginPath()
        if (this.life){
            ctx.fillStyle=`rgba(${this.r},${this.g},${this.b},1)`;
        }
        else{
            ctx.fillStyle=`rgba(180,0,0,0.6)`;
        }
        ctx.fillRect(this.x,this.y,this.size,this.size);
    }
    dens(){
        return this.n/8
    }
    compare(O){
        this.n=O.length;
        if(this.life){
            if(this.rule.E1<=this.n && this.n<=this.rule.E2){
                this.life2=true;
            }
            else{
                this.life2=false;
            }
        }else{
            if(this.rule.F1<=this.n && this.n<=this.rule.F2){
                this.life2=true;
            }
        }
    }

    actualice(){
        this.life=this.life2;
    }
}
let size=0;
let xcorr=0;
let ycorr=0;
let l=490;
let dens=30;
if(l==0){
    l=prompt("Tama\361o del tablero  LxL (100 por defecto)");
}
if (l<0 || l==0){
    l=100;
}
if (dens==0){
    dens=prompt("Porcentaje de celdas iniciales vivas (0-100, 30% por defecto)");
}
if (dens==0){
    dens=30;
}
let conv=150/l;
let sep=(-1/50)*l+3;
let gen=0;
if (canvas.width<canvas.height){
    size=(canvas.width-(l-1)*sep)/l;
    ycorr=canvas.height/2-l/2*(size+sep);
    xcorr=0;
}
else{
    size=(canvas.height-(l-1)*sep)/l;
    xcorr=canvas.width/2-l/2*(size+sep);
    ycorr=0;
}
const cells=[];
for(let i=0;i<l;i++){
    cells.push([])
    for(let j=0;j<l;j++){
        if( Math.random()*100<=dens){
            cells[i].push(new Cell(i*(size+sep*canvas.width/1280)+xcorr,j*(size+sep*canvas.height/883)+ycorr,size,true, rule,i*conv+50,70,j*conv+50));
        }
        else{
            cells[i].push(new Cell(i*(size+sep*canvas.width/1280)+xcorr,j*(size+sep*canvas.height/883)+ycorr,size,false,rule))
        }
        
    }
}
const x=[], y=[];
function animate(){
    animvationId=requestAnimationFrame(animate);
    let lifes=0;
    let dens=0;
    ctx.fillStyle="#000"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    cells.forEach( (cell,index1) => {cell.forEach( (c,index2) => { 
        let O=[];
        for (let i=-1;i<2;i++){
            for(let j=-1;j<2;j++){
                if(index1+i!=-1 && index2+j!=-1 && index1+i!=l && index2+j!=l){
                    if(cells[index1+i][index2+j].life){
                        O.push(cells[index1+i][index2+j])
                    }
                }
            }
        }
        if (c.life){
            lifes+=1
            if (l<500){
                c.draw();
            }
        }
        c.compare(O)
    })
}
    );
    cells.forEach((cell) => {cell.forEach( (c) => {
        if(c.life){
            dens+=c.dens();
        }
        
        c.actualice()})});
    gen+=1;
    console.log(lifes/(l*l),dens/lifes)
}
animate()
