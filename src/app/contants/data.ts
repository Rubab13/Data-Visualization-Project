export const DATA = {
  datasetOverview: {
    name: 'Employee Records',
    source: 'Internal HR Database',
    description: 'Contains employee details, salaries, and job roles.',
    purpose: 'To analyze workforce efficiency and salary distribution.',
    size: '10,000 rows × 20 columns',
    lastUpdated: '2024-09-15',
  },

  dataColumns: [
    { columnName: 'ID', dataType: 'int64', description: 'Unique identifier for each employee' },
    { columnName: 'JobFamily', dataType: 'int64', description: 'Broad category of job roles within the organization' },
    { columnName: 'JobFamilyDescription', dataType: 'object', description: 'Detailed description of the job family category' },
    { columnName: 'JobClass', dataType: 'int64', description: 'Specific classification of the job role' },
    { columnName: 'JobClassDescription', dataType: 'object', description: 'Detailed description of the job classification' },
    { columnName: 'PayGrade', dataType: 'int64', description: 'Level or range of compensation for the role' },
    { columnName: 'EducationLevel', dataType: 'int64', description: 'Required level of education for the job' },
    { columnName: 'Experience', dataType: 'int64', description: 'Years of relevant experience required or held' },
    { columnName: 'OrgImpact', dataType: 'int64', description: 'The influence or scope of the role within the organization' },
    { columnName: 'ProblemSolving', dataType: 'int64', description: 'The complexity and scope of problem-solving in the role' },
    { columnName: 'Supervision', dataType: 'int64', description: 'The extent of supervision required or given' },
    { columnName: 'ContactLevel', dataType: 'int64', description: 'Degree of interaction with others in or outside the organization' },
    { columnName: 'FinancialBudget', dataType: 'int64', description: 'Degree of interaction with others in or outside the organization' },
    { columnName: 'PG', dataType: 'object', description: 'Represents the Pay Grade or compensation level for the role' }
  ],

  statisticalSummary: {
    numerical: {
      averageSalary: 5500,
      medianSalary: 5400,
      minSalary: 3000,
      maxSalary: 10000,
      stdDevSalary: 1200,
    },
    categorical: {
      mostCommonCity: 'Toronto',
      topDepartment: 'Engineering',
      totalEmployees: 10000,
    },
  },
};

export const contactLevelData = {
  Categories: ['Medium', 'Low', 'High'],
  Counts: [33, 27, 6]
}

export const educationVsPaygrade = [
  { EducationLevel: 1, "PayGrade 1": 2, "PayGrade 2": 5, "PayGrade 3": 6, "PayGrade 4": 2, "PayGrade 5": 1, "PayGrade 6": 0, "PayGrade 7": 0, "PayGrade 8": 0, "PayGrade 9": 0, "PayGrade 10": 0 },
  { EducationLevel: 2, "PayGrade 1": 0, "PayGrade 2": 0, "PayGrade 3": 0, "PayGrade 4": 2, "PayGrade 5": 3, "PayGrade 6": 1, "PayGrade 7": 0, "PayGrade 8": 0, "PayGrade 9": 1, "PayGrade 10": 0 },
  { EducationLevel: 3, "PayGrade 1": 0, "PayGrade 2": 0, "PayGrade 3": 1, "PayGrade 4": 2, "PayGrade 5": 3, "PayGrade 6": 1, "PayGrade 7": 0, "PayGrade 8": 0, "PayGrade 9": 0, "PayGrade 10": 0 },
  { EducationLevel: 4, "PayGrade 1": 0, "PayGrade 2": 0, "PayGrade 3": 0, "PayGrade 4": 1, "PayGrade 5": 8, "PayGrade 6": 4, "PayGrade 7": 4, "PayGrade 8": 3, "PayGrade 9": 4, "PayGrade 10": 0 },
  { EducationLevel: 5, "PayGrade 1": 0, "PayGrade 2": 0, "PayGrade 3": 0, "PayGrade 4": 0, "PayGrade 5": 0, "PayGrade 6": 1, "PayGrade 7": 0, "PayGrade 8": 3, "PayGrade 9": 1, "PayGrade 10": 5 },
  { EducationLevel: 6, "PayGrade 1": 0, "PayGrade 2": 0, "PayGrade 3": 0, "PayGrade 4": 0, "PayGrade 5": 0, "PayGrade 6": 0, "PayGrade 7": 0, "PayGrade 8": 1, "PayGrade 9": 0, "PayGrade 10": 1 }
];

export const summary = [{
  'JobFamilyDescription': 'Accounting And Finance',
  'average_experience': 2.25,
  'education_level_mode': 4,
  'highest_paygrade': 10,
  'lowest_paygrade': 5,
  'contact_level_category_mode': 'Medium',
  'average_financial_budget': 8.25,
  'average_problem_solving': 4.5,
  'highest_education_level': 5,
  'lowest_education_level': 3
},
{
  'JobFamilyDescription': 'Administrative Support',
  'average_experience': 0.6,
  'education_level_mode': 1,
  'highest_paygrade': 5,
  'lowest_paygrade': 1,
  'contact_level_category_mode': 'Low',
  'average_financial_budget': 3.8,
  'average_problem_solving': 1.8,
  'highest_education_level': 4,
  'lowest_education_level': 1
},
{
  'JobFamilyDescription': 'Baker',
  'average_experience': 0.0,
  'education_level_mode': 2,
  'highest_paygrade': 9,
  'lowest_paygrade': 4,
  'contact_level_category_mode': 'Medium',
  'average_financial_budget': 5.333333333333333,
  'average_problem_solving': 4.333333333333333,
  'highest_education_level': 2,
  'lowest_education_level': 2
},
{
  'JobFamilyDescription': 'Buildings And Facilities',
  'average_experience': 0.5,
  'education_level_mode': 1,
  'highest_paygrade': 10,
  'lowest_paygrade': 2,
  'contact_level_category_mode': 'Low',
  'average_financial_budget': 5.0,
  'average_problem_solving': 3.75,
  'highest_education_level': 5,
  'lowest_education_level': 1
},
{
  'JobFamilyDescription': 'Buyer',
  'average_experience': 3.6666666666666665,
  'education_level_mode': 4,
  'highest_paygrade': 9,
  'lowest_paygrade': 5,
  'contact_level_category_mode': 'Medium',
  'average_financial_budget': 7.333333333333333,
  'average_problem_solving': 4.333333333333333,
  'highest_education_level': 4,
  'lowest_education_level': 2
},
{
  'JobFamilyDescription': 'Cashier',
  'average_experience': 2.3333333333333335,
  'education_level_mode': 1,
  'highest_paygrade': 6,
  'lowest_paygrade': 1,
  'contact_level_category_mode': 'Low',
  'average_financial_budget': 3.0,
  'average_problem_solving': 2.6666666666666665,
  'highest_education_level': 4,
  'lowest_education_level': 1
},
{
  'JobFamilyDescription': 'Communications And Media',
  'average_experience': 0.3,
  'education_level_mode': 1,
  'highest_paygrade': 8,
  'lowest_paygrade': 2,
  'contact_level_category_mode': 'Medium',
  'average_financial_budget': 3.8,
  'average_problem_solving': 2.9,
  'highest_education_level': 5,
  'lowest_education_level': 1
},
{
  'JobFamilyDescription': 'Corporate Research',
  'average_experience': 2.4,
  'education_level_mode': 6,
  'highest_paygrade': 10,
  'lowest_paygrade': 2,
  'contact_level_category_mode': 'Low',
  'average_financial_budget': 5.2,
  'average_problem_solving': 3.6,
  'highest_education_level': 6,
  'lowest_education_level': 1
},
{
  'JobFamilyDescription': 'Finance  And Accounting',
  'average_experience': 2.0,
  'education_level_mode': 4,
  'highest_paygrade': 9,
  'lowest_paygrade': 5,
  'contact_level_category_mode': 'Medium',
  'average_financial_budget': 7.333333333333333,
  'average_problem_solving': 4.333333333333333,
  'highest_education_level': 4,
  'lowest_education_level': 4
},
{
  'JobFamilyDescription': 'Human Resources',
  'average_experience': 3.3333333333333335,
  'education_level_mode': 4,
  'highest_paygrade': 8,
  'lowest_paygrade': 5,
  'contact_level_category_mode': 'Medium',
  'average_financial_budget': 4.0,
  'average_problem_solving': 4.0,
  'highest_education_level': 5,
  'lowest_education_level': 4
},
{
  'JobFamilyDescription': 'Meat Cutter',
  'average_experience': 3.5,
  'education_level_mode': 4,
  'highest_paygrade': 10,
  'lowest_paygrade': 5,
  'contact_level_category_mode': 'Medium',
  'average_financial_budget': 7.75,
  'average_problem_solving': 4.5,
  'highest_education_level': 5,
  'lowest_education_level': 4
},
{
  'JobFamilyDescription': 'Produce',
  'average_experience': 3.6,
  'education_level_mode': 4,
  'highest_paygrade': 10,
  'lowest_paygrade': 3,
  'contact_level_category_mode': 'Medium',
  'average_financial_budget': 6.4,
  'average_problem_solving': 4.4,
  'highest_education_level': 5,
  'lowest_education_level': 1
},
{
  'JobFamilyDescription': 'Secretary',
  'average_experience': 2.5,
  'education_level_mode': 1,
  'highest_paygrade': 5,
  'lowest_paygrade': 3,
  'contact_level_category_mode': 'Low',
  'average_financial_budget': 4.5,
  'average_problem_solving': 2.5,
  'highest_education_level': 2,
  'lowest_education_level': 1
},
{
  'JobFamilyDescription': 'Stockkeeping',
  'average_experience': 0.0,
  'education_level_mode': 3,
  'highest_paygrade': 8,
  'lowest_paygrade': 4,
  'contact_level_category_mode': 'Medium',
  'average_financial_budget': 4.333333333333333,
  'average_problem_solving': 3.3333333333333335,
  'highest_education_level': 4,
  'lowest_education_level': 3
},
{
  'JobFamilyDescription': 'Systems Analyst',
  'average_experience': 2.8,
  'education_level_mode': 5,
  'highest_paygrade': 10,
  'lowest_paygrade': 3,
  'contact_level_category_mode': 'Low',
  'average_financial_budget': 5.6,
  'average_problem_solving': 4.0,
  'highest_education_level': 5,
  'lowest_education_level': 1
}];