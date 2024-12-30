import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {

  constructor() { }

  loadingScreen: boolean = false;
  @Output() loadingComplete: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    setTimeout(() => {
      this.loadingScreen = false;
      document.getElementById('loadingScreen')?.remove();
      this.loadingComplete.emit(this.loadingScreen);
    }, 200);
  }

}
