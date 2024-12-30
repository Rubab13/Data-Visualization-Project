import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../services/dataservice.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any[] = [];

  // metrics
  totalJobs: number = 0;
  mostInDemandJob: any = "";
  averageSalary: any = "";
  topHiringIndustry: any = "";

  currentCategory: string = '';
  currentSalary: number = 0;
  salaryKeys: string[] = [];
  currentIndex: number = 0;

  constructor(private dataService: DataserviceService) { }

  ngOnInit(): void {

    this.dataService.getData().subscribe((data) => {
      this.data = data;
      if (this.data && this.data.length > 0) {
        this.totalJobs = this.dataService.getTotalJobs(data);
        this.mostInDemandJob = this.dataService.getMostInDemandJobCategory(data);

        this.averageSalary = this.dataService.getAverageSalaryByJobFamily(data);
        // console.log(this.averageSalary);
        this.salaryKeys = Object.keys(this.averageSalary);
        this.showNextSalary();

        this.topHiringIndustry = this.dataService.getTopHiringIndustry(data);
        console.log(this.topHiringIndustry);
        
      } else {
        this.mostInDemandJob = 'No data available';
        this.totalJobs = 0;
      }
    });
    
    // This is the reference code
    // this.dataService.getDataFromCSV('assets/mydata.csv').subscribe(
    //   (data) => {
    //     this.data = data;
    //     console.log(this.data); // Do something with the data
    //   },
    //   (error) => {
    //     console.error('Error loading CSV:', error);
    //   }
    // );



    // Initialize metrics
    
    // this.getMostInDemandJobCategory();
    // this.getAverageSalary();
    // this.getTopHiringIndustry();

  }


  showNextSalary() {
    setInterval(() => {
      if (this.currentIndex < this.salaryKeys.length) {
        const category = this.salaryKeys[this.currentIndex];
        this.currentCategory = category;
        this.currentSalary = this.averageSalary[category];
        this.currentIndex++;
      }
    }, 5000);
  }

}
