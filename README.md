# Real-Time Ride Booking Platform

A full-stack ride booking platform built with **React.js, Node.js, Express.js, MongoDB, Socket.IO, JWT, and Google Maps API**. The platform supports separate User and Captain roles, secure authentication, ride management, and real-time communication.

## 🚀 Features

- User registration and login
- Captain registration and login
- JWT-based authentication
- Role-based access control
- Ride booking and management
- Real-time ride updates using Socket.IO
- Live captain/driver location tracking
- Google Maps integration
- RESTful backend APIs
- MongoDB database with Mongoose
- Responsive React.js frontend
- Vehicle details and captain management

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- REST APIs
- Socket.IO
- JWT

### Database
- MongoDB
- Mongoose

### APIs & Tools
- Google Maps API
- Git
- GitHub
- Postman

## 📁 Project Structure

Real-time-booking-platform/
│
├── Backend/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   ├── server.js
│   ├── socket.js
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── README.md

👤 User Features

Users can:

Register an account
Log in securely
Request rides
Manage ride information
Receive real-time ride updates
Track the assigned captain
User Registration

Endpoint

POST /users/register
Request Body
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
User Login
POST /users/login
{
  "email": "john.doe@example.com",
  "password": "secret123"
}

🚗 Captain Features

Captains can:

Register with vehicle information
Log in securely
Receive ride requests
Manage rides
Share live location
Update ride status
Captain Registration
POST /captain/register
Request Body
{
  "fullname": {
    "firstname": "Mike",
    "lastname": "Johnson"
  },
  "email": "mike.johnson@example.com",
  "password": "secret123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}

Supported vehicle types:

Car
Motorcycle
Auto
Captain Login
POST /captain/login
{
  "email": "mike.johnson@example.com",
  "password": "secret123"
}

🔐 Authentication

The backend uses JWT authentication to secure protected routes.

The application supports two roles:

Role	Responsibilities
User	Register, login, request rides and track rides
Captain	Register, login, manage vehicles and handle rides

Role-based access control prevents users and captains from accessing unauthorized functionality.

⚡ Real-Time Communication

Socket.IO is used for real-time communication between users and captains.

It enables:

Real-time ride status updates
Captain location updates
Ride request communication
Live ride tracking

🗺️ Google Maps Integration

Google Maps API is integrated for location-based functionality such as:

Pickup and destination locations
Route information
Captain location tracking
Ride navigation
⚙️ Installation
1. Clone the Repository
git clone https://github.com/Keshavnagar5/Real-time-booking-platform.git

cd Real-time-booking-platform
2. Backend Setup
cd Backend
npm install

Create a .env file inside the Backend directory and configure the required environment variables.

Then start the backend:

npm start
3. Frontend Setup

Open another terminal:

cd frontend
npm install
npm run dev

The frontend will run using Vite.

🔄 Application Flow
User
  │
  ├── Register / Login
  │
  ├── Select Pickup & Destination
  │
  └── Request Ride
          │
          ▼
       Backend
          │
          ├── Validate Request
          ├── Find Captain
          └── Create Ride
                  │
                  ▼
               Captain
                  │
                  ├── Accept Ride
                  └── Share Location
                          │
                          ▼
                    Socket.IO
                          │
                          ▼
                    User Tracking
🧪 API Testing

The backend APIs can be tested using tools such as Postman.

Authentication, registration, ride, and captain endpoints can be tested by providing the required request body and JWT authentication token.

🔮 Future Improvements
Online payment integration
Ride history
Driver ratings and reviews
Push notifications
Ride fare estimation
Improved route optimization
Production deployment
Automated testing and CI/CD

👨‍💻 Author
Keshav Nagar
