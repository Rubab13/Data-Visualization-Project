import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements AfterViewInit {
  @ViewChild('heatmap') heatmap!: ElementRef;

  correlation: any = {
    'PayGrade': { 'PayGrade': 1.0, 'EducationLevel': -0.1, 'Experience': 0.4, 'OrgImpact': -0.8, 'ProblemSolving': -1.0, 'Supervision': -0.5, 'ContactLevel': 0.6, 'FinancialBudget': 1.0 },
    'EducationLevel': { 'PayGrade': -0.1, 'EducationLevel': 1.0, 'Experience': -0.7, 'OrgImpact': 0.1, 'ProblemSolving': 0.1, 'Supervision': -0.1, 'ContactLevel': 0.0, 'FinancialBudget': -0.1 },
    'Experience': { 'PayGrade': 0.4, 'EducationLevel': -0.7, 'Experience': 1.0, 'OrgImpact': -0.6, 'ProblemSolving': -0.4, 'Supervision': 0.4, 'ContactLevel': -0.3, 'FinancialBudget': 0.4 },
    'OrgImpact': { 'PayGrade': -0.8, 'EducationLevel': 0.1, 'Experience': -0.6, 'OrgImpact': 1.0, 'ProblemSolving': 0.8, 'Supervision': 0.2, 'ContactLevel': -0.1, 'FinancialBudget': -0.8 },
    'ProblemSolving': { 'PayGrade': -1.0, 'EducationLevel': 0.1, 'Experience': -0.4, 'OrgImpact': 0.8, 'ProblemSolving': 1.0, 'Supervision': 0.5, 'ContactLevel': -0.6, 'FinancialBudget': -1.0 },
    'Supervision': { 'PayGrade': -0.5, 'EducationLevel': -0.1, 'Experience': 0.4, 'OrgImpact': 0.2, 'ProblemSolving': 0.5, 'Supervision': 1.0, 'ContactLevel': -0.9, 'FinancialBudget': -0.5 },
    'ContactLevel': { 'PayGrade': 0.6, 'EducationLevel': 0.0, 'Experience': -0.3, 'OrgImpact': -0.1, 'ProblemSolving': -0.6, 'Supervision': -0.9, 'ContactLevel': 1.0, 'FinancialBudget': 0.6 },
    'FinancialBudget': { 'PayGrade': 1.0, 'EducationLevel': -0.1, 'Experience': 0.4, 'OrgImpact': -0.8, 'ProblemSolving': -1.0, 'Supervision': -0.5, 'ContactLevel': 0.6, 'FinancialBudget': 1.0 }
  };

  columns: string[] = ['PayGrade', 'EducationLevel', 'Experience', 'OrgImpact', 'ProblemSolving', 'Supervision', 'ContactLevel', 'FinancialBudget'];

  ngAfterViewInit(): void {
    this.drawHeatmap();
  }

  drawHeatmap(): void {
    const data: { x: string, y: string, value: number }[] = [];
  
    this.columns.forEach((row, i) => {
      this.columns.forEach((col, j) => {
        data.push({ x: col, y: row, value: this.correlation[row][col] });
      });
    });
  
    const margin = { top: 40, right: 50, bottom: 100, left: 100 };
    const width = 600 - margin.left - margin.right;
    const height = 470 - margin.top - margin.bottom;
  
    const svg = d3.select(this.heatmap.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    const x = d3.scaleBand()
      .domain(this.columns)
      .range([0, width])
      .padding(0.05);
  
    const y = d3.scaleBand()
      .domain(this.columns)
      .range([0, height])
      .padding(0.05);
  
    const color = d3.scaleSequential()
      .interpolator(d3.interpolateRdYlBu)
      .domain([-1, 1]);
  
    // Create tooltip div and style it
    const tooltip = d3.select(this.heatmap.nativeElement)
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(0, 0, 0, 0.75)')
      .style('color', '#fff')
      .style('padding', '5px')
      .style('border-radius', '4px')
      .style('font-size', '12px');
  
    // Append heatmap cells
    svg.append('g')
      .selectAll()
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.x)! )
      .attr('y', d => y(d.y)! )
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => color(d.value))
      .style('stroke', '#fff')
      .on('mouseover', (event, d) => {
        tooltip.style('visibility', 'visible')
          .text(`Correlation between ${d.x} and ${d.y}: ${d.value.toFixed(2)}`);
      })
      .on('mousemove', (event) => {
        tooltip.style('top', `${event.pageY + 5}px`)
          .style('left', `${event.pageX + 5}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });
  
    // Append x-axis (Bottom)
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'middle')
      .attr('dy', '1em')
      .attr('transform', 'rotate(-45) translate(-25, 20)');
  
    // Append y-axis (Left)
    svg.append('g')
      .call(d3.axisLeft(y));
  
    // Adjust label positioning
    svg.selectAll('text.value')
      .data(data)
      .enter()
      .append('text')
      .attr('x', d => x(d.x)! + x.bandwidth() / 2) // Center the label horizontally
      .attr('y', d => y(d.y)! + y.bandwidth() / 2) // Center the label vertically
      .attr('dy', '.35em') // Fine-tune vertical alignment
      .attr('text-anchor', 'middle')
      .style('fill', 'black')
      .style('font-size', '10px') // Optional: Adjust font size for readability
      .text(d => d.value.toFixed(1));
  }
  

}
