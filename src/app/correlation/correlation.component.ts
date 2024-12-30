import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-correlation',
  templateUrl: './correlation.component.html',
  styleUrls: ['./correlation.component.css']
})
export class CorrelationComponent implements OnInit {
  correlation: any = {
    'PayGrade': {'PayGrade': 1.0, 'EducationLevel': -0.1, 'Experience': 0.4, 'OrgImpact': -0.8, 'ProblemSolving': -1.0, 'Supervision': -0.5, 'ContactLevel': 0.6, 'FinancialBudget': 1.0},
    'EducationLevel': {'PayGrade': -0.1, 'EducationLevel': 1.0, 'Experience': -0.7, 'OrgImpact': 0.1, 'ProblemSolving': 0.1, 'Supervision': -0.1, 'ContactLevel': 0.0, 'FinancialBudget': -0.1},
    'Experience': {'PayGrade': 0.4, 'EducationLevel': -0.7, 'Experience': 1.0, 'OrgImpact': -0.6, 'ProblemSolving': -0.4, 'Supervision': 0.4, 'ContactLevel': -0.3, 'FinancialBudget': 0.4},
    'OrgImpact': {'PayGrade': -0.8, 'EducationLevel': 0.1, 'Experience': -0.6, 'OrgImpact': 1.0, 'ProblemSolving': 0.8, 'Supervision': 0.2, 'ContactLevel': -0.1, 'FinancialBudget': -0.8},
    'ProblemSolving': {'PayGrade': -1.0, 'EducationLevel': 0.1, 'Experience': -0.4, 'OrgImpact': 0.8, 'ProblemSolving': 1.0, 'Supervision': 0.5, 'ContactLevel': -0.6, 'FinancialBudget': -1.0},
    'Supervision': {'PayGrade': -0.5, 'EducationLevel': -0.1, 'Experience': 0.4, 'OrgImpact': 0.2, 'ProblemSolving': 0.5, 'Supervision': 1.0, 'ContactLevel': -0.9, 'FinancialBudget': -0.5},
    'ContactLevel': {'PayGrade': 0.6, 'EducationLevel': 0.0, 'Experience': -0.3, 'OrgImpact': -0.1, 'ProblemSolving': -0.6, 'Supervision': -0.9, 'ContactLevel': 1.0, 'FinancialBudget': 0.6},
    'FinancialBudget': {'PayGrade': 1.0, 'EducationLevel': -0.1, 'Experience': 0.4, 'OrgImpact': -0.8, 'ProblemSolving': -1.0, 'Supervision': -0.5, 'ContactLevel': 0.6, 'FinancialBudget': 1.0}
  };

  columns: string[] = ['PayGrade', 'EducationLevel', 'Experience', 'OrgImpact', 'ProblemSolving', 'Supervision', 'ContactLevel', 'FinancialBudget'];
  selectedColumns: string[] = [];

  ngOnInit(): void {}

  selectColumn(column: string): void {
    if (this.selectedColumns.length < 2) {
      this.selectedColumns.push(column);
    } else {
      this.selectedColumns = [column];
    }
  }
}
