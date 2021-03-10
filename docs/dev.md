nodemon --inspect=0.0.0.0 index.js
node index.js

## Setup Database and Seed Values

### Create D

cd core/database
npx sequelize-cli db:migrate:status
npx sequelize-cli db:migrate

Create Seed Data in the database
cd /app
node core/database/seeders/create-initial-users.js

node scripts/checkmate/index.js --creator-id 0a7319f0-821d-11eb-bf26-111b891756e0 --datasource-id
0a7b3040-821d-11eb-bf26-111b891756e0
