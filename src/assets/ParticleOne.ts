export class ParticleOne {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;

    constructor(mouseX: number, mouseY: number, hue: number){
        this.x = mouseX;
        this.y = mouseY;
        this.size = Math.random() * 12 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
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
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.fill();     
        }
    }
}