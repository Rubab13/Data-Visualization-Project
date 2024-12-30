import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../services/dataservice.service';
import { contactLevelData } from '../contants/data';

@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.css']
})
export class VisualsComponent implements OnInit {

  data: any[] = [];
  contactLevelData: any;

  constructor(private dataService: DataserviceService) { }

  ngOnInit(): void {

    this.dataService.getData().subscribe((data) => {
      this.data = data;
      console.log(this.data);
      
    });

    this.contactLevelData = contactLevelData;;

  }

 

}
