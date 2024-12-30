import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar1',
  templateUrl: './bar1.component.html',
  styleUrls: ['./bar1.component.css']
})
export class Bar1Component implements AfterViewInit {
  @ViewChild('barChart', { static: true }) private chartContainer: ElementRef | undefined;

  data = [
    { 'JobFamilyDescription': 'Meat Cutter', 'PayGrade': 7.75 },
    { 'JobFamilyDescription': 'Buyer', 'PayGrade': 7.333333333333333 },
    { 'JobFamilyDescription': 'Accounting And Finance', 'PayGrade': 7.25 },
    { 'JobFamilyDescription': 'Produce', 'PayGrade': 7.0 },
    { 'JobFamilyDescription': 'Finance And Accounting', 'PayGrade': 6.666666666666667 }
  ];

  constructor() { }

  ngAfterViewInit(): void {
    this.createBarChart();
  }

  createBarChart() {
    const element = this.chartContainer?.nativeElement;
    const margin = { top: 20, right: 30, bottom: 60, left: 40 }; // Increased bottom margin to make space for labels
    const width = element.offsetWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(this.data.map(d => d.JobFamilyDescription))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => d.PayGrade) as number])
      .nice()
      .range([height, 0]);

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.selectAll('.bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.JobFamilyDescription) as number)
      .attr('y', (d) => y(d.PayGrade))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.PayGrade))
      .attr('fill', '#8C7AA9');

    // Add x-axis
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .attr('dy', '10'); // Ensure labels are spaced well

    // Add y-axis
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y).ticks(5));

    // Add y-axis label (above the y-axis)
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left + 15) // Adjusted to move the label in view
      .attr('x', 0 - height / 2)
      .style('text-anchor', 'middle')
      .text('Pay Grade');

    // Add x-axis label (below the x-axis)
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .style('text-anchor', 'middle')
      .text('Job Family Description');
  }
}
