# BookMyDoc - Healthcare Client (Frontend)

BookMyDoc is a modern, full-stack healthcare appointment booking platform. This frontend application provides an intuitive, animated, and responsive user interface for patients, doctors, and administrators.

## ✨ Features
- **Role-Based Access Control (RBAC):** Dedicated dashboards for `SUPER_ADMIN`, `ADMIN`, `DOCTOR`, and `PATIENT`.
- **Modern Tech Stack:** Built with **Next.js 16 (App Router)** and **React 19**.
- **Beautiful UI:** Styled with **Tailwind CSS**, **shadcn/ui**, and animated using **Framer Motion**.
- **Secure Authentication:** JWT-based authentication using HTTP-only cookies and edge-compatible decoding.
- **Appointment Booking:** Patients can seamlessly find doctors and book schedules.
- **Form Validation:** Robust client-side validation using **Zod**.

## 🚀 Tech Stack
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS + shadcn/ui
- **Animations:** Framer Motion
- **Auth Handling:** jwt-decode + set-cookie-parser

## 🛠️ Local Setup Instructions

### 1. Clone the repository
Ensure you are in the `healthcare-client` directory.

### 2. Install Dependencies
Run the following command to install all required packages:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
NODE_ENV=development
NEXT_PUBLIC_BASE_API_URL="http://localhost:4000/api/v1"

# These secrets MUST match the backend exactly for JWT verification to work!
JWT_SECRET="your_backend_jwt_secret"
EXPIRES_IN="15d"

REFRESH_TOKEN_SECRET="your_backend_refresh_token_secret"
REFRESH_TOKEN_EXPIRES_IN="30d"
```

### 4. Run the Development Server
Start the Next.js development server:
```bash
npm run dev
```
The application will be running at [http://localhost:3000](http://localhost:3000).

## 🌍 Deployment
This application is fully optimized for **Vercel** deployment. Ensure your environment variables are added to the Vercel dashboard prior to building.
