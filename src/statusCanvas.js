window.addEventListener("load", statusOnload);

let statusCanvasWidth;
let statusCanvasHeight;

function statusOnload() {
    window.removeEventListener("load", statusOnload);
    const canvas = document.getElementById("statusCanvas");

    statusCanvasWidth = canvas.width;
    statusCanvasHeight = canvas.height;

    if (!game) {
        console.log("Aborting status load, no game to attach status window to!");
        return;
    }

    console.log("Event triggered: load");
    const context = canvas.getContext("2d");

    registerListener("scoreChange", ([score, delta]) => {
        console.log("Event triggered: scoreChange", score, delta);
        refresh(context, score);
    });

    refresh(context, 0);
    console.log("Status window loaded");
}

function refresh(context, score) {
    context.clearRect(0, 0, statusCanvasWidth, statusCanvasHeight);
    context.font = "30px Arial";
    context.fillStyle = "white";
    context.fillText(score, 8, 30);
}