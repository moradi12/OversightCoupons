
# OversightCoupons Frontend

OversightCoupons is a modern coupon management platform built with **React** and **TypeScript**, designed to streamline the process of managing coupons. This project features a clean UI and responsive design with **Tailwind CSS**, allowing administrators to create, manage, and organize coupons effectively.

## Features

- **Coupon Management**: Add, view, and manage coupons dynamically.
- **Reusable Components**: Modular React components for flexibility and maintainability.
- **TypeScript Support**: Strongly-typed codebase for reliability.
- **API Integration**: Axios-based utilities for seamless backend interaction.
- **Notifications**: Integrated real-time feedback using the Notyf library.

## Technologies Used

- **React** (Frontend framework)
- **TypeScript** (Type-safe JavaScript)
- **Tailwind CSS** (Utility-first styling)
- **Axios** (API communication)
- **Notyf** (User notifications)

## Project Structure

```
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
```

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (v7 or higher)

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

## Usage

### Admin Login

- **Email**: `admin@admin.com`

### Features Overview

- Add new coupons with details like name, description, category, price, and more.
- View and manage coupons dynamically from the admin panel.
- Receive real-time feedback through notifications.

## Contributing

Contributions are welcome! Feel free to fork this repository, make improvements, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Happy coding! 🚀
