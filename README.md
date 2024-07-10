# Development instructions

## 1. Generate Login Sessions

Given the user models, and sign up endpoint. Complete the AuthenticationService class to create a session for user.

## 2. Authentication Middleware

Given the example API, create a Middleware that checks for JWT in api calls header.
It must be in the header `Authorization`
Check that token is valid, that means, is signed with the correct secret.

## 3. Adding new model

Create a new model called 'notes'

It must have the following data structure

```json
{
  name: string,
  content: string,
  user: Relation to the user,
  createdAt: Date,
}
```

- Create a service for it that extends the Base service

- Expose it via the API

- It must follow the REST API design pattern

- Call it with Postman or any other tool
