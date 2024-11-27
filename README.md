
# OversightCoupons Frontend

OversightCoupons is a robust and dynamic coupon management system built using **React** and **TypeScript**. This project features a modular architecture and focuses on providing an intuitive user experience for managing coupons, offering functionality for creating, viewing, and reporting on coupons.

---

## Features

- **Admin Management**: 
  - Add, view, edit, and delete coupons.
  - Secure admin-only operations.
- **Reports and Export**: 
  - Generate coupon reports and export data to Excel.
- **Dynamic UI**: 
  - Responsive and styled using **Tailwind CSS**.
- **Utilities**: 
  - Real-time notifications with **Notyf**.
  - Local storage management for session data.
- **TypeScript Safety**: 
  - Type-safe codebase to reduce errors and improve maintainability.

---

## Technologies Used

- **React**: Frontend framework for creating dynamic components.
- **TypeScript**: Adds type safety to JavaScript.
- **Redux**: State management for application data.
- **Axios**: API calls for seamless backend interaction.
- **Notyf**: Notification system for user feedback.

---

## Project Structure

```
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
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js**: Version 16 or higher
- **npm**: Version 7 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/moradi12/OversightCoupons.git
   cd OversightCoupons/typescript_coupon_front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`.

---

## Usage

- **Admin Login**:
  - Email: `admin@admin.com`
- **Features**:
  - Add, edit, and delete coupons.
  - Export coupon data and view reports.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

Built with dedication to modular design and developer-friendly practices. Happy coding! 🚀
