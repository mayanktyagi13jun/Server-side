import mongoose from 'mongoose';
// import { DB_URL } from './environment.js';

export default async function connectToDB() {
    try {
        let conn = await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected: ", conn.connection.host, conn.connection.name);
    }catch(error) {
        console.log("Error ============");
    console.log(error);
    process.exit(1);
    }
}