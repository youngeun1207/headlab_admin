export default function createHeatmap(div, gaze_data) {
    var heatmapContainer = document.getElementById("heatmap");
    heatmapContainer.style.width = gaze_data.window_size.x + "px";
    heatmapContainer.style.height = gaze_data.window_size.y + "px";
    heatmapContainer.style.zIndex = 2;
    heatmapContainer.style.backgroundColor = "rgba(255, 255, 255, 0.4)"
    var heatmapInstance = h337.create({
        container: heatmapContainer,
        radius: 50
    });
    const gazeData = gaze_data.gaze_data;
    var data = {
        max: gazeData.length / 64,
        value: 1,
        data: gazeData
    };

    const heatmap = document.querySelector(".heatmap-canvas");
    heatmap.style.height = gaze_data.window_size.y + "px";
    heatmap.style.width = gaze_data.window_size.x + "px";
    heatmapInstance.setData(data);

    heatmapContainer.style.visibility='hidden';
    heatmap.style.visibility='hidden';

}
export function deleteHeatmap() {
    const heatmapContainer = document.getElementById("heatmap");
    const heatmap = document.querySelector(".heatmap-canvas");
    heatmapContainer.style.visibility='hidden';
    heatmap.style.visibility='hidden';
}

export function showHeatmap(){
    const heatmapContainer = document.getElementById("heatmap");
    const heatmap = document.querySelector(".heatmap-canvas");
    heatmapContainer.style.visibility='visible';
    heatmap.style.visibility='visible';
}