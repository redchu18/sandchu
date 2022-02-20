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
    size: 0
}

// Mouse events on canvas below:

canvas.addEventListener('mousedown', drawline)

canvas.addEventListener('mousemove', drawline);

canvas.addEventListener('mouseleave', noMouse);

const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = scannedImage.data;
for (let i = 0; i < scannedData.length; i += 4) {
    data[i] = 255;
    data[i + 1] = 0;
    data[i + 2] = 0;
}
iamge.data = data;
ctx.putImageData(image, 0, 0);

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

    if (e.buttons == 2) {
        const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const scannedData = scannedImage.data;


        const a = scannedData[0];
        const b = scannedData[1];
        const c = scannedData[2];
        const d = scannedData[3];

        for (let i = 0; i < scannedData.length; i += 4) {
            const a1 = scannedData[i] == a;
            const b1 = scannedData[i + 1] == b;
            const c1 = scannedData[i + 2] == c;
            const d1 = scannedData[i + 3] == d;
            if (!a1 || !b1 || !c1 || !d1) {
                const a2 = scannedData[i] == 0;
                const b2 = scannedData[i + 1] == 0;
                const c2 = scannedData[i + 2] == 0;
                const d2 = scannedData[i + 3] == 0;
                if (!a2 || !b2 || !c2 || !d2) {
                    console.log('It is aliased');
                }
            }
        }
        console.log('fin');
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
