class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop) {
        // Sprite sheet properties
        this.spritesheet = spritesheet;
        this.xStart = xStart;
        this.yStart = yStart;
        this.height = height;
        this.width = width;
        
        // Animation properties
        this.frameCount = frameCount;
        this.frameDuration = frameDuration;
        this.framePadding = framePadding;
        this.reverse = reverse;
        this.loop = loop;

        // Animation state
        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
    }

    drawFrame(tick, ctx, x, y, scale = 1) {
        this.elapsedTime += tick;
        if (this.elapsedTime > this.totalTime) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;

        ctx.drawImage(this.spritesheet,
            this.xStart + frame * (this.width + this.framePadding),
            this.yStart,
            this.width,
            this.height,
            x,
            y,
            this.width * scale,
            this.height * scale);
    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }

    isDone() {
        return this.elapsedTime >= this.totalTime;
    }
}





