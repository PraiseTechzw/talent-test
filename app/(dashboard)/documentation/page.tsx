import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Code, Database, Lock, Server, Terminal } from "lucide-react"

export default function DocumentationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Documentation</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Comprehensive documentation for the TalentVerify system</p>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
          <TabsTrigger value="database">Database Schema</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="setup">Setup Guide</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                System Overview
              </CardTitle>
              <CardDescription>
                A comprehensive overview of the TalentVerify system architecture and components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-3">System Architecture</h3>
                  <p className="mb-4">
                    TalentVerify is built using a modern tech stack with Django REST Framework for the backend API and
                    React for the frontend user interface. The system uses PostgreSQL for data storage and implements a
                    robust security model.
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Key Components:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Django REST API Backend</li>
                      <li>React Frontend with responsive UI</li>
                      <li>PostgreSQL Database</li>
                      <li>Authentication and Authorization System</li>
                      <li>Search and Filtering Engine</li>
                      <li>Bulk Import/Export Functionality</li>
                      <li>Encryption for Sensitive Data</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Core Features</h3>

                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Company Management</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      The system allows for comprehensive company management, including registration, updates, and
                      department tracking. Companies can be added individually or through bulk uploads.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Employee Management</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Employee records include detailed information about their employment history, roles, departments,
                      and responsibilities. The system maintains a complete history of employment across different
                      companies.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Search Functionality</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      The advanced search system allows users to find records based on multiple criteria, including
                      employee name, company, position, department, and employment dates.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-2">Security Features</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Security is implemented through encryption of sensitive data, role-based access control, and a
                      robust authentication system to ensure data integrity and confidentiality.
                    </p>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="mr-2 h-5 w-5" />
                API Reference
              </CardTitle>
              <CardDescription>Comprehensive documentation of the TalentVerify REST API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-3">API Overview</h3>
                  <p className="mb-4">
                    The TalentVerify API is built using Django REST Framework and follows RESTful principles. All
                    endpoints return JSON responses and accept JSON payloads for POST and PUT requests.
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Base URL:</h4>
                    <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                      https://api.talentverify.com/v1/
                    </code>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Authentication:</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      All API requests require authentication using JWT tokens. Include the token in the Authorization
                      header:
                    </p>
                    <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm block">
                      Authorization: Bearer {"{your_jwt_token}"}
                    </code>
                  </div>
                </section>

                <section className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Company Endpoints</h3>

                  <div className="space-y-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-850 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded text-xs font-medium mr-2">
                          GET
                        </span>
                        <code className="text-sm">/companies/</code>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          Returns a list of all companies. Supports pagination and filtering.
                        </p>
                        <h5 className="font-medium mb-1">Query Parameters:</h5>
                        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <li>page: Page number for pagination</li>
                          <li>page_size: Number of results per page</li>
                          <li>name: Filter by company name</li>
                          <li>registration_date_after: Filter by registration date</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-850 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded text-xs font-medium mr-2">
                          POST
                        </span>
                        <code className="text-sm">/companies/</code>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-700 dark:text-gray-300 mb-2">Creates a new company record.</p>
                        <h5 className="font-medium mb-1">Request Body:</h5>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm overflow-x-auto">
                          {`{
  "name": "Acme Corporation",
  "registration_date": "2023-01-15",
  "registration_number": "ACM12345",
  "address": "123 Business Ave, Suite 100",
  "contact_person": "John Smith",
  "departments": ["Engineering", "HR", "Sales"],
  "employee_count": 150,
  "phone": "+1-555-123-4567",
  "email": "info@acmecorp.com"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Employee Endpoints</h3>

                  <div className="space-y-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-850 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded text-xs font-medium mr-2">
                          GET
                        </span>
                        <code className="text-sm">/employees/</code>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          Returns a list of all employees. Supports pagination and filtering.
                        </p>
                        <h5 className="font-medium mb-1">Query Parameters:</h5>
                        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <li>page: Page number for pagination</li>
                          <li>page_size: Number of results per page</li>
                          <li>name: Filter by employee name</li>
                          <li>company: Filter by company ID</li>
                          <li>department: Filter by department</li>
                          <li>active: Filter by active status (true/false)</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-850 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded text-xs font-medium mr-2">
                          POST
                        </span>
                        <code className="text-sm">/employees/</code>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-700 dark:text-gray-300 mb-2">Creates a new employee record.</p>
                        <h5 className="font-medium mb-1">Request Body:</h5>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm overflow-x-auto">
                          {`{
  "name": "Jane Doe",
  "employee_id": "EMP12345",
  "company": 1,
  "department": "Engineering",
  "role": "Senior Developer",
  "start_date": "2022-03-15",
  "end_date": null,
  "duties": "Backend development, API design, database optimization"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Database Schema
              </CardTitle>
              <CardDescription>Detailed documentation of the PostgreSQL database schema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-3">Database Overview</h3>
                  <p className="mb-4">
                    TalentVerify uses PostgreSQL as its primary database. The schema is designed to efficiently store
                    and retrieve company and employee information while maintaining data integrity and relationships.
                  </p>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Entity Relationship Diagram:</h4>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded border border-gray-300 dark:border-gray-700">
                      <p className="text-center text-gray-500 italic">
                        [Entity Relationship Diagram would be displayed here]
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Core Tables</h3>

                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">Company Table</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-300 dark:border-gray-700">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-800">
                            <th className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700 text-left">
                              Column
                            </th>
                            <th className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700 text-left">
                              Type
                            </th>
                            <th className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700 text-left">
                              Constraints
                            </th>
                            <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">id</td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">SERIAL</td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              PRIMARY KEY
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                              Unique identifier
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">name</td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              VARCHAR(255)
                            </td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              NOT NULL, UNIQUE
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">Company name</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              registration_date
                            </td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">DATE</td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              NOT NULL
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                              Date of company registration
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              registration_number
                            </td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              VARCHAR(50)
                            </td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              NOT NULL, UNIQUE
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                              Official registration number
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              address
                            </td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">TEXT</td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              NOT NULL
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">Company address</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-2">Employee Table</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-300 dark:border-gray-700">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-800">
                            <th className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700 text-left">
                              Column
                            </th>
                            <th className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700 text-left">
                              Type
                            </th>
                            <th className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700 text-left">
                              Constraints
                            </th>
                            <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">id</td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">SERIAL</td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              PRIMARY KEY
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                              Unique identifier
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">name</td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              VARCHAR(255)
                            </td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              NOT NULL
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                              Employee full name
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              employee_id
                            </td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              VARCHAR(50)
                            </td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              NOT NULL, UNIQUE
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                              Employee ID number
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              company_id
                            </td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              INTEGER
                            </td>
                            <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                              FOREIGN KEY
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                              Reference to company table
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Security Documentation
              </CardTitle>
              <CardDescription>
                Detailed information about the security measures implemented in TalentVerify
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-3">Security Overview</h3>
                  <p className="mb-4">
                    TalentVerify implements multiple layers of security to protect sensitive data and ensure that only
                    authorized users can access specific information.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Data Encryption</h3>
                  <p className="mb-4">
                    Sensitive data is encrypted both at rest and in transit to prevent unauthorized access.
                  </p>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Encryption at Rest:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>AES-256 encryption for sensitive fields in the database</li>
                      <li>Encrypted fields include personal identifiers and contact information</li>
                      <li>Database backups are also encrypted</li>
                    </ul>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Encryption in Transit:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>TLS 1.3 for all HTTP connections</li>
                      <li>HTTPS enforced for all API endpoints and web interfaces</li>
                      <li>Secure WebSockets for real-time communications</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Authentication and Authorization</h3>

                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Authentication System</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>JWT-based authentication with short expiration times</li>
                      <li>Multi-factor authentication support</li>
                      <li>Password policies enforcing strong passwords</li>
                      <li>Account lockout after multiple failed attempts</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-2">Role-Based Access Control</h4>
                    <p className="mb-2 text-gray-700 dark:text-gray-300">
                      The system implements a comprehensive RBAC model with the following roles:
                    </p>
                    <table className="min-w-full border border-gray-300 dark:border-gray-700">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                          <th className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700 text-left">
                            Role
                          </th>
                          <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-left">
                            Permissions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                            Administrator
                          </td>
                          <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                            Full system access, user management, audit logs
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">
                            Company Manager
                          </td>
                          <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                            Manage company information, add/edit employees for their company
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">HR Staff</td>
                          <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                            View and edit employee information, limited company data access
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b border-r border-gray-300 dark:border-gray-700">Verifier</td>
                          <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                            Read-only access to verify employment history
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="setup">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" />
                Setup Guide
              </CardTitle>
              <CardDescription>Instructions for setting up and deploying the TalentVerify system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-3">Prerequisites</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Python 3.9+ for the Django backend</li>
                    <li>Node.js 16+ for the React frontend</li>
                    <li>PostgreSQL 13+ database</li>
                    <li>Git for version control</li>
                    <li>Docker and Docker Compose (optional, for containerized deployment)</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Backend Setup</h3>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Clone the Repository:</h4>
                    <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto">
                      git clone https://github.com/talentverify/backend.git cd backend
                    </pre>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Create Virtual Environment:</h4>
                    <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto">
                      python -m venv venv source venv/bin/activate # On Windows: venv\Scripts\activate
                    </pre>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Install Dependencies:</h4>
                    <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto">
                      pip install -r requirements.txt
                    </pre>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Configure Environment Variables:</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      Create a .env file in the backend directory with the following variables:
                    </p>
                    <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto">
                      DEBUG=False SECRET_KEY=your_secret_key
                      DATABASE_URL=postgres://user:password@localhost:5432/talentverify
                      ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com
                      CORS_ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
                    </pre>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Run Migrations and Start Server:</h4>
                    <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto">
                      python manage.py migrate python manage.py createsuperuser python manage.py runserver
                    </pre>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Frontend Setup</h3>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Clone the Repository:</h4>
                    <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto">
                      git clone https://github.com/talentverify/frontend.git cd frontend
                    </pre>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Install Dependencies:</h4>
                    <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto">
                      npm install
                    </pre>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Configure Environment:</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      Create a .env.local file with the API endpoint:
                    </p>
                    <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto">
                      REACT_APP_API_URL=http://localhost:8000/api
                    </pre>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Start Development Server:</h4>
                    <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto">npm start</pre>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Terminal className="mr-2 h-5 w-5" />
                Testing Methodology
              </CardTitle>
              <CardDescription>Comprehensive testing procedures for the TalentVerify system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-3">Testing Overview</h3>
                  <p className="mb-4">
                    TalentVerify implements a comprehensive testing strategy to ensure system reliability, security, and
                    performance.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Unit Testing</h3>
                  <p className="mb-4">Unit tests verify the functionality of individual components in isolation.</p>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Backend Unit Tests:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Django test framework for model and view testing</li>
                      <li>pytest for additional test cases</li>
                      <li>Coverage reporting to ensure comprehensive test coverage</li>
                    </ul>
                    <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto mt-2">
                      # Run backend tests python manage.py test # Run with coverage coverage run --source='.' manage.py
                      test coverage report
                    </pre>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Frontend Unit Tests:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Jest for component and utility testing</li>
                      <li>React Testing Library for component rendering tests</li>
                      <li>Mock service worker for API mocking</li>
                    </ul>
                    <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto mt-2">
                      # Run frontend tests npm test # Run with coverage npm test -- --coverage
                    </pre>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Integration Testing</h3>
                  <p className="mb-4">Integration tests verify that different components work together correctly.</p>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">API Integration Tests:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Testing API endpoints with realistic data scenarios</li>
                      <li>Verifying correct data flow between components</li>
                      <li>Testing authentication and authorization flows</li>
                    </ul>
                    <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto mt-2">
                      # Run API integration tests pytest tests/integration/
                    </pre>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">End-to-End Integration:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Cypress for end-to-end testing of complete user flows</li>
                      <li>Testing database interactions and state management</li>
                      <li>Verifying UI components interact correctly with the backend</li>
                    </ul>
                    <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-sm overflow-x-auto mt-2">
                      # Run end-to-end tests npm run cypress:run
                    </pre>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Security Testing</h3>
                  <p className="mb-4">Security testing identifies vulnerabilities and ensures data protection.</p>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Vulnerability Scanning:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>OWASP ZAP for automated vulnerability scanning</li>
                      <li>Regular dependency scanning for known vulnerabilities</li>
                      <li>Static code analysis to identify security issues</li>
                    </ul>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Penetration Testing:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Regular penetration testing by security professionals</li>
                      <li>Testing for common vulnerabilities (SQL injection, XSS, CSRF)</li>
                      <li>Authentication and authorization bypass attempts</li>
                      <li>Data encryption verification</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Performance Testing</h3>
                  <p className="mb-4">
                    Performance testing ensures the system can handle expected loads and identifies bottlenecks.
                  </p>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-medium mb-2">Load Testing:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>JMeter for simulating high user loads</li>
                      <li>Testing system performance under normal and peak conditions</li>
                      <li>Identifying performance bottlenecks</li>
                    </ul>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Stress Testing:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Testing system behavior under extreme conditions</li>
                      <li>Verifying graceful degradation under heavy load</li>
                      <li>Recovery testing after system overload</li>
                    </ul>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

