const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024 //screen size
canvas.height = 576 //screen size

c.fillRect(0, 0, canvas.width, canvas.height); //to differentiate the canvas from the browser background

//creating gravity
const gravity = 0.7

//creating an object
class Sprite{
    constructor({position, velocity})
    {
        //OOP concept
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastKey 
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    //properties that are updated to move the Sprite around
    update(){
        this.draw()
        this.position.x += this.velocity.x
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

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

// creating animation loop so that the player and enemy stick to the bottom of the canvas and "gravity" is a factor
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //Player movement
    if (keys.a.pressed && player.lastKey == 'a'){
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey == 'd') {
        player.velocity.x = 5
    }

    //Enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft'){
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight') {
        enemy.velocity.x = 5
    }
}

animate()

//adding an event listener
//moving the player to the right left and up
window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key){
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break

        //For the enemy

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break
    }
    console.log(event.key);
})

window.addEventListener('keyup', (event) => {
    switch (event.key){
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
       
    }
    //enemy keys
    switch (event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
    
})