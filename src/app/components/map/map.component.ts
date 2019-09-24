import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import Vector from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Icon, Style} from 'ol/style';
import FeatureS from 'ol/Feature';


import * as ms from 'milsymbol';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import IconOrigin from 'ol/style/IconOrigin';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  //map;
  constructor() { }

  ngOnInit() {
    this.initializeMap()
  }

  initializeMap() {
    let mysymbol = new ms.Symbol(
      "SFG-UCI----D", 
      {size: 25, 
        infoColor: "#FFFFFF",
        outlineWidth: 5,
        //quantity: "tracks[i].id",
         staffComments: "lakjsdflj" ,
        // additionalInformation: this.tmService.tracks[i].spd + ' KT',
        // direction: this.tmService.tracks[i].cse,
       // type: "Machine Gun",
       //dtg: tracks[i].dtg,
       // location: "0900000.0E570306.0N"
       }
     );

     var mycanvas = mysymbol.setOptions({ size:100}).asCanvas();

    let iconFeature = new FeatureS(new Point([0,0]));
    iconFeature.set( 'style', 
      new Style({
        image: new Icon({
          anchor: [mysymbol.getAnchor().x, mysymbol.getAnchor().y],
          imgSize: [mysymbol.getSize().width, mysymbol.getSize().height],
          img: mycanvas
        })
      }))

    let map = new Map({
      target: 'map',
      layers: [
        new Tile({
          preload: 4,
          source: new OSM({
            wrapX: true
          })
        }),
        new Vector({
          source: new VectorSource({
            features: [iconFeature]
          })
        })
      ],
      view: new View({
        center: [0, 0],
        minZoom: 3,
        zoom: 0
      })
    });
  }

}
