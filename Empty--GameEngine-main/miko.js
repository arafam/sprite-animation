class Miko {
    constructor(game) {
        this.game = game;
        this.x = 200;
        this.y = 200;
        this.speed = 5;
        this.facing = 1; // 1 for right, -1 for left
        
        // Load sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Miko.png");
        
        // States
        this.state = "idle";
        this.animations = {};
        
        // Initialize animations
        this.animations["idle"] = new Animator(
            this.spritesheet,
            14,     // x coordinate
            18,     // y coordinate
            37,     // frame width
            60,     // frame height
            1,      // frame count
            0.1,    // frame duration
            0,      // padding
            false,  // reverse
            true    // loop
        );
        
        this.animations["walk"] = new Animator(
            this.spritesheet,
            143,    // x coordinate of first frame
            211,    // y coordinate
            41,     // frame width
            63,     // frame height
            4,      // frame count
            0.15,   // frame duration
            45,     // padding between frames
            false,  // reverse
            true    // loop
        );
        
        // Add other animations here...
        // Jumping animation
        this.animations["jump"] = new Animator(
            this.spritesheet,
            141,    // x coordinate
            123,    // y coordinate
            45,     // frame width
            61,     // frame height
            3,      // frame count
            0.15,   // frame duration
            37,     // padding
            false,  // reverse
            false   // don't loop
        );
        
        // Kicking animation
        this.animations["kick"] = new Animator(
            this.spritesheet,
            335,    // x coordinate
            20,     // y coordinate
            51,     // frame width
            58,     // frame height
            2,      // frame count
            0.1,    // frame duration
            18,     // padding
            false,  // reverse
            false   // don't loop
        );
        
        // Hitting animation
        this.animations["hit"] = new Animator(
            this.spritesheet,
            142,    // x coordinate
            17,     // y coordinate
            52,     // frame width
            61,     // frame height
            2,      // frame count
            0.1,    // frame duration
            26,     // padding
            false,  // reverse
            false   // don't loop
        );
        
    }

    update() {
        if (this.game.keys["ArrowRight"]) {
            this.x += this.speed;
            this.state = "walk";
            this.facing = 1;
        } else if (this.game.keys["ArrowLeft"]) {
            this.x -= this.speed;
            this.state = "walk";
            this.facing = -1;
        } else {
            this.state = "idle";
        }
    }

    draw(ctx) {
        ctx.save();
        
        if (this.facing === -1) {
            ctx.scale(-1, 1);
            ctx.translate(-this.x * 2, 0);
        }
        
        this.animations[this.state].drawFrame(
            this.game.clockTick, 
            ctx, 
            this.x, 
            this.y
        );
        
        ctx.restore();
    }

}










