import dotEnv from "dotenv";

if(process.env.NODE_ENV !== "prod") {
    const configFile = `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({ path: configFile });
}else {
    dotEnv.config();
}

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

export {
   PORT, DB_URL
}