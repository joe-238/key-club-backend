# API Documentation

## Authentication

### POST /auth/register

Creates a new user.

Body:

- osis: number
- name: string
- email: string
- password: string
- grade: number

---

### POST /auth/login

Returns JWT token.

---

## Users

### GET /users/:osis

Get user by OSIS

### DELETE /users/:id

Delete user

### PUT /users/:id

Update user

---

## Events

### GET /events

Get all events

### POST /events

Create event (protected)

### GET /events/:id

Get event

### DELETE /events/:id

Delete event

---

## Service Hours

### POST /service-hours

Create service hours

### GET /service-hours/:eventId/user/:userId

Get service hours

### PUT /service-hours/:eventId/user/:userId

Update service hours

### DELETE /service-hours/:eventId/user/:userId

Delete service hours

---

## Announcements

### GET /announcements

Get all announcements

### POST /announcements

Create announcement (protected)

### GET /announcements/:id

Get announcement

### DELETE /announcements/:id

Delete announcement
