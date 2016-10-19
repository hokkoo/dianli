<template>
  <div class="map-location">
    <div id="mapPlaceholder" v-el:map></div>
  </div>
</template>

<script type="text/babel">
  import insertMapApi from './insertMapApi.js';

  export default {
    props: {
      geography_lon: {
        type: String,
        default: "118.1685060000"
      },
      geography_lat: {
        type: String,
        default: "24.6737690000"
      },
      zoom: {
        type: Number,
        default: 15
      },
      markerContent: {
        type: String,
        default: "<div class='map-markder'><h4 class='title'>厦门滨海街建材店</h4>" +
                    "<div class='desc'><p>电话：13850052109,(0592)7115989</p>" +
                    "<p>周边：恩祺幼儿园 约46米</p>" +
                    "<p>参考：福建省厦门市同安区西柯镇西北方向</p>" +
                    "</div></div>"
      }
    },
    ready(){
      var  _self = this;
      insertMapApi().then( () => {
        var map = new BMap.Map(_self.$els.map);
        map.centerAndZoom(new BMap.Point(this.geography_lon, this.geography_lat), this.zoom);
        map.addControl(new BMap.ZoomControl());
        var marker = new BMap.Marker(new BMap.Point(this.geography_lon, this.geography_lat));
        map.addOverlay(marker);
        var infoWindow = new BMap.InfoWindow(this.markerContent);
        marker.openInfoWindow(infoWindow);
      })
    }
  }
</script>
<style type="text/css">
  .map-markder {
        font-size: 12px;
    }
    
    .map-markder .title {
        font-size: 14px;
        margin: 2px 0
    }
    
    .map-markder .desc {
        color: #eeeeee;
    }
    
    .map-markder .desc p:first-child {
        color: #4CAF50;
    }

    .map-location{
      position: relative;;
    }

    .map-location, 
    .map-location > div{
      width: 100%;
      height: 500px;
    }
</style>