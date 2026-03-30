# Food Delivery Backend API

A complete RESTful Food Delivery backend API built as part of the **ElifTech School Test Task**.

**Complexity Level: Advanced**

## Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js + TypeScript** | Runtime & language |
| **NestJS** | Web framework |
| **Prisma** | ORM / data access layer |
| **MongoDB Atlas** | Database |
| **class-validator + class-transformer** | Input validation & transformation |
| **@nestjs/swagger** | API documentation (OpenAPI) |
| **@nestjs/config** | Environment configuration |

## Features

- Full CRUD operations for Shops, Products, Orders, and Coupons
- Advanced product filtering (category, multi-category, sort), pagination
- Order creation with real-time price calculation and coupon discount
- Order history lookup by email + phone or order ID
- Coupon validation with active/inactive status
- Global input validation with descriptive error messages
- Consistent error response format (`{ statusCode, message, error, path, timestamp }`)
- Swagger/OpenAPI documentation
- Database seeding script (idempotent)

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repo-url>
cd eliftech_backend
npm install
```

### 2. Configure Environment

Copy the example env file and fill in your MongoDB Atlas connection string:

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/food-delivery?retryWrites=true&w=majority"
PORT=3000
```

### 3. Generate Prisma Client

```bash
npm run prisma:generate
```

### 4. Seed the Database

```bash
npm run prisma:seed
```

This will populate the database with:
- 6 shops (ratings from 2.5 to 4.8)
- 10 products per shop across categories (Burgers, Pizza, Drinks, Desserts, Sides)
- 5 coupons (4 active: SAVE10, WELCOME20, FIRST15, HALF50; 1 inactive: EXPIRED)

### 5. Start the Server

```bash
# Development (watch mode)
npm run start:dev

# Production
npm run build
npm run start:prod
```

The API will be available at: `http://localhost:3000/api`
Swagger docs at: `http://localhost:3000/api/docs`

## API Endpoints

### Health

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Service health check |

### Shops

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/shops` | List all shops (optional: `?minRating=3&maxRating=5`) |
| GET | `/api/shops/:id` | Get shop details by ID |

### Products

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/shops/:shopId/products` | List products for a shop (supports `category`, `sortBy`, `page`, `limit`) |
| GET | `/api/shops/:shopId/categories` | List distinct product categories for a shop |

**Product Query Params:**
- `category` — filter by category (comma-separated for multiple: `Burgers,Pizza`)
- `sortBy` — `price_asc`, `price_desc`, or `name_asc`
- `page` — page number (default: `1`)
- `limit` — items per page (default: `10`)

### Orders

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Create a new order |
| GET | `/api/orders/history` | Get order history (`?email=...&phone=...` or `?orderId=...`) |
| GET | `/api/orders/:id` | Get a single order by ID |

**Create Order Body:**
```json
{
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "+380991234567",
  "address": "123 Main St, Kyiv",
  "shopId": "<shopObjectId>",
  "items": [
    { "productId": "<productObjectId>", "quantity": 2 }
  ],
  "couponCode": "SAVE10"
}
```

### Coupons

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/coupons` | List all active coupons |
| POST | `/api/coupons/validate` | Validate a coupon code (`{ "code": "SAVE10" }`) |

**Available Coupon Codes (after seeding):**
| Code | Discount |
|---|---|
| `SAVE10` | 10% |
| `WELCOME20` | 20% |
| `FIRST15` | 15% |
| `HALF50` | 50% |

## Error Response Format

All errors return a consistent JSON structure:

```json
{
  "statusCode": 404,
  "message": "Shop with id \"abc\" not found",
  "error": "Not Found",
  "path": "/api/shops/abc",
  "timestamp": "2026-03-28T10:00:00.000Z"
}
```

## npm Scripts

| Script | Description |
|---|---|
| `npm run start` | Start the server |
| `npm run start:dev` | Start in watch mode |
| `npm run build` | Build for production |
| `npm run start:prod` | Run production build |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:seed` | Seed the database |
| `npm run prisma:studio` | Open Prisma Studio |
