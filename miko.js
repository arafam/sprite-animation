class Miko {
    constructor(game) {
        this.game = game;
        this.x = 200;
        this.y = 200;
        this.speed = 5;
        this.facing = 1; // 1 for right, -1 for left
        
        // Auto movement parameters
        this.patrolling = true;
        this.minX = 50;  // Left boundary
        this.maxX = 800; // Right boundary
        
        // Physics parameters
        this.jumpInitialVelocity = -15;
        this.gravity = 0.8;
        this.jumpVelocity = 0;
        this.jumpStartY = this.y;
        this.isInAir = false;
        
        // Load sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Miko.png");
        
        // States
        this.state = "walk"; // Start in walking state
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
        if (this.patrolling) {
            // Move based on facing direction
            this.x += this.speed * this.facing;
            
            // Change direction when reaching boundaries
            if (this.x >= this.maxX) {
                this.facing = -1;
                this.x = this.maxX;
            } else if (this.x <= this.minX) {
                this.facing = 1;
                this.x = this.minX;
            }
            
            // Keep walking animation
            this.state = "walk";
        }
        
        // Optional: Add random actions
        if (Math.random() < 0.005) { // 0.5% chance each frame
            this.state = "kick";
            this.animations["kick"].reset();
            setTimeout(() => {
                this.state = "walk";
            }, 300); // Return to walking after 300ms
        }
        
        // Optional: Add random jumps
        if (Math.random() < 0.002 && !this.isInAir) { // 0.2% chance each frame
            this.isInAir = true;
            this.state = "jump";
            this.jumpVelocity = this.jumpInitialVelocity;
            this.animations["jump"].reset();
        }
        
        // Handle jumping physics if in air
        if (this.isInAir) {
            this.y += this.jumpVelocity;
            this.jumpVelocity += this.gravity;

            if (this.y >= this.jumpStartY) {
                this.y = this.jumpStartY;
                this.isInAir = false;
                this.state = "walk";
            }
        }

        // Check if attack animations are done
        if ((this.state === "hit" && this.animations["hit"].isDone()) || 
            (this.state === "kick" && this.animations["kick"].isDone())) {
            this.state = "walk";
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










