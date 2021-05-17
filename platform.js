class Platform{
    constructor(x,y,width,height){
        this.platform = Bodies.rectangle(x,y,width,height,{isStatic:true});
        this.width=width;
        this.height=height;
        this.image=loadImage("sprites/platf.png")
        World.add(world,this.platform);
    }
    display(){
        rectMode(CENTER);
        var pos=this.platform.position;
        var angle=this.platform.angle;
        push();
        fill("brown");
        imageMode(CENTER);
        image(this.image,pos.x,pos.y,this.width,this.height);
        pop();
    }
}