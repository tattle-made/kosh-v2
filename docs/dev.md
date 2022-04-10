# Prerequisite
You will need an .env file with the following structure to be located at src/backend/development.env
```
NODE_ENV=development
AWS_BUCKET_NAME=
SERVICE_AWS_ACCESS_KEY_ID=
SERVICE_AWS_SECRET_ACCESS_KEY=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
FELUDA_API_URL=http://feluda_api:7000
MONGO_DB_URL=mongodb://mongo
SQL_DB_HOST=db
SQL_DB_USERNAME=
SQL_DB_PASSWORD=
SQL_DB_DATABASE_NAME=
```

# Bring up Infrastructure
run `docker-compose up`.
This will bring up 4 docker containers.
| Container | Description |
| --- | --- |
| sql | sql server to store kosh data |
| sql_ui | a web UI for mysql. Can be accessed at localhost:8080 | 
| mongo | used to store unstructured metadata associated with every post |
| kosh_api | nodejs backend server | 

# Setup Database and Seed Values
```bash
cd src/backend/core/database
npx sequelize-cli db:migrate
npx sequelize-cli db:seed --seed 20211213080231-init-user-and-datasource.js.js
```

You will see credentials for 3 users printed. Note these down.

# Start Frontend Dev server
```bash
cd src/frontend
npm run start
```

Visit localhost:8000 and use the credentials from the previous step to login.
<!-- node scripts/checkmate/index.js --creator-id 0a7319f0-821d-11eb-bf26-111b891756e0 --datasource-id
0a7b3040-821d-11eb-bf26-111b891756e0 -->
