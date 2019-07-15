import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDlS88_nxI2zf2alnEcnMwrhXakeVB48ms",
      authDomain: "udemy-ng-recipe-book-4c65a.firebaseapp.com",
    })
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
