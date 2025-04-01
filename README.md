# Talent Verification System

A modern, secure, and efficient platform for verifying employment records and managing talent data. Built with Next.js, TypeScript, and Tailwind CSS.

![Landing Page](public/screenshots/landing_page.png)
*Landing Page - Modern and intuitive interface*

![Dashboard](public/screenshots/dashboard.png)
*Dashboard - Comprehensive overview of key metrics and recent activities*

## Features

### 🔐 Authentication & Security
- Secure login system with JWT authentication
- Protected routes and API endpoints
- Role-based access control
- Session management with refresh tokens

### 📊 Dashboard
- Real-time metrics and analytics
- Key performance indicators
- Recent activities tracking
- Top companies overview
- Employee statistics

### 🔍 Advanced Search
- Multi-criteria search functionality
- Filter by company, department, and position
- Date range filtering
- Employment status filtering
- Export results to CSV

### 👥 Employee Management
- Comprehensive employee profiles
- Employment history tracking
- Status verification
- Document management

### 🏢 Company Management
- Company profiles and details
- Employee count tracking
- Registration number verification
- Department management

## Tech Stack

- **Frontend Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **State Management:** React Hooks
- **Authentication:** JWT with refresh tokens
- **API:** RESTful with TypeScript types
- **Date Handling:** date-fns
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/talent-verification.git
cd talent-verification
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration values.

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
talent-verification/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utility functions and API clients
├── public/               # Static assets
│   └── screenshots/      # Application screenshots
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token

### Companies
- `GET /api/companies` - List all companies
- `GET /api/companies/:id` - Get company details
- `POST /api/companies` - Create new company
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

### Employees
- `GET /api/employees` - List all employees
- `GET /api/employees/:id` - Get employee details
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Search
- `GET /api/search` - Search employees
- `GET /api/search/export` - Export search results

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
