import { Component, OnInit } from '@angular/core';
import { summary } from 'src/app/contants/data';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  
  summary: any[] = [];
  currentIndex: number = 0;  // To track the current job family being displayed
  interval: any;

  constructor() { }

  ngOnInit(): void {
    this.summary = summary;
    this.startLoop();
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startLoop() {
    this.interval = setInterval(() => {
      // Move to the next job family or loop back to the first one
      this.currentIndex = (this.currentIndex + 1) % this.summary.length;
    }, 3000);  // Update every 5 seconds
  }


}
