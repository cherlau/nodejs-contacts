# NodeJS Contacts

Web application to manage contacts, built with Node.js and Vue.js.

**Live:** https://cherlaufilho-nodejs.recruitment.alfasoft.pt

---

## Tech Stack

**Backend**
- Node.js + Express 5
- mysql2 (raw SQL, no ORM)
- Multer (image upload)
- JWT + bcryptjs (authentication)
- Jest + Supertest (tests)

**Frontend**
- Vue 3 (Composition API, `<script setup>`)
- Vue Router (history mode)
- Pinia (state management)
- Axios
- Vite

**Database:** MariaDB (remote)

---

## Features

- List all contacts on the landing page, displayed as cards with photo and details
- Contact detail page
- Add new contact (authenticated)
- Edit existing contact using the same form (authenticated)
- Delete contact with confirmation modal (authenticated)
- JWT authentication — public routes for viewing, protected routes for mutations
- Form validation on both frontend and backend
- Unique constraint on contact number and email

---

## Project Structure

```
nodejs-contacts/
├── config/
│   └── database.js          # mysql2 connection pool
├── controllers/
│   ├── authController.js    # login, JWT generation
│   └── contactsController.js# CRUD handlers + validation
├── middleware/
│   ├── auth.js              # JWT verification
│   └── upload.js            # Multer config
├── routes/
│   ├── auth.js              # POST /api/auth/login
│   └── contacts.js          # /api/contacts CRUD
├── tests/
│   └── contacts.test.js     # Jest + Supertest
├── frontend/
│   └── src/
│       ├── api/             # Axios layer
│       ├── stores/          # Pinia stores
│       ├── services/        # Business logic
│       ├── composables/     # Reusable Vue logic
│       ├── components/      # UI components
│       └── views/           # Page components
├── dist/                    # Frontend build (served by Express)
├── uploads/                 # Contact images
└── server.js
```

---

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/login | No | Login, returns JWT |
| GET | /api/contacts | No | List all contacts |
| GET | /api/contacts/:id | No | Get contact details |
| POST | /api/contacts | Yes | Create contact |
| PUT | /api/contacts/:id | Yes | Update contact |
| DELETE | /api/contacts/:id | Yes | Delete contact |

### Validation rules
- `name`: required, length > 5
- `contact`: required, exactly 9 digits
- `email`: required, valid format
- `picture`: required on POST (multipart/form-data)
- `contact` and `email` must be unique

---

## Running Locally

### Prerequisites
- Node.js 18+
- Access to the remote MariaDB (or a local MySQL instance)

### Setup

```bash
# Install backend dependencies
npm install

# Create .env at the project root
cp .env.example .env
# Fill in DB credentials and JWT_SECRET

# Install and build the frontend
cd frontend
npm install
npm run build
cd ..

# Start the server
npm start
```

The app will be available at `http://localhost:3000`.

For frontend development with hot reload:
```bash
cd frontend
npm run dev
```

### Environment Variables

```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=3306
JWT_SECRET=
PORT=3000
```

---

## Running Tests

Tests run against the real database. Make sure the `.env` is configured before running.

```bash
npm test
```

Test coverage includes:
- `POST /api/contacts` — returns 401 without token
- `POST /api/contacts` — returns 400 with invalid name, contact, email, missing image
- `PUT /api/contacts/:id` — returns 400 with invalid fields, 404 for unknown id

---

## Login Credentials (for evaluation)

```
Username: admin
Password: admin
```
