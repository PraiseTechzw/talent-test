import pandas as pd
from datetime import datetime, timedelta
import random

# Sample data
companies = [
    {
        'name': 'Tech Solutions Inc',
        'registration_date': (datetime.now() - timedelta(days=365)).strftime('%Y-%m-%d'),
        'registration_number': 'REG' + str(random.randint(100000, 999999)),
        'address': '123 Tech Park, Silicon Valley, CA 94025',
        'contact_person': 'John Smith',
        'departments': 'Engineering,Product,Marketing,Sales',
        'employee_count': 150,
        'phone': '+1 (555) 123-4567',
        'email': 'contact@techsolutions.com'
    },
    {
        'name': 'Global Finance Corp',
        'registration_date': (datetime.now() - timedelta(days=180)).strftime('%Y-%m-%d'),
        'registration_number': 'REG' + str(random.randint(100000, 999999)),
        'address': '456 Wall Street, New York, NY 10005',
        'contact_person': 'Sarah Johnson',
        'departments': 'Finance,Accounting,HR,Operations',
        'employee_count': 200,
        'phone': '+1 (555) 987-6543',
        'email': 'info@globalfinance.com'
    },
    {
        'name': 'Healthcare Systems Ltd',
        'registration_date': (datetime.now() - timedelta(days=90)).strftime('%Y-%m-%d'),
        'registration_number': 'REG' + str(random.randint(100000, 999999)),
        'address': '789 Medical Center, Boston, MA 02115',
        'contact_person': 'Dr. Michael Brown',
        'departments': 'Medical,Research,Administration,Support',
        'employee_count': 300,
        'phone': '+1 (555) 456-7890',
        'email': 'contact@healthcaresystems.com'
    }
]

# Create DataFrame
df = pd.DataFrame(companies)

# Create Excel writer
with pd.ExcelWriter('public/templates/company_template.xlsx', engine='openpyxl') as writer:
    # Write data to Excel
    df.to_excel(writer, sheet_name='Companies', index=False)
    
    # Get the worksheet
    worksheet = writer.sheets['Companies']
    
    # Set column widths
    for idx, col in enumerate(df.columns):
        max_length = max(
            df[col].astype(str).apply(len).max(),
            len(col)
        )
        worksheet.column_dimensions[chr(65 + idx)].width = max_length + 2

print("Excel template generated successfully!") 