OversightCoupons Frontend

OversightCoupons is a modern coupon management platform built with React and TypeScript, designed to streamline the process of managing coupons. This project features a clean UI and responsive design with Tailwind CSS, allowing administrators to create, manage, and organize coupons effectively.

OversightCoupons is a robust and dynamic coupon management system built using React and TypeScript. This project features a modular architecture and focuses on providing an intuitive user experience for managing coupons, offering functionality for creating, viewing, and reporting on coupons.
Features

    Coupon Management: Add, view, and manage coupons dynamically.
    Reusable Components: Modular React components for flexibility and maintainability.
    TypeScript Support: Strongly-typed codebase for reliability.
    API Integration: Axios-based utilities for seamless backend interaction.
    Notifications: Integrated real-time feedback using the Notyf library.

    Admin Management:
        Add, view, edit, and delete coupons.
        Secure admin-only operations.
    Reports and Export:
        Generate coupon reports and export data to Excel.
    Dynamic UI:
        Responsive and styled using Tailwind CSS.
    Utilities:
        Real-time notifications with Notyf.
        Local storage management for session data.
    TypeScript Safety:
        Type-safe codebase to reduce errors and improve maintainability.

Technologies Used

    React (Frontend framework)
    TypeScript (Type-safe JavaScript)
    Tailwind CSS (Utility-first styling)
    Axios (API communication)
    Notyf (User notifications)

    React: Frontend framework for creating dynamic components.
    TypeScript: Adds type safety to JavaScript.
    Redux: State management for application data.
    Axios: API calls for seamless backend interaction.
    Notyf: Notification system for user feedback.

Project Structure

typescript_coupon_front/
├── src/
│   ├── Components/
│   │   ├── Models/
│   │   │   ├── Category.ts    # Defines coupon categories
│   │   │   ├── Coupon.ts      # Represents coupon data structure
│   │   ├── AddCoupon/         # Component for adding coupons
│   │   ├── CouponList/        # Component for displaying coupon list
│   │   ├── utils/
│   │       ├── apiFunction.ts # Handles API requests
│   │       ├── notif.ts       # Provides notification utilities
│   ├── App.tsx
│   ├── index.tsx

typescript_coupon_front/
├── index.css                   # Global styles for the application
├── index.tsx                   # Main entry point for the React app
├── Components/
│   ├── Layout/
│   │   ├── Footer/             # Footer component and styles
│   │   ├── Header/             # Header component and styles
│   │   ├── Menu/               # Menu component for navigation
│   │   ├── MainLayout/         # Central layout component
│   ├── Models/
│   │   ├── Coupon.ts           # Defines coupon data structure
│   │   ├── UserDetails.ts      # Model for user information
│   ├── Pages/
│   │   ├── AddCoupon/          # AddCoupon component
│   │   ├── AllCoupons/         # Displays a list of all coupons
│   │   ├── Reports/            # Export and view coupon reports
│   │   ├── Login/              # Login page for admins
│   ├── Utils/
│       ├── notif.ts            # Notification utility
│       ├── LocalStorageService.ts  # Manages local storage
├── Redux/
│   ├── CouponSlice.ts          # Redux slice for managing coupon state
│   ├── store.ts                # Main Redux store

Getting Started
Prerequisites

Ensure you have the following installed:

    Node.js (v16 or higher)
    npm (v7 or higher)
    Node.js: Version 16 or higher
    npm: Version 7 or higher

Installation

    Clone the repository:

    git clone https://github.com/moradi12/OversightCoupons.git
    cd OversightCoupons/typescript_coupon_front

Install dependencies:

npm install

Start the development server:

npm run dev

    Open your browser at http://localhost:5173.

Usage
Admin Login

    Email: admin@admin.com

Features Overview

    Add new coupons with details like name, description, category, price, and more.
    View and manage coupons dynamically from the admin panel.
    Receive real-time feedback through notifications.

Contributing

Contributions are welcome! Feel free to fork this repository, make improvements, and submit a pull request.

    Admin Login:
        Email: admin@admin.com
    Features:
        Add, edit, and delete coupons.
        Export coupon data and view reports.

License

This project is licensed under the MIT License.

Happy coding! 🚀
