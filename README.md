# Project Title

A nice project with a nice description

---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **src**                  | Contains  source code                              |
| **src/configuration**    | Application configuration including environment-specific configs 
| **src/controllers**      | Controllers define functions to serve various express routes. 
| **src/middlewares**      | Express middlewares which process the incoming requests before handling them down to the routes
| **src/routes**           | Contain all express routes, separated by module/area of application                       
| **src/models**           | Models define schemas that will be used in storing and retrieving data from Application database  |
| **src**/index.js         | Entry point to express app                                                               |
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | 

## Environment Variables
Here are list of environment variables

| Name | Description |
| ------------------------ | ------------------------------------------------------|
| **PORT**                    | Port for server                                    |
| **DB_URL**                  | URI for DB connection                              |
| **JWT_EXPIRES_IN_Refresh**  | Time for JWT refresh token expiration              |
| **JWT_EXPIRES_IN_Access**      | Time for JWT access token expiration            |
| **APP_SECRET**      | Secret key to sign JWT token                               |
| **SMTP_HOST**           | SMTP host for mail functionality                       |
| **SMTP_PORT**           | SMTP port for mail  functionality                      |
| **SMTP_USERNAME**         | SMTP user for mail  functionality                    |
| **SMTP_PASSWORD**            | SMTP password for mail functionality              | 
| **FROM_EMAIL**         | From email field for mail functionality                 |
| **FROM_NAME**         | From name field for mail functionality                   |



