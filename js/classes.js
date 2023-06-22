//animating images
class Sprite{
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x:0, y:0}})
    {
        //OOP concept
        this.position = position;
        this.width = 50
        this.height = 150;
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0

        //how many frames lapsed over every animation
        this.framesElapsed = 0

        //how many frames to go through before changing frameCurrent
        this.framesHold = 10
        this.offset = offset
    }

    draw(){
        c.drawImage(
            this.image, 
            //for animation of the shop image
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height, 
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale) 
    }

    animateFrames(){
        this.framesElapsed++

        //to animate the shop
        if(this.framesElapsed % this.framesHold === 0)
        {
            if (this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }
 
    //properties that are updated to move the Sprite around
    update(){
        this.draw()
        this.animateFrames()
    }
}

//creating an object
class Fighter extends Sprite {
    constructor({position, velocity, color = 'red', imageSrc, scale = 1, framesMax = 1, offset = {x:0, y:0}})
    {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

        //OOP concept
        this.velocity = velocity;
        this.width = 50
        this.height = 150;
        this.lastKey

        //attack box 
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
    }

    //properties that are updated to move the Sprite around
    update(){
        this.draw()
        this.animateFrames()
        
        //attack box position
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //to ensure that the rectangle stops at the bottom of the canvas
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 96)
        {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }

    attack(){
        this.isAttacking = true
        setTimeout(()=>{
            this.isAttacking = false
        }, 100)
    }
}
