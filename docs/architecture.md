# Project Architecture

- backend
  - core
    - authentication
      - passportjs
    - database
      - models
    - http
      - models
      - response
  - app
    - user-authentication
      - validators-http.js
      - models-db.js
      - routes.js
      - index.js
        - configure, enable
    - health
    - data-source

What goes in core vs app

## user-authentication

- configure passport
- models for user?
- db access to create/update/delete users

app.js
initialize passportjs
setup routes for authentication

## Frontend

src/components : core components
atoms : very reusable components that could potentially be reused across the project atleast and throughout tattle even at some point.
molecules: app specific components
