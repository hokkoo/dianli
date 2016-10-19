var map = BMap;
export default function insertMapApi(){
    return new Promise((resolve) => {
        if(map){
            return resolve(map);
        }
        /*var script = document.createElement('script');
        script = document.createElement('script')
        script.onload = function(){
            map = true;
            resolve(map)
        }
        script.src = "http://api.map.baidu.com/api?type=quick&ak=ZmrIX2EEayXfVSO06kbdZPva&v=1.0"*/
        document.head.appendChild(script);
    })
}