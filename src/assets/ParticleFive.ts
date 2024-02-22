export class ParticleFive {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;

    constructor(mouseX: number, mouseY: number){
        this.x = mouseX;
        this.y = mouseY;
        this.size = Math.random() * 40 + 1;
        this.speedX = Math.random() * 4 - 1.5;
        this.speedY = Math.random() * 4 - 1.5;
        this.color = '#ffcbcb';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if ( this.size > 0.2) {
            this.size -= 0.1
        }
    }

    draw(context: CanvasRenderingContext2D | null) {
          //Draw particles
        if (context) {
        //half-circle stroke - bottom
            context.strokeStyle = '#ffcbcb'; 
            context.lineWidth = 3;
            context.beginPath();
            context.arc(this.x, this.y, this.size + 3, 0, Math.PI);
            context.stroke(); 

        //half-circle stroke -top
        context.strokeStyle = '#ffcbcb'; 
        context.lineWidth = 3;
        context.beginPath();
        context.arc(this.x + 20, this.y, this.size + 2, 10, Math.PI * 0.1);
        context.stroke(); 

        //circle
            context.fillStyle = '#f70776'; 
            context.beginPath();
            context.arc(this.x, this.y, this.size/3, 0, Math.PI * 2);
            context.fill(); 

        //stroke
            context.strokeStyle = '#407088'; 
            context.lineWidth = 4;
            context.strokeRect(this.x, this.y, this.size, this.size);  
        }   
    }
}