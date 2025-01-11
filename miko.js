class Miko {
    constructor(game) {
        this.game = game;
        this.x = 200;
        this.y = 200;
        this.speed = 7;
        this.facing = 1; // 1 for right, -1 for left
        
        // Auto movement parameters
        this.patrolling = true;
        this.minX = 50;  // Left boundary
        this.maxX = 900; // Right boundary
        
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
        
        // Idle animation (single frame)
        this.animations["idle"] = new Animator(
            this.spritesheet,
            0,      // x coordinate
            0,      // y coordinate
            37,     // frame width
            60,     // frame height
            1,      // frame count
            0.2,    // frame duration
            0,      // padding
            false,  // reverse
            true    // loop
        );
        
        // Hit animation (2 frames)
        this.animations["hit"] = new Animator(
            this.spritesheet,
            142,     // x coordinate
            17,      // y coordinate
            52,     // frame width
            60,     // frame height
            2,      // frame count
            0.2,    // frame duration
            0,      // padding
            false,  // reverse
            false   // loop
        );

        // Jump animation (3 frames)
        this.animations["jump"] = new Animator(
            this.spritesheet,
            143,      // x coordinate
            100,    // y coordinate (second row)
            45,     // frame width
            60,     // frame height
            3,      // frame count
            0.2,    // frame duration
            0,      // padding
            false,  // reverse
            false   // loop
        );

        // Kick animation (2 frames)
        this.animations["kick"] = new Animator(
            this.spritesheet,
            335,    // x coordinate
            100,    // y coordinate
            51,     // frame width
            60,     // frame height
            2,      // frame count
            0.2,    // frame duration
            0,      // padding
            false,  // reverse
            false   // loop
        );

        // Walk animation (4 frames)
        this.animations["walk"] = new Animator(
            this.spritesheet,
            143,      // x coordinate
            211,    // y coordinate (third row)
            42,     // frame width
            60,     // frame height
            4,      // frame count
            0.2,    // frame duration
            0,      // padding
            false,  // reverse
            true    // loop
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
        
        // Optional part: Adding random actions
        if (Math.random() < 0.006) { // 0.6% chance each frame
            this.state = "kick";
            this.animations["kick"].reset();
            setTimeout(() => {
                this.state = "walk";
            }, 400); // Return to walking after 400ms
        }
        
        // Optional part: Adding random jumps
        if (Math.random() < 0.005 && !this.isInAir) { // 0.5% chance each frame
            this.isInAir = true;
            this.state = "jump";
            this.jumpVelocity = this.jumpInitialVelocity;
            this.animations["jump"].reset();
        }
        
        // Handles jumping physics if in air
        if (this.isInAir) {
            this.y += this.jumpVelocity;
            this.jumpVelocity += this.gravity;

            if (this.y >= this.jumpStartY) {
                this.y = this.jumpStartY;
                this.isInAir = false;
                this.state = "walk";
            }
        }

        // Checks if attack animations are done
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










