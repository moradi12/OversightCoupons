
# OversightCoupons Frontend

OversightCoupons is a modern, React and TypeScript-based coupon management platform. With a clean UI powered by Tailwind CSS, it allows administrators to efficiently create, manage, and organize coupons, providing a seamless user experience.

---

## Features

### Coupon Management
- Add, view, edit, and delete coupons dynamically.
- Generate coupon reports and export data to Excel.

### Admin Management
- Secure admin-only operations.
- Real-time notifications with **Notyf**.

### Utilities & Integration
- **TypeScript**: Strongly-typed codebase for reliability.
- **Axios**: API integration for seamless backend communication.
- **Redux**: Manage state efficiently.

### Dynamic UI
- Responsive and modular design with **Tailwind CSS**.
- Reusable components for flexibility and maintainability.

---

## Technologies Used
- **React**: Frontend framework for dynamic components.
- **TypeScript**: Adds type safety to JavaScript.
- **Tailwind CSS**: Utility-first styling.
- **Axios**: Handles API calls.
- **Notyf**: Provides user feedback notifications.
- **Redux**: State management.

---

## Project Structure

```
typescript_coupon_front/
├── src/
│   ├── Components/
│   │   ├── Models/
│   │   │   ├── Category.ts       # Coupon categories
│   │   │   ├── Coupon.ts         # Coupon data structure
│   │   ├── AddCoupon/            # AddCoupon component
│   │   ├── CouponList/           # Display list of coupons
│   ├── Utils/
│   │   ├── apiFunction.ts        # API utilities
│   │   ├── notif.ts              # Notification utilities
│   ├── Redux/
│       ├── CouponSlice.ts        # Coupon state management
│       ├── store.ts              # Redux store setup
│   ├── App.tsx
│   ├── index.tsx
```

---

## Getting Started

### Prerequisites
- **Node.js**: v16 or higher
- **npm**: v7 or higher

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

4. Open your browser at [http://localhost:5173](http://localhost:5173).

---

## Admin Login

- **Email**: admin@admin.com

---

## Contributing

Contributions are welcome! Fork this repository, make your improvements, and submit a pull request.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

Happy coding! 🚀
