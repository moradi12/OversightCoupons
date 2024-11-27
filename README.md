
# OversightCoupons Frontend

OversightCoupons is a modern coupon management system designed for administrators to efficiently manage and organize coupons. Built using React and TypeScript, the project focuses on reliability, scalability, and a seamless user experience. It incorporates dynamic functionalities for adding, viewing, and managing coupons while maintaining a clean and responsive design with Tailwind CSS.

The project is part of a larger coupon management system and represents the frontend application, showcasing robust TypeScript implementation and reusable React components.

The application is deployed and live at: [OversightCoupons](https://frontcoupon.netlify.app/)

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Detailed Description](#detailed-description)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Admin Coupon Management**:
  - Add, view, and manage coupons.
  - Enforce coupon availability validation.
- **Dynamic and Modular UI**:
  - Components designed with flexibility and reusability in mind.
  - Tailwind CSS for a modern and responsive interface.
- **Notifications**:
  - Integrated with Notyf to provide instant feedback to users for actions like adding or deleting coupons.
- **TypeScript Integration**:
  - Strongly-typed code to prevent runtime errors and improve maintainability.
- **Scalable Codebase**:
  - Organized and modular structure to support future feature additions.

---

## Technologies Used

- **React**: Library for building user interfaces.
- **TypeScript**: Adds static type-checking to JavaScript for a robust development experience.
- **Tailwind CSS**: Utility-first CSS framework for quick and elegant styling.
- **Axios**: HTTP client for seamless API integration.
- **Notyf**: Notification library for displaying success and error messages.

---

## Detailed Description

OversightCoupons is a frontend project that allows administrators to manage coupons effectively. It simplifies the process of creating and listing coupons with a user-friendly interface. The app is designed to ensure reliability and scalability, featuring:

1. **Admin Access**: Ensures only authorized users can manage coupons, with a dedicated admin login (credentials below).
2. **Dynamic Coupon Features**: Includes the ability to add coupons with details like title, description, category, price, discount percentage, and availability.
3. **Real-Time Notifications**: Provides immediate feedback for all user actions, such as successfully adding a coupon or encountering an error.
4. **Responsive Design**: Adapts seamlessly across devices for optimal usability.
5. **Reusable Components**: Simplifies code maintenance and extension.

The project demonstrates strong technical principles, including state management, modular architecture, and efficient API handling, making it an ideal example of a professional-grade React and TypeScript application.

---

## Installation

To set up the project locally:

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

4. Open the application in your browser at `http://localhost:5173`.

---

## Usage

- **Admin Login**:
  - Use the following credentials to log in as an admin:
    - **Email**: `admin@admin.com`

- **Features**:
  - Navigate to the "Add Coupon" page to create new coupons.
