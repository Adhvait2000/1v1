const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024 //screen size
canvas.height = 576 //screen size

c.fillRect(0, 0, canvas.width, canvas.height); //to differentiate the canvas from the browser background

//creating gravity
const gravity = 0.2

//creating an object
class Sprite{
    constructor({position, velocity})
    {
        //OOP concept
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    //properties that are updated to move the Sprite around
    update(){
        this.draw()
        this.position.y += this.velocity.y

        //to ensure that the rectangle stops at the bottom of the canvas
        if(this.position.y + this.height + this.velocity.y >= canvas.height)
        {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }
}

//creating player
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

//creating enemy
const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
})

// creating animation loop so that the player and enemy stick to the bottom of the canvas and "gravity" is a factor
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
}

animate()