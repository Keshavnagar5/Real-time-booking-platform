# /users/register Endpoint Documentation

## Description
Registers a new user by receiving their details, validating the data, creating the user account, and returning an authentication token along with the user details.


'POST' 

## Request Body
- **fullname**: An object containing:
  - **firstname**: string, minimum 3 characters (required)
  - **lastname**: string (can be empty or valid string)
- **email**: string, must be a valid email (required)
- **password**: string, minimum 6 characters (required)

## Response
- **Success (201):**
  - Returns an object with the authentication token and user data.
- **Validation Error (400):**
  - Returns an object with details of the failed validations.

## Example
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

## Example GET Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "5f8d04cd5b256b0017a6e123",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
    // ... other user properties ...
  }
}
```

## /users/login Endpoint Documentation

### Description
Logs in an existing user by validating credentials and returning an authentication token along with user details.

### Request Body
- **email**: string, must be a valid email (required)
- **password**: string, minimum 6 characters (required)

### Response
- **Success (200):**
  - Returns an object with the authentication token and user data.
- **Error (400/401):**
  - Returns validation errors or an invalid credentials message.

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "5f8d04cd5b256b0017a6e123",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
    // ... other user properties ...
  }
}
```

# /captain/register Endpoint Documentation

## Description
Registers a new captain by receiving their details, validating the data, creating the captain account, and returning the captain details.

'POST'

## Request Body
- **fullname**: An object containing:
  - **firstname**: string, minimum 3 characters (required)
  - **lastname**: string (optional)
- **email**: string, must be a valid email (required)
- **password**: string, minimum 6 characters (required)
- **vehicle**: An object containing:
  - **color**: string, minimum 3 characters (required)
  - **plate**: string, minimum 3 characters (required)
  - **capacity**: number, minimum 1 (required)
  - **vehicleType**: string, must be one of: 'car', 'motorcycle', 'auto' (required)

## Response
- **Success (201):**
  - Returns an object with the captain data.
- **Validation Error (400):**
  - Returns an object with details of the failed validations.

## Example Request
```json
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
```

## Example Response
```json
{
  "captain": {
    "_id": "5f8d04cd5b256b0017a6e456",
    "fullname": {
      "firstname": "Mike",
      "lastname": "Johnson"
    },
    "email": "mike.johnson@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

# /captain/login Endpoint Documentation

## Description
Authenticates a captain using their email and password.

## Request Body
- **email**: string, must be a valid email (required)
- **password**: string, minimum 6 characters (required)

## Response
- **Success (200):**
  - Returns an object with the authentication token and captain data.
- **Error (400/401):**
  - Returns validation errors or invalid credentials message.

## Example Request
```json
{
  "email": "mike.johnson@example.com",
  "password": "secret123"
}
```

## Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "5f8d04cd5b256b0017a6e456",
    "fullname": {
      "firstname": "Mike",
      "lastname": "Johnson"
    },
    "email": "mike.johnson@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```
