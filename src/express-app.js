import express from 'express';



export async function expressApp(app) {

    // app.use(express.json({ limit: "1mb" }));
    // app.use(express.urlencoded({ extended: true, limit: "1mb" }));

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    
}