import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-countplot1',
  templateUrl: './countplot1.component.html',
  styleUrls: ['./countplot1.component.css'],
})
export class Countplot1Component implements OnInit, OnChanges {
  @Input() data: any = [];
  selectedChart : string = 'Job Family';
  education_mapping = {
    1: 'Primary School',
    2: 'Middle School',
    3: 'High School',
    4: 'Associate Degree',
    5: 'Bachelor\'s Degree',
    6: 'Master\'s Degree'
  };

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.createCountPlot(this.data, 'JobFamilyDescription');
    }
  }

  selectChart(chartType: string): void {
    this.selectedChart = chartType;

    if (chartType === 'Job Family') {
      this.createCountPlot(this.data, 'JobFamilyDescription');
    } 
    else if (chartType === 'Pay Grade') {
      this.createCountPlot(this.data, 'PayGrade');
    }
    else if (chartType === 'Education Level') {
      this.createCountPlot(this.data, 'EducationLevel');
    }
    // else if (chartType === 'country') {
    //   this.createCountPlot(this.data, 'JobFamilyDescription');
    // }
  }

  private createCountPlot(data: any[], column: string): void {
    console.log(data);
    
    // Clear previous SVG to avoid duplicates
    d3.select('#countPlot').selectAll('*').remove();

    // Group data by the selected column
    const counts = d3.rollup(
      data,
      (v) => v.length,
      (d) => d[column]
    );

    // const groupedData = Array.from(counts, ([key, value]) => ({ key, value }));
    let groupedData = Array.from(counts, ([key, value]) => ({ 
      key: column === 'EducationLevel' 
        ? this.education_mapping[key as keyof typeof this.education_mapping] || 'Unknown' 
        : key, 
      value 
    }));      

    // Set dimensions and margins for the SVG
    const margin = { top: 50, right: 40, bottom: 140, left: 40 };
    const width = 850 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3
      .select('#countPlot')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3
      .scaleBand()
      .domain(groupedData.map((d) => d.key))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(groupedData, (d) => d.value) as number])
      .range([height, 0]);

    // Add x-axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-55)')
      .style('text-anchor', 'end');

    // Add y-axis
    svg.append('g').call(d3.axisLeft(y));

    // Add x-axis label
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 2) // Position below x-axis
      .text(() => this.selectedChart === 'Job Family' ? 'Job Family Description' : this.selectedChart === 'Education Level' ? 'Education Level' : 'Pay Grade') // X-axis label text
      .style('font-size', '14px')
      .style('fill', 'black');

    // Add y-axis label
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)') // Rotate text for y-axis
      .attr('x', -height / 2)
      .attr('y', -margin.left + 15) // Position to the left of y-axis
      .text('Count') // Y-axis label text
      .style('font-size', '14px')
      .style('fill', 'black');

    const tooltip = d3
      .select('#countPlot')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', '#f9f9f9')
      .style('border', '1px solidrgb(14, 14, 14)')
      .style('border-radius', '4px')
      .style('padding', '8px')
      .style('opacity', 0)
      .style('pointer-events', 'none')
      .style('font-size', '12px')
      .style('z-index', '10');

    // Add bars
    svg
      .selectAll('bars')
      .data(groupedData)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.key)!)
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.value))
      .attr('fill', () => this.selectedChart === 'Job Family' ? '#BA324F' : this.selectedChart === 'Education Level' ? '#D62839' : '#175676') 
      .on('mouseover', (event, d) => {
        tooltip.style('opacity', 1)
          .html(`<strong>${d.key}</strong><br>Count is  ${d.value}`);
      })
      .on('mousemove', (event) => {
        const [x, y] = d3.pointer(event);
      
        tooltip
          .style('left', `${x + margin.left + 5}px`)
          .style('top', `${y + margin.top -10}px`);
      })      
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });
      
    // Add labels (optional)
    // svg
    //   .selectAll('text.label')
    //   .data(groupedData)
    //   .enter()
    //   .append('text')
    //   .text((d) => d.value)
    //   .attr('x', (d) => x(d.key)! + x.bandwidth() / 2)
    //   .attr('y', (d) => y(d.value) - 5)
    //   .attr('text-anchor', 'middle')
    //   .style('font-size', '12px')
    //   .style('fill', 'black');
  }
}
