import { ElasticResult } from './../shared/result.model';
import { Component, OnInit, DoCheck} from '@angular/core';
import { uuidv4 } from '../shared/util';
import { SearchResultsService } from '../shared/searchResults.service';

declare let L: any;

@Component({
  selector: 'app-map-leaflet',
  templateUrl: './map-leaflet.component.html',
  styleUrls: ['./map-leaflet.component.css']
})
export class MapLeafletComponent implements OnInit, DoCheck {
  results=[];
  item:ElasticResult;

  uuid:string = uuidv4();

  mymap: any;
  
  constructor(private searchResultService: SearchResultsService) {
    this.results = [{latitude: 0, longitude: 0}];
   }

  ngOnInit() {
    this.results = this.searchResultService.results;
    this.item = this.searchResultService.item;
    let element = document.getElementById('mapid');
    element.id = this.uuid;
    
    this.mymap = L.map(this.uuid).setView([39.8283,-98.5795], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      id:'baseMap',
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,',
      maxZoom: 18, 
      minZoom: 3
    }).addTo(this.mymap);
  }

  ngDoCheck(): void {
    // SEARCH RESULTS
    if(this.results.length === this.searchResultService.results.length && this.results[0] === this.searchResultService.results[0]){
      // FOCUS ITEM
      if(this.item !== this.searchResultService.item){
        this.mymap.setView([this.searchResultService.item.latitude, this.searchResultService.item.longitude], 10);
        this.item = this.searchResultService.item;
      }
      this.results;
    } else{
      // Reset map to default zoomed out view
      this.mymap.setView([39.8283,-98.5795], 2);
      // Remove Heat Map on new results
      this.mymap.eachLayer((layer)=> {
        if(!layer._url){
          this.mymap.removeLayer(layer);
        }
      });
      this.results = this.searchResultService.results;
      let points = [];
      for(let x = 0; x < this.results.length; x++){
        points.push([this.results[x].latitude, this.results[x].longitude, 0.1]);
      }

      // leaflet-heat      
      const options = {
          max:.0001, 
          radius: 15, 
          gradient: {0.1:'#00f', 0.25:'#00c', 0.5:'#0f0', 0.75:'#ff0', 1:'#f00'},
        };
      
      let heatmapLayer = L.heatLayer(points,options);
      heatmapLayer.addTo(this.mymap);
    }
  }
}
