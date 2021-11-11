const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const cors = require('cors')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json());
//connection string
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.weuxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db('PhonesDB');
        const serviceCollection = database.collection('phones');
        const myOrderCollection = database.collection('userOrders');
        const adminCollection = database.collection('admin');
        console.log('database connected');
        // getting from database
        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({})
            const services = await cursor.toArray();
            res.send(services)
        });

    }
    finally {

    }
}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('phone server is running');
})

app.listen(port, () => {
    console.log("server is running", port);
})