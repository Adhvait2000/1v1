//animating images
class Sprite{
    constructor({position, imageSrc, scale = 1, framesMax = 1})
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
    }

    draw(){
        c.drawImage(
            this.image, 
            //for animation of the shop image
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height, 

            this.position.x, 
            this.position.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale) 
    }
 
    //properties that are updated to move the Sprite around
    update(){
        this.draw()

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
}

//creating an object
class Fighter{
    constructor({position, velocity, color = 'red', offset})
    {
        //OOP concept
        this.position = position;
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
    }

    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //drawing attack box
        if(this.isAttacking)
        {
        c.fillStyle = 'green'
        c.fillRect(
            this.attackBox.position.x, 
            this.attackBox.position.y, 
            this.attackBox.width, 
            this.attackBox.height)
        }
    }

    //properties that are updated to move the Sprite around
    update(){
        this.draw()
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
