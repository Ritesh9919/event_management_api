# 🎉 Event Management API

A RESTful API built with **Node.js**, **Express.js**, and **MongoDB** to manage events and user registrations.

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Ritesh9919/event_management_api
cd event-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
MONGODB_URI=mongodb://localhost:27017/event-db
PORT=5000
```

### 4. Run the Server

```bash
npm run dev
```

### Project Structure

```bash
event-management-api/
├── controllers/
│   └── event.controller.js
├── models/
│   ├── event.model.js
│   └── user.model.js
├── routes/
│   └── event.routes.js
├── utils/
│   ├── apiError.js
│   └── apiResponse.js
├── .env
├── package.json
├── server.js (or app.js)
└── README.md
```

### 🚀 Features

- Create Events

- Register Users

- Cancel Registration

- Get All Events

- View Upcoming Events

- View Event Stats

- MongoDB persistence using Mongoose

- Validation and error handling

## API Endpoints

### 1. Create Event

- URL: `/api/events/create`
- Method: `POST`
- Request Body:

```json
{
  "title": "Tech Conference",
  "dateTime": "2025-08-01T10:00:00Z",
  "location": {
    "address": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "country": "USA"
  },
  "capacity": 500
}
```

- Success Response:

```json
{
  "success": true,
  "data": {
    "eventId": "64a2e9c9bfa9e5a2f2a14f75"
  },
  "message": "Event created successfully"
}
```

### 2. Register for Event

URL: `/api/events/register/:eventId`

Method: `POST`

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

- Success Response:

```json
{
  "success": true,
  "data": {},
  "message": "User registered successfully"
}
```

### 3. Cancel Registration

URL: `/api/events/cancel?eventId={eventId}&userId={userId}`

Method: `DELETE`

- Success Response:

```json
{
  "success": true,
  "data": {},
  "message": "User registration canceled for event"
}
```

### 4. Get Event Details

URL: `/api/events/getDetails`

Method: `GET`

- Success Response:

```json
{
  "success": true,
  "data": {
    "events": [
      {
        "_id": "64a2e9c9bfa9e5a2f2a14f75",
        "title": "Tech Conference",
        "dateTime": "2025-08-01T10:00:00Z",
        "capacity": 500,
        "location": {
          "address": "123 Main St",
          "city": "San Francisco",
          "state": "CA",
          "country": "USA"
        },
        "registrations": [
          {
            "_id": "64a2ea2fbfa9e5a2f2a14f76",
            "name": "John Doe",
            "email": "john@example.com"
          }
        ]
      }
    ]
  },
  "message": "Events fetched successfully"
}
```

### 5. List Upcoming Events

URL: `/api/events/upcoming`

Method: `GET`

- Success Response:

```json
{
  "success": true,
  "data": {
    "events": [
      {
        "_id": "64a2e9c9bfa9e5a2f2a14f75",
        "title": "Tech Conference",
        "dateTime": "2025-08-01T10:00:00Z",
        "location": {
          "address": "123 Main St",
          "city": "San Francisco",
          "state": "CA",
          "country": "USA"
        },
        "capacity": 500,
        "registrations": []
      }
    ]
  },
  "message": "Upcoming events fetched successfully"
}
```

### 6. Get Event Stats

URL: `/api/events/stats/:eventId`

Method: `GET`

- Success Response:

```json
{
  "success": true,
  "data": {
    "totalRegistration": 45,
    "remainingCapicity": 455,
    "percentageOfCapicityUsed": "9%",
    "capacity": 500
  },
  "message": "Event stat fetched"
}
```
