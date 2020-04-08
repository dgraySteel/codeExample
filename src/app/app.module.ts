import { SearchService } from './shared/search.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import {SearchFilterComponent} from './search/search-filter/search-filter.component'; 
import {SearchListComponent} from './search/search-list/search-list.component';
import {SearchInputComponent} from './search/search-input/search-input.component';
import { MapLeafletComponent } from './map-leaflet/map-leaflet.component';
import { SearchResultsService } from './shared/searchResults.service';
 
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'opt', component: TopBarComponent },
    ]),
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    SearchFilterComponent,
    SearchListComponent,
    SearchInputComponent,
    MapLeafletComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }