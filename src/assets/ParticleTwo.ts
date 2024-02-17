export class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;

    constructor(mouseX: number, mouseY: number){
        this.x = mouseX;
        this.y = mouseY;
        this.size = Math.random() * 16 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
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
            context.fillStyle = '#79c2d0'; 
            context.strokeStyle = '#fff'; 
            context.lineWidth = 6;
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.fill(); 
            context.stroke();  

            context.strokeStyle = '#ffc93c'; 
            context.lineWidth = 4;
            context.beginPath();
            context.arc(this.x, this.y, this.size + 8, 0, Math.PI * 2);
            context.stroke(); 

            context.strokeStyle = '#ffc93c'; 
            context.lineWidth = 2;
            context.beginPath();
            context.arc(this.x, this.y, this.size + 18, 0, Math.PI * 2);
            context.stroke();

            context.strokeStyle = '#79c2d0'; 
            context.lineWidth = 3;
            context.beginPath();
            context.arc(this.x, this.y, this.size + 24, 0, Math.PI * 2);
            context.stroke();
        }
    }
}