export class ParticleThree {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;

    constructor(mouseX: number, mouseY: number){
        this.x = mouseX;
        this.y = mouseY;
        this.size = Math.random() * 40 + 1;
        this.speedX = Math.random() * 4 - 1.5;
        this.speedY = Math.random() * 4 - 1.5;
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
            const numberOfPoints = 5;
            const innerRadius = this.size / 2;
            const outerRadius = this.size;
            let rotation = Math.PI / 2 * 3
            const angleIncrement = Math.PI / numberOfPoints;
            
            context.beginPath();
            context.moveTo(this.x + Math.cos(rotation) * outerRadius, this.y + Math.sin(rotation) * outerRadius * 0.5);

            for (let i = 0; i < numberOfPoints; i++) {
                rotation += angleIncrement;
                context.lineTo(this.x + Math.cos(rotation) * outerRadius, this.y + Math.sin(rotation) * outerRadius);
                rotation += angleIncrement;
                context.lineTo(this.x + Math.cos(rotation) * innerRadius, this.y + Math.sin(rotation) * innerRadius);
            }
            
            context.closePath();
            context.lineWidth = 2;
            context.strokeStyle = '#fff';
            context.stroke();    

            //circle
            context.fillStyle = '#fff'; 
            context.beginPath();
            context.arc(this.x, this.y, this.size/6, 0, Math.PI * 2);
            context.fill(); 

            //circle
            context.strokeStyle = '#fff'; 
            context.beginPath();
            context.arc(this.x, this.y, this.size/3, 0, Math.PI * 2);
            context.stroke(); 
}
    }
}