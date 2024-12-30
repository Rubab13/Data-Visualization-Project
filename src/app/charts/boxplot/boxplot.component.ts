import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-boxplot',
  templateUrl: './boxplot.component.html',
  styleUrls: ['./boxplot.component.css'],
})
export class BoxplotComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  //@Input() column: string = ''; // Column for the boxplot
  
  education_mapping = {
    1: 'Primary School',
    2: 'Middle School',
    3: 'High School',
    4: 'Associate Degree',
    5: 'Bachelor\'s Degree',
    6: 'Master\'s Degree'
  };
  payGradeMapping = {
    1: 'Entry Level',
    2: 'Junior Level',
    3: 'Mid-Level',
    4: 'Mid-Level',
    5: 'Senior Level',
    6: 'Senior Level',
    7: 'Lead Level',
    8: 'Lead Level',
    9: 'Managerial',
    10: 'Executive'
  };
  experienceMapping = {
    0: 'No Experience',
    1: 'Entry Level',
    2: 'Junior Level',
    3: 'Mid-Level',
    4: 'Mid-Level',
    5: 'Senior Level',
    6: 'Senior Level',
    7: 'Lead Level',
    8: 'Lead Level',
    9: 'Managerial',
    10: 'Executive'
  };
  organizationImpactMapping = {
    1: 'Low Impact',
    2: 'Moderate Impact',
    3: 'Moderate Impact',
    4: 'High Impact',
    5: 'High Impact',
    6: 'Very High Impact'
  };
  problemSolvingMapping = {
    1: 'Very Low Problem Solving',
    2: 'Low Problem Solving',
    3: 'Moderate Problem Solving',
    4: 'High Problem Solving',
    5: 'Very High Problem Solving',
    6: 'Exceptional Problem Solving'
  };
  supervisionMapping = {
    1: 'No Supervision',
    2: 'Minimal Supervision',
    3: 'Basic Supervision',
    4: 'Moderate Supervision',
    5: 'Extensive Supervision',
    6: 'High Supervision',
    7: 'Full Supervision'
  };
  contactLevelMapping = {
    1: 'No Contact',
    2: 'Minimal Contact',
    3: 'Occasional Contact',
    4: 'Frequent Contact',
    5: 'Regular Contact',
    6: 'High Contact',
    7: 'Very High Contact',
    8: 'Constant Contact'
  };

  selectedChart: string = '';

  constructor() { }

  ngOnInit(): void {
    this.selectedChart = 'EducationLevel';
    this.createBoxPlot(this.data, this.selectedChart);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.createBoxPlot(this.data, this.selectedChart);
    }
  }

  selectChart(chartType: string): void {
    this.selectedChart = chartType;

    if (chartType === 'EducationLevel') {
      this.createBoxPlot(this.data, 'EducationLevel');
    }
    else if (chartType === 'Pay Grade') {
      this.createBoxPlot(this.data, 'PayGrade');
    }
    else if (chartType === 'Experience') {
      this.createBoxPlot(this.data, 'Experience');
    }
    else if (chartType === 'OrgImpact') {
      this.createBoxPlot(this.data, 'OrgImpact');
    }
    else if (chartType === 'ProblemSolving') {
      this.createBoxPlot(this.data, 'ProblemSolving');
    }
    else if (chartType === 'Supervision') {
      this.createBoxPlot(this.data, 'Supervision');
    }
    else if (chartType === 'ContactLevel') {
      this.createBoxPlot(this.data, 'ContactLevel');
    }
  }

  private createBoxPlot(data: any[], column: string): void {
    // Clear previous SVG
    d3.select('#boxPlot').selectAll('*').remove();

    // Extract numerical data from the column
    const columnData = data
      .map((d) => +d[column])
      .filter((value) => !isNaN(value));

    if (columnData.length === 0) {
      console.warn('No valid numeric data for column:', column);
      return;
    }

    // Set dimensions
    const margin = { top: 30, right: 30, bottom: 50, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select('#boxPlot')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create Y-axis scale
    const y = d3
      .scaleLinear()
      .domain([d3.min(columnData)!, d3.max(columnData)!])
      .range([height, 0]);

    svg.append('g').call(d3.axisLeft(y));

    // Calculate summary statistics
    const q1 = d3.quantile(columnData.sort(d3.ascending), 0.25)!;
    const median = d3.quantile(columnData.sort(d3.ascending), 0.5)!;
    const q3 = d3.quantile(columnData.sort(d3.ascending), 0.75)!;
    const interQuantileRange = q3 - q1;
    const min = d3.min(columnData)!;
    const max = d3.max(columnData)!;

    // Box
    svg
      .append('rect')
      .attr('x', width / 2 - 50)
      .attr('y', y(q3))
      .attr('height', y(q1) - y(q3))
      .attr('width', 100)
      .attr('stroke', 'black')
      .style('fill', () => 
        this.selectedChart === 'EducationLevel' ? '#d1495b' :
        this.selectedChart === 'Experience' ? '#00798C' :
        this.selectedChart === 'OrgImpact' ? '#EDAE49' :
        this.selectedChart === 'ProblemSolving' ? '#62929E' :
        this.selectedChart === 'Supervision' ? '#8C7051' :
        this.selectedChart === 'ContactLevel' ? '#28502E' :
        '#30638E');

    // Median line
    svg
      .append('line')
      .attr('x1', width / 2 - 50)
      .attr('x2', width / 2 + 50)
      .attr('y1', y(median))
      .attr('y2', y(median))
      .attr('stroke', 'black');

    // Min and Max lines
    svg
      .append('line')
      .attr('x1', width / 2)
      .attr('x2', width / 2)
      .attr('y1', y(min))
      .attr('y2', y(q1))
      .attr('stroke', 'black');

    svg
      .append('line')
      .attr('x1', width / 2)
      .attr('x2', width / 2)
      .attr('y1', y(max))
      .attr('y2', y(q3))
      .attr('stroke', 'black');

    // Min & Max Caps
    svg
      .append('line')
      .attr('x1', width / 2 - 20)
      .attr('x2', width / 2 + 20)
      .attr('y1', y(min))
      .attr('y2', y(min))
      .attr('stroke', 'black');

    svg
      .append('line')
      .attr('x1', width / 2 - 20)
      .attr('x2', width / 2 + 20)
      .attr('y1', y(max))
      .attr('y2', y(max))
      .attr('stroke', 'black');

    // Add Title
    svg
      .append('text')
      .attr('x', width / 2) // Center the title horizontally
      .attr('y', height + 40) // Move title below the graph (adjust '30' for spacing)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .text(column === 'EducationLevel' ? 'Education Level' : column);

  }
}
