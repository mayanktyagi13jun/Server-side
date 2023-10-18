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
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **PORT**                    | Contains all  npm dependencies                                                            |
| **DB_URL**                  | Contains  source code                              |
| **JWT_EXPIRES_IN_Refresh**  | Application configuration including environment-specific configs 
| **JWT_EXPIRES_IN_Access**      | Controllers define functions to serve various express routes. 
| **APP_SECRET**      | Express middlewares which process the incoming requests before handling them down to the routes
| **SMTP_HOST**           | Contain all express routes, separated by module/area of application                       
| **SMTP_PORT**           | Models define schemas that will be used in storing and retrieving data from Application database  |
| **SMTP_USERNAME**         | Entry point to express app                                                               |
| **SMTP_PASSWORD**            | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | 
| **FROM_EMAIL**         | Entry point to express app                                                               |
| **FROM_NAME**         | Entry point to express app                                                               |



