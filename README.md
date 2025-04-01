# 🎯 Talent Verification System

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, secure, and efficient platform for verifying employment records and managing talent data.

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started)

</div>

## 📸 Preview

<div align="center">
  <img src="public/screenshots/landing_page.png" alt="Landing Page" width="800" />
  <p><em>Modern and intuitive landing page interface</em></p>
  
  <img src="public/screenshots/dashboard.png" alt="Dashboard" width="800" />
  <p><em>Comprehensive dashboard with real-time metrics</em></p>
</div>

## ✨ Features

<div align="center">

| 🔐 Authentication | 📊 Dashboard | 🔍 Search | 👥 Management |
|------------------|-------------|-----------|--------------|
| JWT Authentication | Real-time Metrics | Multi-criteria Search | Employee Profiles |
| Protected Routes | Performance KPIs | Advanced Filters | Company Management |
| Role-based Access | Activity Tracking | Date Range Filter | Document Handling |

</div>

### 🔐 Authentication & Security
- 🔑 Secure login system with JWT authentication
- 🛡️ Protected routes and API endpoints
- 👥 Role-based access control
- 🔄 Session management with refresh tokens

### 📊 Dashboard
- 📈 Real-time metrics and analytics
- 🎯 Key performance indicators
- 📝 Recent activities tracking
- 🏢 Top companies overview
- 👥 Employee statistics

### 🔍 Advanced Search
- 🔎 Multi-criteria search functionality
- 🏢 Filter by company, department, and position
- 📅 Date range filtering
- 👤 Employment status filtering
- 📥 Export results to CSV

### 👥 Employee Management
- 👤 Comprehensive employee profiles
- 📋 Employment history tracking
- ✅ Status verification
- 📄 Document management

### 🏢 Company Management
- 🏢 Company profiles and details
- 👥 Employee count tracking
- 🔢 Registration number verification
- 🏢 Department management

## 🛠️ Tech Stack

<div align="center">

| Frontend | Backend | Styling | Tools |
|----------|---------|---------|-------|
| Next.js 14 | TypeScript | Tailwind CSS | Git |
| React Hooks | JWT Auth | Shadcn/ui | npm/yarn |
| TypeScript | REST API | Lucide Icons | VS Code |

</div>

## 🚀 Getting Started

### Prerequisites

- ⚡ Node.js 18.x or later
- 📦 npm or yarn
- 🔧 Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/talent-verification.git
cd talent-verification
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration values.

4. **Run the development server:**
```bash
npm run dev
# or
yarn dev
```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## 📁 Project Structure

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

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| POST | `/api/auth/refresh` | Refresh access token |

### Companies
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/companies` | List all companies |
| GET | `/api/companies/:id` | Get company details |
| POST | `/api/companies` | Create new company |
| PUT | `/api/companies/:id` | Update company |
| DELETE | `/api/companies/:id` | Delete company |

### Employees
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | List all employees |
| GET | `/api/employees/:id` | Get employee details |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

### Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search` | Search employees |
| GET | `/api/search/export` | Export search results |

## 🤝 Contributing

1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add some amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔄 Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

<div align="center">

| Framework | Styling | UI Components | Icons |
|-----------|---------|---------------|-------|
| [Next.js](https://nextjs.org/) | [Tailwind CSS](https://tailwindcss.com/) | [Shadcn/ui](https://ui.shadcn.com/) | [Lucide Icons](https://lucide.dev/) |

</div>

---

<div align="center">
  
Made with ❤️ by [Your Name]

</div>
