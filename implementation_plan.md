# IMPERIAL PRESTIGE - E-COMMERCE IMPLEMENTATION PLAN

## 1. System Architecture Overview

### High-Level Architecture
- **Client (Frontend)**: Next.js (React) Application. Server-Side Rendering (SSR) for SEO, Client-Side Rendering (CSR) for dynamic dashboards.
- **Server (Backend)**: Node.js + Express REST API. Decoupled from frontend.
- **Database**: MongoDB (NoSQL) for flexible product schemas (variations) and high-volume read performance.
- **Authentication**: JWT (JSON Web Tokens) with HttpOnly cookies for security. Role-based middleware (Visitor, Customer, Admin).
- **Communication**: RESTful API endpoints.

### Tech Stack
- **Frontend**: Next.js 14+, Vanilla CSS (CSS Modules for components), Context API for state management.
- **Backend**: Node.js, Express, Mongoose (ODM), Bcrypt (hashing), Multer (file uploads).
- **External Services (Simulated/Ready)**: Stripe/Payment Gateways, Cloudinary (Image hosting - mocked or prepared).

---

## 2. Database Schema (MongoDB/Mongoose)

### Collections

#### 1. Users
| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Unique ID |
| `name` | String | Full name |
| `email` | String | Unique email |
| `password` | String | Hashed password |
| `role` | Enum | 'customer', 'admin' |
| `phone` | String | Contact number |
| `address` | Object | { street, city, zip, country } |
| `wishlist` | [ObjectId] | Ref to Products |
| `createdAt` | Date | Registration date |

#### 2. Products
| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Unique ID |
| `name` | String | Product name |
| `slug` | String | URL-friendly unique slug |
| `description` | String | HTML/Text description |
| `category` | String | e.g., 'Perfumes', 'Watches' |
| `brand` | String | Brand name |
| `price` | Number | Base price |
| `discount` | Number | Discount percentage |
| `stock` | Number | Total quantity available |
| `images` | [String] | Array of image URLs |
| `variations` | Array | [{ type: 'Size', value: '100ml', stock: 10 }] |
| `tags` | [String] | 'Trending', 'New Arrival' |
| `ratings` | Object | { average: Number, count: Number } |

#### 3. Orders
| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Unique ID |
| `user` | ObjectId | Ref to User |
| `items` | Array | [{ product: Ref, quantity: Number, price: Number, variation: String }] |
| `totalAmount` | Number | Final price after discount |
| `status` | Enum | 'Placed', 'Processing', 'Shipped', 'Delivered', 'Returned' |
| `paymentMethod` | Enum | 'Card', 'bKash', 'Nagad', 'COD' |
| `paymentStatus` | Enum | 'Pending', 'Paid', 'Failed' |
| `shippingAddress` | Object | Snapshot of user address |
| `timeline` | Array | [{ status: String, timestamp: Date }] |

#### 4. Reviews
| Field | Type | Description |
| :--- | :--- | :--- |
| `product` | ObjectId | Ref to Product |
| `user` | ObjectId | Ref to User |
| `rating` | Number | 1-5 |
| `comment` | String | Text review |
| `images` | [String] | Review images |

---

## 3. Backend Folder Structure (`/server`)

```
/server
  /config
    db.js           # Database connection
  /controllers
    authController.js
    productController.js
    orderController.js
    adminController.js
  /middleware
    authMiddleware.js # Protect routes, check roles
    errorMiddleware.js
  /models
    User.js
    Product.js
    Order.js
    Review.js
  /routes
    authRoutes.js
    productRoutes.js
    orderRoutes.js
    uploadRoutes.js
  /data
    products.js     # Seed data
  server.js         # Entry point
  .env              # Environment variables
```

---

## 4. Frontend Folder Structure (`/client`)

```
/client
  /app              # Next.js App Router
    /admin          # Admin Dashboard (Protected)
    /dashboard      # Customer Dashboard (Protected)
    /cart           # Cart Page
    /checkout       # Checkout Page
    /login          # Auth Page
    /products
      /[id]         # Product Details
    page.js         # Homepage
    layout.js       # Root Layout (Fonts, Global CSS)
  /components
    /common         # Button, Input, Modal
    /layout         # Navbar, Footer
    /product        # ProductCard, ProductList
    /admin          # AdminCharts, InventoryTable
  /context
    AuthContext.js  # User state
    CartContext.js  # Cart state
  /lib
    api.js          # Axios instance
    utils.js        # Helpers
  /styles
    globals.css     # Global variables & reset
    variables.css   # Colors, typography
```

---

## 5. Authentication Flow

1.  **Login**: User sends `email` + `password`.
    -   Server verifies hash.
    -   Server generates JWT signed with secret.
    -   Server sends JWT in HTTPOnly Cookie (secure).
    -   Client receives generic user info (name, role) for UI.
2.  **Access Protected Route**:
    -   Client makes request to `/api/orders`.
    -   Browser automatically sends Cookie.
    -   Server Middleware verifies JWT -> decodes userId -> fetches User -> checks Role -> Allows/Denies.

---

## 6. Seed Data Strategy

-   **Script**: `server/seeder.js`
-   **Execution**: Run `npm run data:import`.
-   **Content**:
    -   1 Admin User, 3 Demo Customers.
    -   Products: 4 Categories (Perfume, Gadget, Accessory, Watch).
    -   ~50 Products initially (scalable to 200).
    -   Real images linked from Unsplash/Pexels using keywords matching category.

---

## 7. Deployment Readiness
-   **Environment Variables**: Strict separation.
-   **Error Handling**: Centralized error middleware returning JSON standard responses.
-   **Security**: Helmet (headers), CORS configured, Rate Limiting ready.
