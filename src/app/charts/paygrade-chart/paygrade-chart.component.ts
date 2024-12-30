import { Component, OnInit, OnChanges, Input, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-paygrade-chart',
  templateUrl: './paygrade-chart.component.html',
  styleUrls: ['./paygrade-chart.component.css']
})
export class PaygradeChartComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    console.log('Paygrade Chart Initialized');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      console.log('Data received:', this.data);
      this.createPayGradeChart(this.data, 'PayGrade');
    }
  }

  private createPayGradeChart(data: any[], column: string): void {
    const element = this.chartContainer.nativeElement;

    // Clear previous SVG
    d3.select(element).selectAll('*').remove();

    if (!data || data.length === 0) {
      console.warn('No data available for visualization');
      return;
    }

    // Group data by column
    const counts = d3.rollup(
      data,
      (v) => v.length,
      (d) => d[column]
    );
    
    let groupedData = Array.from(counts, ([key, value]) => ({ key, value }))
      .sort((a, b) => d3.descending(a.value, b.value)); // Sort in descending order
    
    // groupedData = Array.from(groupedData, ([key, value]) => ({ key, value }));

    console.log(groupedData);

    // Set dimensions and margins
    const margin = { top: 30, right: 40, bottom: 50, left: 60 };
    const width = 850 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3.scaleBand()
      .domain(groupedData.map(d => d.key))
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(groupedData, d => d.value) || 0])
      .range([height, 0]);

    // Add x-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-55)')
      .style('text-anchor', 'end');

    // Add y-axis
    svg.append('g')
      .call(d3.axisLeft(y));

    // Add tooltip
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('border', '1px solid #ccc')
      .style('padding', '5px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none');

    // Add bars
    svg.selectAll('.bar')
      .data(groupedData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.key)!)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', '#F8AE54')
      .on('mouseover', (event, d) => {
        tooltip.style('opacity', 1);
        tooltip.html(`<strong>${d.key}</strong><br>Count: ${d.value}`)
          .style('left', (event.pageX + 5) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mousemove', (event) => {
        tooltip.style('left', (event.pageX + 5) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });

    // Add labels
    // svg.selectAll('.label')
    //   .data(groupedData)
    //   .enter()
    //   .append('text')
    //   .attr('x', d => x(d.key)! + x.bandwidth() / 2)
    //   .attr('y', d => y(d.value) - 5)
    //   .attr('text-anchor', 'middle')
    //   .text(d => d.value)
    //   .style('fill', 'black');
  }

  mapKeysToAlphabets(groupedData: { key: string, value: string }[]) {
    const alphabets: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    
    // Initialize result as an empty array
    let result: { key: string, value: string }[] = [];
  
    // Loop through the groupedData and map the key to corresponding alphabet
    for (let i = 0; i < groupedData.length && i < alphabets.length; i++) {
      let object = {
        key: alphabets[i],  // Assign the corresponding alphabet to key
        value: groupedData[i].value  // Keep the value from groupedData
      };
      result.push(object);
    }
  
    // Log the result
    console.log(result);
    
    // continue from here
    // Optionally, return the result if you want to use it elsewhere
    // return result;
  }
  
  
}
