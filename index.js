const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024 //screen size
canvas.height = 576 //screen size

c.fillRect(0, 0, canvas.width, canvas.height); //to differentiate the canvas from the browser background

//creating gravity
const gravity = 0.7

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './assets/background.png'
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 128,
    },
    imageSrc: './assets/shop.png',
    scale: 2.75,
    framesMax: 6
})

//creating player
const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset:{
        x: 0,
        y: 0
    },
    imageSrc: './assets/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 156
    }
})

//creating enemy
const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x:  -50,
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

decreaseTimer()


// creating animation loop so that the player and enemy stick to the bottom of the canvas and "gravity" is a factor
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()
    //enemy.update()

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

    //detecting for collision
    if (rectangularCollision({rectangle1: player, rectangle2: enemy}) &&
        player.isAttacking)
    {
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

    if (rectangularCollision({rectangle1: enemy, rectangle2: player}) &&
        enemy.isAttacking)
    {
        enemy.isAttacking = false
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0)
    {
        determineWinner({player, enemy, timerId})
    }
}

animate()

//adding an event listener
//moving the player to the right left and up
window.addEventListener('keydown', (event) => {
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
        case ' ':
            player.attack()
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
        case 'ArrowDown':
            enemy.attack()
            break
    }
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