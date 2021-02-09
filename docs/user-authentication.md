# Notes

## User Model

- username : optional and unique
- email : hashed
- password : hashed
- role: admin, editor, author, reader
- status : verified, unverified, blocked, deleted
- verifyToken : 256 char

findByEmail()
save(username, email, password)
findByVerifyToken(token)

endpoints

## /auth/verify-signup

- email : must not already be there.

## /auth/signup

- email
- password

Execute the following :

1. validate the payload and send appropriate http error codes
2. validate if this user can be registered
   - email might be in use.
     - if yes, send an appropriate error message
3. store username, email, password in db
   - ensure that the status is updated to 'unverified'
     - could be the default value
   - add a verification-id uuid that is sent in the email
4. send an email to the user
5. redirect to /auth/verify-email

## GET /auth/verify-email

1. This is a request that comes from the webpage. must contain a very long uuid that will help you identify which email this request came from.
2. Look up the email and
   - if exists, login and redirect to /
   - if not exists, give a stern error message

## /auth/login

- email
- password

1. if exists, send access token (expiry=15min) and refresh token

## /auth/logout

- delete accessToken and refreshToken

## Doubts :

1. Should we add an optional username field?
   - could be set in the user settings
2. How to we reliably expire the email verification token?
3. There should be some handy helper scripts
   - revoke all tokens, revoke for a certain email etc
4. How does passport refresh access tokens and save it in db automatically?

## Implementation Notes

1. each route has the following
   - handler : performs the various operations as part of request-response cycle of a route
   - models : of the payload, so that they can be validated
   - response : build on some base responses

### JWT

## QA

- can't register existing users
- password has to have 6 to 16 characters. with at least a special character and a number
- user should only be allowed to login if their status is verified
