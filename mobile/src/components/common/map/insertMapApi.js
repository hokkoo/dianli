var map, ticker;
function checkMap () {
    return new Promise((resolve) => {
        ticker = setInterval(function () {
            console.log('check map');
            if(window.BMap){
                clearInterval(ticker);
                resolve();
            }
        }, 500)
    });
}
const apiScript1 = "http://api.map.baidu.com/api?type=quick&ak=ZmrIX2EEayXfVSO06kbdZPva&v=1.0";
const apiScript2 = "http://api.map.baidu.com/getscript?type=quick&file=api&ak=ZmrIX2EEayXfVSO06kbdZPva&t=20140109092002";
const apiScript3 = "http://api.map.baidu.com/getscript?type=quick&file=feature&ak=ZmrIX2EEayXfVSO06kbdZPva&t=20140109092002";
export default function insertMapApi(){
    return new Promise((resolve) => {
        if( window.BMap || map || ticker){
            return resolve(map);
        }
        Promise.all([createScript(apiScript2), createScript(apiScript3)]).then( () => {
            checkMap().then(function () {
                map = BMap;
                resolve(map);
            });
        })
    })
}

function createScript (src) {
    return new Promise((resolve) => {
        var script = document.createElement('script');
        script = document.createElement('script')
        script.onload = function(){
            resolve();
        }
        script.src = src;
        document.head.appendChild(script);
    })
}