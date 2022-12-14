export async function getGazeShare(offset, gazeData){
    let cnt = 0;

    for(let i = 0; i < gazeData.length; i++){
        if(i < 0){
            break;
        }
        const x = gazeData[i].x;
        const y = gazeData[i].y;
        if(x > offset.l  && x < offset.r && y > offset.t && y < offset.b){
            cnt++;
        }
    }
    return cnt / gazeData.length * 100;
}

export async function createShareData(data){
    const gazeData = data.gaze_data;
    const canvas = await getGazeShare(data.offsets.canvas, gazeData);
    const controler = await getGazeShare(data.offsets.controler, gazeData);
    let reference = 0;
    if(data.is_reference){
        reference = await getGazeShare(data.offsets.reference, gazeData);
    }

    const div = document.createElement('div');
    div.id = 'share-data';
    div.className = 'share-data';

    div.innerText = `캔버스: ${canvas.toPrecision(2)}%\n
                     컨트롤: ${controler.toPrecision(2)}%\n
                     참고이미지: ${reference.toPrecision(2)}%\n
                     시선정확도: ${data.accuracy}%`;


    const container = document.getElementById("container")
    container.appendChild(div);

    div.style.visibility='hidden';
}

export function deleteShare(){
    const share = document.getElementById("share-data");
    share.style.visibility='hidden';
}

export function showShare(){
    const share = document.getElementById("share-data");
    share.style.visibility='visible';
}