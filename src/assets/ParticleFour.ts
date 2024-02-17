export class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;

    constructor(mouseX: number, mouseY: number, hue: number){
        this.x = mouseX;
        this.y = mouseY;
        this.size = Math.random() * 40 + 1;
        this.speedX = Math.random() * 6 - 1.5;
        this.speedY = Math.random() * 6 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if ( this.size > 0.2) {
            this.size -= 0.1
        }
    }

    draw(context: CanvasRenderingContext2D | null, hue: number) {
        //Draw particles
        if (context) {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);

        //stroke
            context.strokeStyle = 'hsl(' + hue + 3 + ', 100%, 50%)'; 
            context.lineWidth = 2;
            context.strokeRect(this.x, this.y, this.size, this.size);  
        }
    }
}