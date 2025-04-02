import pandas as pd
from datetime import datetime, timedelta
import random

# Sample data
employees = [
    {
        'name': 'John Doe',
        'employee_id': 'EMP' + str(random.randint(10000, 99999)),
        'company': 'Tech Solutions Inc',
        'department': 'Engineering',
        'role': 'Senior Software Engineer',
        'start_date': (datetime.now() - timedelta(days=365)).strftime('%Y-%m-%d'),
        'end_date': '',
        'duties': 'Lead development team, Code review, Technical architecture'
    },
    {
        'name': 'Jane Smith',
        'employee_id': 'EMP' + str(random.randint(10000, 99999)),
        'company': 'Tech Solutions Inc',
        'department': 'Product',
        'role': 'Product Manager',
        'start_date': (datetime.now() - timedelta(days=180)).strftime('%Y-%m-%d'),
        'end_date': '',
        'duties': 'Product roadmap, Feature prioritization, User research'
    },
    {
        'name': 'Mike Johnson',
        'employee_id': 'EMP' + str(random.randint(10000, 99999)),
        'company': 'Global Finance Corp',
        'department': 'Finance',
        'role': 'Financial Analyst',
        'start_date': (datetime.now() - timedelta(days=90)).strftime('%Y-%m-%d'),
        'end_date': '',
        'duties': 'Financial reporting, Budget analysis, Investment research'
    },
    {
        'name': 'Sarah Williams',
        'employee_id': 'EMP' + str(random.randint(10000, 99999)),
        'company': 'Healthcare Systems Ltd',
        'department': 'Medical',
        'role': 'Medical Director',
        'start_date': (datetime.now() - timedelta(days=60)).strftime('%Y-%m-%d'),
        'end_date': '',
        'duties': 'Clinical oversight, Quality assurance, Staff training'
    }
]

# Create DataFrame
df = pd.DataFrame(employees)

# Create Excel writer
with pd.ExcelWriter('public/templates/employee_template.xlsx', engine='openpyxl') as writer:
    # Write data to Excel
    df.to_excel(writer, sheet_name='Employees', index=False)
    
    # Get the worksheet
    worksheet = writer.sheets['Employees']
    
    # Set column widths
    for idx, col in enumerate(df.columns):
        max_length = max(
            df[col].astype(str).apply(len).max(),
            len(col)
        )
        worksheet.column_dimensions[chr(65 + idx)].width = max_length + 2

print("Employee Excel template generated successfully!") 