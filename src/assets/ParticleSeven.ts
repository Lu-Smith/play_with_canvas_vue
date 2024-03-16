export class ParticleSeven {
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
            context.fillStyle = '#bbe9db'; 
            context.strokeStyle = '#fafafa'; 
            context.lineWidth = 6;
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.fill(); 
            context.stroke();  

            context.strokeStyle = '#aeccc6'; 
            context.lineWidth = 4;
            context.beginPath();
            context.arc(this.x, this.y, this.size + 8, 0, Math.PI * 2);
            context.stroke(); 

            context.strokeStyle = '#757a79'; 
            context.lineWidth = 2;
            context.beginPath();
            context.arc(this.x, this.y, this.size + 18, 0, Math.PI * 2);
            context.stroke();

            context.strokeStyle = '#bbe9db'; 
            context.lineWidth = 3;
            context.beginPath();
            context.arc(this.x, this.y, this.size + 24, 0, Math.PI * 2);
            context.stroke();
        }
    }
}