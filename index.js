const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024 //screen size
canvas.height = 576 //screen size

c.fillRect(0, 0, canvas.width, canvas.height); //to differentiate the canvas from the browser background