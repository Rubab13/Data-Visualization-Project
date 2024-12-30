import { Component, Input, OnInit } from '@angular/core';
import { DATA } from '../contants/data';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(private dataService: DataserviceService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.data = data;
      console.log(this.data);

      this.calculateTotalPages();
      this.loadPageData();
    });
  }
  

  // column names
  dataColumns = DATA.dataColumns;
  data: any[] = [];
  displayedData: any[] = [];
  currentPage: number = 1;
  recordsPerPage: number = 50;
  totalPages: number = 0;

  // Calculate total pages
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.data.length / this.recordsPerPage);
  }

  // Load data for the current page
  loadPageData() {
    const startIndex = (this.currentPage - 1) * this.recordsPerPage;
    const endIndex = startIndex + this.recordsPerPage;
    this.displayedData = this.data.slice(startIndex, endIndex);
  }

  // Navigate to previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPageData();
    }
  }

  // Navigate to next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPageData();
    }
  }

}
