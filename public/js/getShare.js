function getOffsets(id){
    var target = document.getElementById(id);

    var left = target.offsetLeft;
    var right = left + target.offsetWidth;
    var top = target.offsetTop;
    var bottom = top + target.offsetHeight;

    return(offset = {l:left, r:right, t:top, b:bottom});
}

function getGazeShare(offset, gazeData){
    var cnt = 0;
    for(var i = 0; i < gazeData.length; i++){
        if(i < 0){
            break;
        }
        var x = gazeData[i].x;
        var y = gazeData[i].y;
        if(x > offset.l  && x < offset.r && y > offset.t && y < offset.b){
            cnt++;
        }
    }
    return cnt / gazeData.length * 100;
}

export function showShareData(data){
    const canvas = getGazeShare(data.offsets.canvas).toPrecision(2);
    const controler = getGazeShare(data.offsets.controler).toPrecision(2);
    if(data.reference_index == -1){
        const reference = 0
    }else{
        const reference = getGazeShare(data.offsets.reference).toPrecision(2);
    }
    
    swal.fire({
            title: "시선 점유율",
            text: `캔버스: ${canvas} + "\n" +
                  "컨트롤: ${controler} + "\n" +
                  "참고 이미지: ${reference} + "\n`
        }).then(isConfirm => {}
    );
}