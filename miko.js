class Miko {
    constructor(game) {
        this.game = game;
        this.x = 20;
        this.y = 400;
        this.speed = 9;
        this.facing = 1; // 1 for right, -1 for left
        
        // Auto movement parameters
        this.patrolling = true;
        this.minX = 20;  // Left boundary
        this.maxX = 2000; // Right boundary
        //this.maxX = this.game.canvasWidth; // Dynamically set to canvas width
        
        // Physics parameters
        this.jumpInitialVelocity = -25;
        this.gravity = 0.9;
        this.jumpVelocity = 0;
        this.jumpStartY = this.y;
        this.isInAir = false;
        
        // Load sprite sheet
        //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Miko.png");
        //this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Red.png");
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Miko2.png");
        
        // States
        this.state = "walk"; // Start in walking state
        this.animations = {};

        //const scaleFactor = 100; // Reduce size to 50%
        
        // Idle animation (single frame)
        this.animations["idle"] = new Animator(
            this.spritesheet,
            0,     // x coordinate
            0,    // y coordinate
            0,    // frame width
            0,    // frame height
            1,      // frame count
            0.2,    // frame duration
            0,      // padding
            false,  // reverse
            true    // loop
        );

        // Hit animation 
        this.animations["hit"] = new Animator(
            this.spritesheet, 
            85,     // x coordinate   
            55,     // y coordinate 
            185,    // frame width
            221,    // frame height    
            6,      // frame count
            0.2,      // frame duration
            0,      // padding
            false,  // reverse
            true    // loop
        );

        // Walk animation 
        this.animations["walk"] = new Animator(
            this.spritesheet, 
            22,     // x coordinate   
            281,    // y coordinate
            200,    // frame width
            217,    // frame height    
            6,      // frame count
            0.2,    // frame duration
            0,      // padding
            false,  // reverse
            true    // loop
        );

        // Jump animation 
        this.animations["jump"] = new Animator(
            this.spritesheet,
            135,    // x coordinate
            122,    // y coordinate 
            55,     // frame width
            64,     // frame height
            3,      // frame count
            0.2,    // frame duration
            0,      // padding
            false,  // reverse
            false   // loop
        );

        // Kick animation 
        this.animations["kick"] = new Animator(
            this.spritesheet,
            334,    // x coordinate
            18,     // y coordinate
            55,     // frame width
            64,     // frame height
            2,      // frame count
            1,      // frame duration
            0,      // padding
            false,  // reverse
            false   // loop
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
        if (Math.random() < 0.009) { // 0.9% chance each frame
            this.state = "kick";
            this.animations["kick"].reset();
            setTimeout(() => {
                this.state = "walk";
            }, 200); // Return to walking after 300ms
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

        // Scale down the character
        const scaleFactor = 0.5; 
        
        // Applying scaling and fliping if facing left
        if (this.facing === -1) {
            //ctx.scale(-1, 1);
            ctx.scale(-1 * scaleFactor, 1 * scaleFactor);
            ctx.translate(-this.x * 2, 0);
        }else {
            ctx.scale(scaleFactor, scaleFactor);
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










