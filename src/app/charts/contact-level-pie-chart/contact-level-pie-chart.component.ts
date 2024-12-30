import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-contact-level-pie-chart',
  templateUrl: './contact-level-pie-chart.component.html',
  styleUrls: ['./contact-level-pie-chart.component.css']
})
export class ContactLevelPieChartComponent implements OnInit, OnChanges {

  @Input() contactLevelData: any;  // This will receive the input data

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contactLevelData'] && changes['contactLevelData'].currentValue) {
      this.createPieChart(this.contactLevelData);
    }
  }

  private createPieChart(data: { Categories: string[], Counts: number[] }): void {
    // Set dimensions for the chart
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Create the SVG container
    const svg = d3.select('#contactLevelPieChart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Create a color scale
    const color = d3.scaleOrdinal<string>()
      .domain(data.Categories)
      .range(['#63993D', '#AFDC8F', '#204D00']);

    // Create a pie chart layout
    const pie = d3.pie<{ category: string, count: number }>()
      .value((d) => d.count)
      .sort(null);

    // Create the arc generator
    const arc = d3.arc<d3.PieArcDatum<{ category: string, count: number }>>()
      .innerRadius(0)  // No inner radius, creating a full pie chart
      .outerRadius(radius - 10);

    // Prepare the data for pie chart
    const pieData = data.Categories.map((category, i) => ({
      category: category,
      count: data.Counts[i]
    }));

    // Create the pie chart slices
    const slices = svg.selectAll('path')
      .data(pie(pieData))  // Apply pie layout to data
      .enter()
      .append('path')
      .attr('d', arc)  // Use arc generator to create the paths
      .attr('fill', (d) => color(d.data.category));

    // Add the text labels
    svg.selectAll('text')
      .data(pie(pieData))  // Apply pie layout to data
      .enter()
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)  // Position the labels
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', 'white')
      .text((d) => `${d.data.category} (${d.data.count})`)
  }

}
