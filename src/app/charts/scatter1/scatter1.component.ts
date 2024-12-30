import { Component, OnInit, ElementRef, ViewChild, OnChanges, Input, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatter1',
  template: `<div id="scatter-plot"></div>`,
  styleUrls: ['./scatter1.component.css']
})
export class Scatter1Component implements OnInit, OnChanges {
  
  @Input() data: any[] = [];

  constructor(private el: ElementRef) { }
  ngOnChanges(): void {
    this.createScatterPlot();
  }

  ngOnInit(): void {}

  createScatterPlot(): void {
    const margin = { top: 30, right: 30, bottom: 50, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    const svg = d3.select(this.el.nativeElement).select('svg');
    
    if (svg.empty()) {
      d3.select(this.el.nativeElement)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    } else {
      svg.selectAll('*').remove();
    }
  
    const x = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => d.PayGrade)])
      .range([0, width]);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => d.Experience)])
      .range([height, 0]);
  
    // Add x-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x) as any);
  
    // Add y-axis
    svg.append('g')
      .call(d3.axisLeft(y) as any);
  
    // Add x-axis label
    svg.append('text')
      .attr('class', 'x-axis-label')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .style('text-anchor', 'middle')
      .text('PayGrade'); // Change this to the appropriate label for X-axis
  
    // Add y-axis label
    // Add y-axis label
    svg.append('text')
    .attr('class', 'y-axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)  // This controls the position of the label
    .attr('y', -margin.left + 20)  // Adjusted to ensure the label is within the SVG
    .style('text-anchor', 'middle')
    .text('Experience'); // Change this to the appropriate label for Y-axis

  
    // Add scatter plot points (circles)
    svg.selectAll('.dot')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d: any) => x(d.PayGrade))
      .attr('cy', (d: any) => y(d.Experience))
      .attr('r', 5)
      .style('fill', '#69b3a2');
  
    // Optional: Add labels for the dots
    // svg.selectAll('.label')
    //   .data(this.data)
    //   .enter()
    //   .append('text')
    //   .attr('class', 'label')
    //   .attr('x', (d: any) => x(d.PayGrade))
    //   .attr('y', (d: any) => y(d.Experience))
    //   .attr('dy', -10)
    //   .attr('text-anchor', 'middle')
    //   .style('fill', '#000')
    //   .text((d: any) => d.ID); // Add the ID or other column as a label (optional)
  }
  
  
}
