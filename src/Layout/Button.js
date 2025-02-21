// Button.js

export default class Button {
    constructor(that, x, y, w, h) {
        this.game = that;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.fontHeight = "30"
        this.game.ctx.font = `${this.fontHeight}px Arial`;
        this.text = "TEST";
        this.textWidth = this.game.ctx.measureText(this.text);
        this.paddingUB = 15;
        this.paddingLR = 55;
        this.eventFunction;
        this.clickListener = this.handleClick.bind(this);

        this.btnWidth = this.textWidth.width + (this.paddingLR * 2);
        this.btnHeight = this.fontHeight - 6 + (this.paddingUB * 2);
        
        console.log(this.x, this.y, this.width, this.height, this.textWidth);
        this.create();
    }

    create() {
        this.addEventListener();
        return this;
    }
    
    update(dt) {}

    render(ctx) {
        // console.log("Rendering");
        this.btnWidth = this.textWidth.width + (this.paddingLR * 2);
        this.btnHeight = this.fontHeight - 6 + (this.paddingUB * 2);
        ctx.fillStyle = "lightgray";
        ctx.fillRect(this.x, this.y, this.btnWidth, this.btnHeight);

        // ctx.font = "20px Helvetica";
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        // ctx.fillText(this.text, this.x + this.width/2 - this.textWidth.width/2, this.y);
        ctx.fillText(this.text, this.x + this.paddingLR, this.y + this.paddingUB);
    }

    setText(text) {
        this.text = text;
        return this;
    }

    handleClick(event) {
        const rect = this.game.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (x >= this.x && x <= this.x + this.btnWidth &&
            y >= this.y && y <= this.y + this.btnHeight) {
            console.log(`Button ${this.text} clicked!`);
            if (this.eventFunction) {
                this.eventFunction();
            }
        }
    }

    addEventListener() {
        this.game.canvas.addEventListener('click', this.clickListener);
        // this.game.canvas.addEventListener('click', (event) => {
        //     const rect = this.game.canvas.getBoundingClientRect();
        //     const x = event.clientX - rect.left;
        //     const y = event.clientY - rect.top;

        //     if (x >= this.x && x <= this.x + this.btnWidth &&
        //         y >= this.y && y <= this.y + this.btnHeight) {
        //         console.log(`Button ${this.text} clicked!`);
        //         if (this.eventFunction) {
        //             this.eventFunction();
        //         }
        //         // Add your button click logic here
        //     }
        // });
    }

    setEventFunction(func) {
        this.eventFunction = func;
        return this;
    }

    destroyEventListener() {
        this.game.canvas.removeEventListener('click', this.clickListener);
        // this.game.canvas.removeEventListener('click', () => {});
    }
}