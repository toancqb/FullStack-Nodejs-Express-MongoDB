
class Animation {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.ball = new Ball(this.canvas, this.context, 100, 50, 5, 5);
        this.STOP = true;
    }

    moveAndDraw() {
        if(!this.STOP)
            this.ball.move();
        this.ball.draw();
    }

    stop() {
        this.STOP = true;
    }

    start() {
        this.STOP = false;
    }
}