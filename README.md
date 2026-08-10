# Ecommerce Shop

Responsive e-commerce application built with React, Vite, JavaScript, Tailwind CSS, and Supabase.

The application includes product browsing and filtering, product details, shopping cart persistence, user authentication, protected routes, checkout, order creation, and order history.

## Features

### Products

* Load products from Supabase REST API
* Load product categories from Supabase
* Product details page
* Product search
* Filter products by:

  * Audience
  * Category
  * Minimum price
  * Maximum price
* Active products only
* URL-based filters using React Router search parameters

### Shopping Cart

* Add products to cart
* Select product size
* Change product quantity
* Remove products from cart
* Quick Add to Cart from product cards
* Separate cart items for the same product with different sizes
* Automatic cart total calculation
* Navbar cart quantity badge
* Cart persistence with `localStorage`
* Protection against invalid `localStorage` data

### Authentication

* User registration with Supabase Auth
* User login
* User logout
* Authentication state managed with React Context
* Session persistence
* Protected routes
* User profile creation through the database profile system

### Checkout

* Protected checkout page
* Shipping form
* Form validation
* Empty cart validation
* Order total calculation
* Authenticated REST requests using a Bearer token
* Order creation in Supabase
* Order items creation
* Prevention of duplicate order submission
* Cart automatically cleared after successful checkout
* Redirect to an order confirmation page

### Orders

* Authenticated users can view their own orders
* Orders are protected by Supabase Row Level Security
* Order items are loaded together with orders
* Product name, size, quantity, price, and item total are displayed
* Orders are sorted from newest to oldest
* Loading, error, and empty states

## Tech Stack

* React
* Vite
* JavaScript
* React Router
* Tailwind CSS
* Supabase PostgreSQL
* Supabase Auth
* Supabase REST API
* Fetch API
* React Context API
* localStorage
* Lucide React

## Architecture

Normal database communication is handled through the Supabase REST API using a custom `apiClient`.

```text
React
  ↓
apiClient
  ↓
Fetch API
  ↓
Supabase REST API
  ↓
PostgreSQL
```

Supabase JavaScript SDK is used only for authentication.

```text
React
  ↓
Supabase JS
  ↓
Supabase Auth
```

The application does not use `supabase.from()` for normal database queries.

## Main Database Tables

The application uses the following tables:

* `profiles`
* `categories`
* `products`
* `orders`
* `order_items`

The shopping cart is stored on the client and does not use a database table.

## Cart Item Structure

A cart item contains:

```js
{
  productId,
  name,
  imageUrl,
  price,
  size,
  quantity
}
```

The same product with different sizes is treated as a separate cart item.

## Authentication Flow

Supabase Auth is used for user authentication.

The `AuthContext` manages:

* `user`
* `session`
* `loading`
* logout

Protected routes redirect unauthenticated users to the Login page.

Currently protected pages include:

* Checkout
* My Orders

## Order Flow

The checkout flow works in the following order:

```text
Validate checkout form
        ↓
Validate shopping cart
        ↓
Get authenticated user/session
        ↓
Create order
        ↓
Receive order ID
        ↓
Create order items
        ↓
Clear shopping cart
        ↓
Open order confirmation page
```

Each order item stores product information such as:

* Product ID
* Product name
* Product image
* Size
* Quantity
* Price

This allows historical order data to remain available independently of the current cart state.

## Row Level Security

Supabase Row Level Security is used to protect user data.

Authenticated users should only be able to access data allowed by the configured RLS policies.

The application relies on these policies instead of requesting another user's orders manually from the frontend.

## Project Structure

```text
src/
├── api/
│   └── apiClient.js
│
├── components/
│   ├── auth/
│   ├── cart/
│   ├── layout/
│   ├── products/
│   └── ui/
│
├── config/
│   ├── api.js
│   └── supabase.js
│
├── contexts/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── ShopPage.jsx
│   ├── ProductDetailsPage.jsx
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── MyOrdersPage.jsx
│   ├── OrderConfirmationPage.jsx
│   └── AboutPage.jsx
│
├── App.jsx
└── main.jsx
```

## Environment Variables

Create a `.env` file in the project root.

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Do not expose a Supabase service role key in the frontend application.

## Installation

Clone the repository:

```bash
git clone https://github.com/mishaweb-developer/ecommerce-shop.git
```

Enter the project directory:

```bash
cd ecommerce-shop
```

Install dependencies:

```bash
npm install
```

Create the `.env` file and add your Supabase credentials.

Start the development server:

```bash
npm run dev
```

## Available Scripts

Start the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

## Current Limitations

Order creation currently uses two REST operations:

1. Create the `orders` row
2. Create the related `order_items`

These operations are not executed inside a single PostgreSQL transaction.

In a production application, this could be improved by moving the complete checkout operation into a database function, RPC call, or backend endpoint so that order and order item creation can be handled atomically.

Pagination for the product listing is also planned as a final improvement.

## Project Purpose

This project was created as a practical React learning project focused on implementing real application logic instead of only building a static interface.

The main areas practiced in this project include:

* React component structure
* React state management
* Context API
* React Router
* REST API communication
* Authentication
* Protected routes
* Form validation
* localStorage
* Relational database data
* Supabase Row Level Security
* Checkout and order workflows

## Author

**Miroljub Radojković**

GitHub: [mishaweb-developer](https://github.com/mishaweb-developer)
