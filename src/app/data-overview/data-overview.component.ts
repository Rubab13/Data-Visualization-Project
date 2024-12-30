import { Component, OnInit } from '@angular/core';
import { DATA } from '../contants/data';

@Component({
  selector: 'app-data-overview',
  templateUrl: './data-overview.component.html',
  styleUrls: ['./data-overview.component.css']
})

export class DataOverviewComponent implements OnInit {

  ngOnInit(): void {
    
  }

  constructor () {
    
  }

  // {
  //   columnName: 'ID',
  //   dataType: 'Integer',
  //   description: 'Employee ID',
  //   sampleValue: 101,
  // },

  // column names
  dataColumns = DATA.dataColumns;

  // Dataset Overview
  datasetOverview = DATA.datasetOverview;

  // Statistical Summary
  statisticalSummary = DATA.statisticalSummary;

  currentIndex: number = 0;
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.dataColumns.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.dataColumns.length) % this.dataColumns.length;
  }



}
