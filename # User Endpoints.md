# User Endpoints

## Get User Profile
`GET /users/profile`

Retrieves the profile information of the currently authenticated user.

### Authenticationnpx tailwindcss init -p

- Requires a valid JWT token in the Authorization header

### Response
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "phone": "string",
  "createdAt": "datetime"
}
```

### Status Codes
- `200 OK`: Successfully retrieved user profile
- `401 Unauthorized`: Invalid or missing authentication token

## Logout User
`POST /users/logout`

Logs out the current user by invalidating their authentication token.

### Authentication
- Requires a valid JWT token in the Authorization header

### Response
```json
{
  "message": "Successfully logged out"
}
```

### Status Codes
- `200 OK`: Successfully logged out
- `401 Unauthorized`: Invalid or missing authentication token
