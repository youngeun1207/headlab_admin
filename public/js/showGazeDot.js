import { checkGazePoint, createCanvas } from "./sequence.js";

export async function createGazeDot(gazeData, div) {
    const canvas = await createCanvas(div, 'gaze-dot');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    checkGazePoint(gazeData[0], ctx);

    const range = document.getElementById('timeline');
    if (range) {
        range.setAttribute("max", gazeData.length - 1);
        range.addEventListener("input", (event) => handleRangeChange(event, gazeData));
    }
    canvas.style.visibility = 'hidden';
}

function handleRangeChange(event, gazeData) {
    const timeline = event.target.value;

    const canvas = document.getElementById('gaze-dot');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    checkGazePoint(gazeData[timeline], ctx);
}

export function deleteGazeDot() {
    const dot = document.getElementById("gaze-dot");
    dot.style.visibility = 'hidden';
}

export function showGazeDot() {
    const dot = document.getElementById("gaze-dot");
    dot.style.visibility = 'visible';
}