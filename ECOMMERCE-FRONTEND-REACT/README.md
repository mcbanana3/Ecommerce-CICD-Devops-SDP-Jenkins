# ECommerce Frontend React Application

A comprehensive React-based frontend for the ECommerce application that integrates with the Spring Boot backend.

## Features

### 🛍️ Shopping Features
- **Product Browsing**: Browse products with advanced filtering and search
- **Product Details**: Detailed product pages with images and descriptions
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout Process**: Complete checkout with address and payment details
- **Order Management**: View order history and track order status

### 👤 User Management
- **User Registration & Login**: Secure authentication system
- **User Profile**: Manage personal information and address
- **Order History**: View past orders and their status

### 🏪 Seller Dashboard
- **Product Management**: Add, edit, and delete products
- **Inventory Tracking**: Monitor stock levels
- **Sales Analytics**: Basic analytics dashboard

### 🎨 UI/UX Features
- **Responsive Design**: Mobile-first responsive layout
- **Modern UI**: Bootstrap & Material-UI components
- **Toast Notifications**: User-friendly feedback messages
- **Loading States**: Smooth loading indicators

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Running Spring Boot backend (see ECOMMERCE-BACKEND-SPRINGBOOT)

## Installation & Setup

1. **Clone and navigate to the project:**
   ```bash
   cd ECOMMERCE-FRONTEND-REACT
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   The `.env` file is already configured with default values:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api
   VITE_BACKEND_URL=http://localhost:8080
   VITE_APP_NAME=ECommerce Shop
   VITE_APP_VERSION=1.0.0
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   Open your browser and go to `http://localhost:5173`

## Backend Integration

This frontend is designed to work with the Spring Boot backend. Make sure the backend is running on `http://localhost:8080` before starting the frontend.

### API Endpoints Used

- **Users**: `/api/users` - Registration, login, profile management
- **Products**: `/api/products` - Product listing, search, details
- **Cart**: `/api/cart` - Cart management
- **Orders**: `/api/orders` - Order creation and management
- **Sellers**: `/api/sellers` - Seller registration and management

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   ├── cart/            # Cart related components
│   ├── common/          # Common components (Navbar, Footer)
│   ├── product/         # Product related components
│   └── seller/          # Seller dashboard components
├── context/             # React Context providers
│   ├── AuthContext.jsx # Authentication state management
│   └── CartContext.jsx # Cart state management
├── pages/              # Main page components
│   ├── Home.jsx        # Landing page
│   ├── Products.jsx    # Product listing page
│   ├── Cart.jsx        # Shopping cart page
│   ├── Checkout.jsx    # Checkout process
│   ├── Orders.jsx      # Order history
│   ├── OrderDetails.jsx # Individual order details
│   ├── Profile.jsx     # User profile
│   └── SellerDashboard.jsx # Seller management
├── services/           # API service layers
│   ├── api.js          # Axios configuration
│   ├── authService.js  # Authentication services
│   ├── productService.js # Product services
│   ├── cartService.js  # Cart services
│   ├── orderService.js # Order services
│   └── sellerService.js # Seller services
└── utils/              # Utility functions
```

## Key Features Implementation

### Authentication System
- JWT-based authentication with Spring Boot backend
- Protected routes for authenticated users
- Role-based access (User, Seller)
- Persistent login state

### Shopping Cart
- Local state management with Context API
- Real-time cart updates
- Cart persistence across page refreshes
- Integration with backend cart API

### Product Management
- Advanced filtering (category, brand, price range)
- Search functionality
- Sorting options
- Pagination for large product lists

### Order Management
- Complete checkout flow
- Order tracking with status updates
- Order history with detailed views
- Multiple payment method support

### Seller Dashboard
- Product CRUD operations
- Inventory management
- Sales analytics
- Stock monitoring

## Environment Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8080/api` |
| `VITE_BACKEND_URL` | Backend server URL | `http://localhost:8080` |
| `VITE_APP_NAME` | Application name | `ECommerce Shop` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Dependencies

### Core Dependencies
- **React 19.1.0** - Frontend framework
- **React Router DOM** - Client-side routing
- **Bootstrap 5.3.8** - CSS framework
- **React Bootstrap** - Bootstrap components for React
- **Material-UI** - Additional UI components
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications

### Development Dependencies
- **Vite** - Build tool and development server
- **ESLint** - Code linting

## Usage Guide

### For Customers
1. **Browse Products**: Visit the Products page to see all available items
2. **Search & Filter**: Use the sidebar to filter by category, brand, or price
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Checkout**: Review your cart and proceed to checkout
5. **Track Orders**: View order status in the Orders page

### For Sellers
1. **Register as Seller**: Create a seller account
2. **Access Dashboard**: Go to Seller Dashboard after login
3. **Manage Products**: Add, edit, or delete products
4. **Monitor Inventory**: Track stock levels and sales

## Troubleshooting

### Common Issues

1. **Backend Connection Error**
   - Ensure the Spring Boot backend is running on port 8080
   - Check that the database is connected and running

2. **CORS Issues**
   - Backend is configured to allow `http://localhost:5173`
   - If using different port, update backend CORS configuration

3. **Authentication Issues**
   - Clear browser localStorage and try again
   - Check if backend authentication endpoints are working

4. **Build Issues**
   - Delete `node_modules` and run `npm install` again
   - Ensure Node.js version is 14 or higher

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of a learning exercise and is not intended for commercial use.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
