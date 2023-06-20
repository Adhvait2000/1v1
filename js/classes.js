//animating images
class Sprite{
    constructor({position, imageSrc})
    {
        //OOP concept
        this.position = position;
        this.width = 50
        this.height = 150;
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y) 
    }

    //properties that are updated to move the Sprite around
    update(){
        this.draw()
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
