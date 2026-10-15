# ⚡ EventPulse — Full-Stack Event Management & Booking Platform

A full-stack, responsive Event Management Web Application built with **React.js**, **Node.js (Express)**, and **MySQL**. 

EventPulse provides an end-to-end digital ticketing experience: users can explore curated upcoming events, reserve tickets with instant confirmation, leave verified reviews with star ratings, and view their ticket history. Administrators enjoy a centralized dashboard to publish events, view real-time bookings, and inspect attendee feedback.

---

## 🌟 Key Features

- **🔐 Secure Authentication**: JWT-based user sign-up and sign-in with `bcryptjs` password hashing and role-based permissions.
- **📅 Dynamic Event Directory**: Browse featured events with live keyword search, venue filtering, and category chips.
- **🎟️ Instant Ticket Booking**: Reserve single or group tickets with immediate digital confirmation and reference numbers (`#EP-XXXX`).
- **📋 My Bookings Dashboard**: Track all reserved tickets, view venue details, and cancel reservations anytime.
- **⭐ Verified Reviews & Star Ratings**: Submit 1-to-5 star ratings and commentary on events; browse real community feedback.
- **🛡️ Admin Command Center**:
  - Live metric KPI cards (Total Events, Active Reservations, Reviews, System Status).
  - Create and publish new events with custom date/time, venue, and cover images.
  - Delete expired or cancelled events.
  - Inspect all attendee reservations with names, emails, and event titles.
  - Read attendee review feedback.
- **🎨 Modern Dark Glassmorphic UI**: Cohesive Indigo/Violet neon palette, smooth micro-interactions, responsive grid layout, and fluid typography.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, React Router v7, Axios, Modern Vanilla CSS3 (Custom Design System) |
| **Backend** | Node.js (ES Modules), Express.js 4, CORS, Dotenv |
| **Database** | MySQL (compatible with MySQL Server, MySQL Workbench, XAMPP, or MariaDB) |
| **Security** | JSON Web Tokens (JWT), Bcrypt password hashing |

---

## 📦 What to Download & Install (Prerequisites)

Before starting, ensure you have the following installed on your machine:

1. **Node.js & npm** (v18.0.0 or higher recommended)
   - Download from: [https://nodejs.org/](https://nodejs.org/)
   - Verify by running `node -v` and `npm -v` in your terminal.

2. **MySQL Database Server** (Choose either Option A or Option B):
   - **Option A (Recommended for Beginners)**: **XAMPP**
     - Download from: [https://www.apachefriends.org/](https://www.apachefriends.org/)
     - Start the **MySQL** module from the XAMPP Control Panel.
     - Default host: `localhost`, user: `root`, password: *(blank)*.
   - **Option B**: **MySQL Community Server & MySQL Workbench**
     - Download from: [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/)
     - Set your root password during installation.

---

## 🚀 Setup & Execution Guide (Tip to Toe)

### Step 1: Database Setup

1. Open your MySQL tool (**MySQL Workbench**, **phpMyAdmin** in XAMPP, or your command-line terminal).
2. Execute the provided [`schema.sql`](schema.sql) file located in the root of this project:
   - In **MySQL Workbench**: Click **File** → **Open SQL Script** → select `schema.sql` → click the **Lightning Bolt ⚡** icon to execute.
   - In **phpMyAdmin** (XAMPP): Click **Import** → choose `schema.sql` → click **Go**.
   - In **Command Line**:
     ```bash
     mysql -u root -p < schema.sql
     ```
3. This creates the `eventdb` database, sets up all four tables (`users`, `events`, `bookings`, `feedback`), and inserts rich starter seed data with upcoming events and demo accounts.

---

### Step 2: Backend Setup (`server`)

1. Open a terminal in the project directory:
   ```bash
   cd server
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Verify or adjust your `.env` configuration file in the `server/` directory:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=eventdb
   DB_PORT=3306
   JWT_SECRET=eventpulse_super_secret_jwt_key_2026
   ```
   *(If you are using XAMPP's default settings, leave `DB_PASSWORD=` blank)*.

4. Start the backend server:
   ```bash
   node server.js
   ```
   *You should see:*
   ```text
   🚀 EventPulse Server is running on port 5000 (http://localhost:5000)
   ✅ MySQL Database connected successfully to "eventdb"
   ```

---

### Step 3: Frontend Setup (`client`)

1. Open a **second terminal window** in the project directory:
   ```bash
   cd client
   ```
2. Install the client dependencies:
   ```bash
   npm install
   ```
3. Launch the development server:
   ```bash
   npm start
   ```
4. Your browser will automatically open [http://localhost:3000](http://localhost:3000).

---

## 🔑 Default Credentials for Testing

The database comes pre-seeded with ready-to-use accounts:

| Role | Email | Password | Access Capabilities |
|---|---|---|---|
| **Administrator** | `admin@eventpulse.com` | `admin123` | Full Admin Dashboard, create/delete events, view all bookings & feedback |
| **Regular User** | `alex@eventpulse.com` | `demo123` | Reserve tickets, cancel bookings, submit reviews |

*(Tip: On the Sign In page, use the **Quick Demo Fill** buttons to autofill these credentials with a single click!)*

---

## 📂 Project Architecture & Function Breakdown

```text
Event-Management-System/
├── schema.sql                 # Complete MySQL schema creation & seed script
├── README.md                  # Complete project documentation
├── server/                    # Node.js Express REST API backend
│   ├── package.json           # Backend dependencies and scripts
│   ├── server.js              # Application entry point & route registration
│   ├── .env                   # Active environment variables
│   ├── .env.example           # Environment template
│   ├── controllers/           # Request handlers and business logic
│   │   ├── authController.js      # User registration, login, JWT token generation
│   │   ├── eventController.js     # Get all events, get event by ID, create, update, delete
│   │   ├── bookingController.js   # Create user booking, get user bookings, cancel booking
│   │   ├── feedbackController.js  # Submit reviews & ratings, fetch feedback by event
│   │   └── adminController.js     # Aggregated data for admin (all bookings, all feedback)
│   ├── middleware/            # Custom express middlewares
│   │   ├── authMiddleware.js      # Verifies JWT bearer tokens & checks admin role
│   │   └── errorHandler.js        # Global error catcher
│   ├── models/                # MySQL database abstraction layer
│   │   ├── db.js                  # MySQL2 connection pool configuration
│   │   ├── userModel.js           # User table queries (create, findByEmail, findById)
│   │   ├── eventModel.js          # Event CRUD queries with cascade deletion
│   │   ├── bookingModel.js        # Booking queries (create, user history, admin list)
│   │   └── feedbackModel.js       # Feedback queries (submit review, event reviews, admin list)
│   └── routes/                # Express endpoint routers
│       ├── authRoutes.js          # POST /api/auth/register, POST /api/auth/login
│       ├── eventRoutes.js         # GET /api/events, GET /:id, POST /, PUT /:id, DELETE /:id
│       ├── bookingRoutes.js       # POST /api/bookings, GET /my, DELETE /:id
│       ├── feedbackRoutes.js      # POST /api/feedback, GET /event/:eventId
│       └── adminRoutes.js         # GET /api/admin/events, /bookings, /feedback
│
└── client/                    # React single page application (SPA)
    ├── package.json           # Frontend packages & scripts
    ├── public/
    │   └── index.html         # Main HTML document with custom Google Fonts
    └── src/
        ├── index.js           # React root mounting
        ├── App.jsx            # App shell with client-side routing
        ├── styles/
        │   └── global.css     # Design tokens, variables, cards, buttons & dark theme
        ├── components/
        │   ├── Navbar.jsx         # Sticky blurred header with active links & auth state
        │   ├── Footer.jsx         # Modern branding footer
        │   ├── EventCard.jsx      # Interactive event card with image, badges & details link
        │   ├── BookingForm.jsx    # Reservation modal/form with ticket counter & JWT verification
        │   └── FeedbackForm.jsx   # 5-Star rating picker & review submission form
        ├── pages/
        │   ├── WelcomePage.jsx    # High-impact animated hero landing page
        │   ├── HomePage.jsx       # Event explorer with live search and category chips
        │   ├── EventDetails.jsx   # 2-column event page with hero banner & live reviews
        │   ├── LoginPage.jsx      # Auth page with floating inputs & demo quick-fill
        │   ├── RegisterPage.jsx   # User registration with password security
        │   ├── MyBookings.jsx     # Attendee ticket management dashboard with cancellation
        │   └── AdminDashboard.jsx # Full management suite (KPIs, Event editor, Bookings, Reviews)
        └── services/
            ├── api.js             # Central Axios instance with JWT Authorization interceptor
            ├── auth.js            # Login, register, logout, and token retrieval helpers
            ├── eventService.js    # API wrappers for fetching events
            ├── bookingService.js  # API wrappers for creating and retrieving bookings
            └── feedbackService.js # API wrappers for reviews and ratings
```

---

## 📡 REST API Reference

### 1. Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user account | No |
| `POST` | `/api/auth/login` | Sign in & receive JWT token | No |

### 2. Events (`/api/events`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/events` | List all upcoming events | No |
| `GET` | `/api/events/:id` | Get event details by ID | No |
| `POST` | `/api/events` | Create a new event | Admin |
| `PUT` | `/api/events/:id` | Update event information | Admin |
| `DELETE` | `/api/events/:id` | Delete event and its bookings | Admin |

### 3. Bookings (`/api/bookings`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/bookings` | Book tickets for an event | User |
| `GET` | `/api/bookings/my` | View logged-in user's bookings | User |
| `DELETE` | `/api/bookings/:id` | Cancel a reservation | User |

### 4. Feedback (`/api/feedback`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/feedback` | Submit star rating and review | User |
| `GET` | `/api/feedback/event/:eventId` | Get all feedback for an event | No |

### 5. Admin (`/api/admin`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/admin/events` | Get all events list | Admin |
| `GET` | `/api/admin/bookings` | Get all attendee reservations | Admin |
| `GET` | `/api/admin/feedback` | Get all reviews across platform | Admin |

---

## 💡 Troubleshooting & Common Tips

- **Database Connection Error (`ECONNREFUSED 127.0.0.1:3306`)**:
  - Ensure MySQL is actively running in XAMPP or Windows Services.
  - Verify your password in `server/.env`.
- **CORS or Network Error**:
  - Make sure the backend server is running on port 5000 before clicking booking actions.
  - The client includes built-in preview fallback data so you can preview all UI layouts even before connecting your database!

---

## 📄 License
This project is licensed under the MIT License.
