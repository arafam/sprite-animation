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
        // State priority: jump > hit > kick > walk > idle
        if (this.state === "jump") {
            // Handles jump progression
            this.y += this.jumpVelocity;
            this.jumpVelocity += 1; // Gravity effect
    
            // End jump when back on ground
            if (this.y >= this.jumpStartY) {
                this.y = this.jumpStartY;
                this.state = "idle";
            }
            return; // Prevents other states from overriding
        }
    
        if (this.state === "hit" && !this.animations["hit"].isDone()) {
            return; // Waits for hit animation to finish
        }
    
        if (this.state === "kick" && !this.animations["kick"].isDone()) {
            return; // Wait for kick animation to finish
        }
    
        // Handle input for actions
        if (this.game.keys["ArrowUp"] && this.state !== "jump") {
            // Start jump
            this.state = "jump";
            this.jumpStartY = this.y;
            this.jumpVelocity = -15;
        } else if (this.game.keys["Space"]) {
            // Start hit animation
            this.state = "hit";
            this.animations["hit"].reset(); // Reset animation
        } else if (this.game.keys["KeyK"]) {
            // Start kick animation
            this.state = "kick";
            this.animations["kick"].reset(); // Reset animation
        } else if (this.game.keys["ArrowRight"]) {
            // Walk right
            this.x += this.speed;
            this.state = "walk";
            this.facing = 1;
        } else if (this.game.keys["ArrowLeft"]) {
            // Walk left
            this.x -= this.speed;
            this.state = "walk";
            this.facing = -1;
        } else {
            // Default to idle
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










