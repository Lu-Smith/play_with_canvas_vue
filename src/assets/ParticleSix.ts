export class ParticleSix {
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
        this.speedX = Math.random() * 5 - 1.5;
        this.speedY = Math.random() * 5 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if ( this.size > 0.2) {
            this.size -= 0.1
        }
        if ( this.size < 30 && this.size > 15) {
            this.color = '#ffc93c'
        } else {
            this.color = '#79c2d0';
        }
    }

    draw(context: CanvasRenderingContext2D) {
        //Draw particles
        if (context) {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);

        //stroke
            context.strokeStyle = 'white'; 
            context.lineWidth = 4;
            context.strokeRect(this.x, this.y, this.size, this.size);  
        }
    }
}