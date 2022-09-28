const SAMPLING = 32;
const GRADIENT = 4;

async function createCanvas(div){
    const canvas = document.createElement('canvas');
    canvas.id = 'sequence';
    canvas.className = 'sequence';

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, div.style.width, div.style.height);

    canvas.width = div.offsetWidth;
    canvas.height = div.offsetHeight;

    canvas.style.position = 'fixed';
    canvas.style.zIndex = 3;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    const container = document.getElementById("container")
    container.appendChild(canvas);
}

export async function sequence(div){
    await createCanvas(div);
    const canvas = document.getElementById('sequence');
    canvas.style.visibility = 'hidden';
}

export function createSequence(gazeData) {
    const canvas = document.getElementById('sequence');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    checkStartPoint(gazeData, ctx);

    // 초기컬러: cyan
    let color = {
        red: 0,
        green: 255,
        blue: 255
    };
    let green_end = false;
    let red_end = false;
    let blue_end = false;

    for (let i = SAMPLING; i < gazeData.length; i += SAMPLING) {
        const colorCode = changeToColorCode(color);
        // cyan -> blue -> magenta -> red -> yellow
        if (!green_end) {
            color.green -= GRADIENT;
            if (color.green <= 0) {
                color.green = 0;
                green_end = true;
            }
        } else if (!red_end && green_end) {
            color.red += GRADIENT;
            if (color.red >= 255) {
                color.red = 255;
                red_end = true;
            }
        } else if (!blue_end && red_end) {
            color.blue -= GRADIENT;
            if (color.blue <= 0) {
                color.blue = 0;
                blue_end = true;
            }
        }
        else if (green_end && red_end && blue_end) {
            color.green += GRADIENT;
            if (color.green >= 255) {
                color.green = 255;
                green_end = false;
            }
        }
        drawLineWithArrows(ctx,gazeData[i - SAMPLING].x, gazeData[i - SAMPLING].y,
            gazeData[i].x, gazeData[i].y, 7, 15, colorCode);
    }
}

export function deleteSequence() {
    const seq = document.getElementById("sequence");
    seq.style.visibility = 'hidden';
}

export function showSequence() {
    const seq = document.getElementById("sequence");
    seq.style.visibility = 'visible';
}


function checkStartPoint(gazeData, ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(gazeData[0].x, gazeData[0].y, 5, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
}

function checkEndPoint(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.arc(innerWidth, innerHeight, 5, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
}

function editXCoordinate(x) {
    if (x < 0) {
        x = 0;
    }
    if (x > innerWidth) {
        x = innerWidth;
    }
    return (x);
}

function editYCoordinate(y) {
    if (y < 0) {
        y = 0;
    }
    if (y > innerHeight) {
        y = innerHeight;
    }
    return (y);
}

function changeToColorCode(color) {
    const red = color.red.toString();
    const green = color.green.toString();
    const blue = color.blue.toString();
    const colorCode = `rgba(${red}, ${green}, ${blue}, 0.5)`;
    return colorCode;
}


function drawLineWithArrows(ctx, x0, y0, x1, y1, aWidth, aLength, color) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const angle = Math.atan2(dy, dx);
    const length = Math.sqrt(dx * dx + dy * dy);

    ctx.lineWidth = 3;
    ctx.strokeStyle = color;

    ctx.translate(x0, y0);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);

    ctx.moveTo(length - aLength, -aWidth);
    ctx.lineTo(length, 0);
    ctx.lineTo(length - aLength, aWidth);

    ctx.stroke();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}