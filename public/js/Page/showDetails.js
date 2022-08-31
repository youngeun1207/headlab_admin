import { readStorage } from "../firebase.js";

async function getDiv(){
    var win = window.open("./detail.html", "PopupWin");
    const background = win.document.getElementById("background");
    return background;
}

export async function openNewPage(data) {
    const background = getDiv();
    background.style.width = data.window_size.x;
    background.style.height = data.window_size.y;
    console.log(data.screenshot);
    const src = await readStorage(data.screenshot);
    console.log(src);
    // background.style.backgroundImage = "url('" + src + "')";
}
