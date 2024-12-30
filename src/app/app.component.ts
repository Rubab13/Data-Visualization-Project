import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loadingScreenStatus: boolean = true;

  handleLoadingComplete(status: boolean) {
    this.loadingScreenStatus = status;
    // console.log('Loading screen completed:', this.loadingScreenStatus);
  }
}
