export const CATEGORIES = ['Engineering', 'Development', 'Design', 'Marketing', 'Sales', 'HR'];
export const JOB_TYPES = ['Full-time', 'Part-time', 'Remote', 'Hybrid', 'Contract'];

export const INITIAL_FORM_DATA = {
  title: '',
  location: '',
  jobType: 'Full-time',
  category: 'Engineering',
  applicationDeadline: '',
  salaryRange: { min: '', max: '', currency: 'BDT' },
  description: '',
  company: '',
  requirements: '',
  responsibilities: '',
  hr_email: '',
  hr_name: '',
  company_logo: ''
};

export const API_BASE_URL = 'http://localhost:3000';