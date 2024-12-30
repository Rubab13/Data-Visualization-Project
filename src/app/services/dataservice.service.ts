import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http: HttpClient) { }

  data: any[] = [];

  parseCSVData(csv: string): any[] {
    const result = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
    });
    
    // This is the reference code
    // return result.data.map((row: any) => ({
    //   name: row['Name'], // Assuming CSV has a 'Name' column
    //   value: +row['Value'], // Assuming CSV has a 'Value' column and converting it to number
    //   // abs: Math.abs(+row['Value']),
    // }));

    return result.data.map((row: any) => ({
      ID: +row['ID'],
      JobFamily: +row['JobFamily'],
      JobFamilyDescription: row['JobFamilyDescription'],
      JobClass: +row['JobClass'],
      JobClassDescription: row['JobClassDescription'],
      PayGrade: +row['PayGrade'],
      EducationLevel: +row['EducationLevel'],
      Experience: +row['Experience'],
      OrgImpact: +row['OrgImpact'],
      ProblemSolving: +row['ProblemSolving'],
      Supervision: +row['Supervision'],
      ContactLevel: +row['ContactLevel'],
      FinancialBudget: +row['FinancialBudget'],
      PG: row['PG']
    }));
  }

  getDataFromCSV(filePath: string): Observable<any[]> {
    return new Observable((observer) => {
      this.http.get(filePath, { responseType: 'text' }).subscribe(
        (csv) => {
          const data = this.parseCSVData(csv);
          observer.next(data);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  getData(): Observable<any[]> {
    return this.getDataFromCSV('assets/jobclassinfo.csv');
  }

  // This function below is returning an array
  // getData (): any[] {
  //   this.getDataFromCSV('assets/jobclassinfo.csv').subscribe(
  //     (data) => {
  //       this.data = data;
  //       console.log(this.data);
  //       console.log("This is the type of data: ",typeof(this.data));
  //     },
  //     (error) => {
  //       console.error('Error loading CSV:', error);
  //     }
  //   );
  //   return this.data;
  // }

  // getDataLoadedStatus() {
  //   return this.dataLoaded.asObservable();
  // }

  getTotalJobs (data: any): number {
    return data.length;
  }

  getMostInDemandJobCategory(data: any) {
    const categoryCount: { [key: string]: number } = {};
  
    data.forEach((job: any) => {
      if (job.JobFamilyDescription) {
        const category = job.JobFamilyDescription;
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      }
    });
  
    // Check if categoryCount is not empty before calling reduce
    if (Object.keys(categoryCount).length > 0) {
      return Object.keys(categoryCount).reduce((a, b) =>
        categoryCount[a] > categoryCount[b] ? a : b
      );
    } else {
      return 'No categories found';
    }
  }

  getAverageSalaryByJobFamily(data: any) {
    const salarySum: { [key: string]: number } = {};
    const jobCount: { [key: string]: number } = {};
  
    // Iterate through the data to sum the salaries and count the jobs for each JobFamilyDescription
    data.forEach((job: any) => {
      if (job.JobFamilyDescription && job.PayGrade) {  // Ensure valid JobFamilyDescription and PayGrade
        const category = job.JobFamilyDescription;
  
        // If PayGrade is numeric, accumulate the sum and count
        const salary = parseFloat(job.PayGrade);  // Assuming 'PayGrade' contains numeric salary values
  
        if (!isNaN(salary)) {
          salarySum[category] = (salarySum[category] || 0) + salary;
          jobCount[category] = (jobCount[category] || 0) + 1;
        }
      }
    });
  
    // Calculate the average salary for each JobFamilyDescription
    const averageSalaryByCategory: { [key: string]: number } = {};
    Object.keys(salarySum).forEach((category) => {
      const totalSalary = salarySum[category];
      const totalJobs = jobCount[category];
      averageSalaryByCategory[category] = totalSalary / totalJobs;  // Average Salary
    });
  
    return averageSalaryByCategory;
  }

  getTopHiringIndustry(data: any) {
    if (!data || data.length === 0) {
      return 'No data available';
    }
  
    const industryCount: { [key: string]: number } = {};
  
    data.forEach((job: any) => {
      const industry = job.JobFamilyDescription; // Assuming "industry" is the property name
      if (industry) { // Ensure that industry is defined
        industryCount[industry] = (industryCount[industry] || 0) + 1;
      }
    });
  
    // If there are no valid industries, return a default message
    if (Object.keys(industryCount).length === 0) {
      return 'No industries found';
    }
  
    return Object.keys(industryCount).reduce((a, b) =>
      industryCount[a] > industryCount[b] ? a : b
    );
  }
  
  
  

}
