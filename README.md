# 🚗 Vehicle Rental System – Backend API

A backend service for managing **vehicle rentals**, including vehicle inventory, customer accounts, booking management, and secure authentication with role-based access.

---
Live Link :https://car-rent-main.vercel.app
---

## 📌 Features

- Vehicle inventory CRUD (Add / Update / Delete / View)
- Customer & Admin user roles with authorization
- User signup & login with JWT authentication
- Booking creation, cancellation & return management
- Price calculation based on rental duration
- PostgreSQL relational database design
- Modular & scalable folder architecture

---

## 🛠 Tech Stack

| Technology | Usage |
|----------|--------|
| **Node.js + TypeScript** | Backend runtime + type-safety |
| **Express.js** | Server framework |
| **PostgreSQL** | Database |
| **bcrypt** | Password hashing |
| **jsonwebtoken (JWT)** | User authentication |
| **Modular Architecture** | Services, Controllers, Routes for each module |

---                   

## 🗄 Database Schema

### **Users**
| Field | Description |
|---|---|
| id | Auto generated |
| name | Required |
| email | Unique & lowercase |
| password | Hashed with bcrypt |
| phone | Required |
| role | `admin` \| `customer` |

### **Vehicles**
| Field | Description |
|---|---|
| id | Auto generated |
| vehicle_name | Required |
| type | `car` `bike` `van` `SUV` |
| registration_number | Unique |
| daily_rent_price | Positive number |
| availability_status | `available` or `booked` |

### **Bookings**
| Field | Description |
|---|---|
| id | Auto generated |
| customer_id | FK → Users |
| vehicle_id | FK → Vehicles |
| rent_start_date | Required |
| rent_end_date | Must be after start date |
| total_price | (daily_rate × days) |
| status | `active` `cancelled` `returned` |

---

## 🔐 Authentication & Authorization

- Passwords hashed using **bcrypt**
- Login generates **JWT Token**
- Protected routes require:


### Role Permissions

| Role | Access |
|---|---|
| **Admin** | Manage users, vehicles & all bookings |
| **Customer** | View vehicles & manage own bookings |

---

## 🌐 API Endpoints

### **Auth**
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/v1/auth/signup` | Public | Register account |
| POST | `/api/v1/auth/signin` | Public | Login to get token |

---

### **Vehicles**
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/v1/vehicles` | Admin | Add vehicle |
| GET | `/api/v1/vehicles` | Public | Get all vehicles |
| GET | `/api/v1/vehicles/:vehicleId` | Public | Get single vehicle |
| PUT | `/api/v1/vehicles/:vehicleId` | Admin | Update vehicle |
| DELETE | `/api/v1/vehicles/:vehicleId` | Admin | Delete if no active booking |

---

### **Users**
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/api/v1/users` | Admin | Get all users |
| PUT | `/api/v1/users/:userId` | Admin/Owner | Update profile or role |
| DELETE | `/api/v1/users/:userId` | Admin | Delete if no active booking |

---

### **Bookings**
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/v1/bookings` | Customer/Admin | Create booking & auto price calc |
| GET | `/api/v1/bookings` | Role Based | Admin: all / Customer: own |
| PUT | `/api/v1/bookings/:bookingId` | Role Based | User: cancel before start / Admin: return vehicle |

---

## 🚀 Installation & Run

```bash
# install
git clone `https://github.com/CseRashed/car-rent.git`

# Create .env file
DATABASE_URL=postgres://...
JWT_SECRET=your_secret_key
PORT


# Start development server
npm run dev

