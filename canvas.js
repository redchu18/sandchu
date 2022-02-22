// Canvas Variables
const canvas = document.getElementById('powder_canvas');
const ctx = canvas.getContext('2d');
const dimension = 300;
canvas.width = dimension;
canvas.height = dimension;

// Global Variables
const mouse = {
    x: undefined,
    y: undefined,
    size: 20
}

// Mouse events on canvas below:
canvas.addEventListener('mousedown', drawline)

canvas.addEventListener('mousemove', drawline);

canvas.addEventListener('mouseleave', noMouse);

// Draw line based on mouse position
function drawline(e) {
    
    ctx.lineCap = 'round';
    ctx.lineWidth = mouse.size;
    ctx.strokeStyle = '#C2B280'

    if (typeof mouse.x === 'undefined') {
        setMouse(e);
    }

    if (e.buttons == 1) {
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke(); 
    }

    setMouse(e);
}

// Set mouse position on global variable
function setMouse(e) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
}

// Reset the mouse to default
function noMouse() {
    mouse.x = undefined,
    mouse.y = undefined
}

// 2 * 2 matrix color grid, used for all draw operations
// at the end of operation/frame, draw it with draw image
