import {MongoClient} from "mongodb";

let db;
const url = 'mongodb+srv://test-user:PA5T3PAIECPfjNXj@cluster0.bhtdd.mongodb.net/testApp?retryWrites=true&w=majority';

const connectToServer = () => {
  MongoClient.connect(url, (err, client) => {
    if (err) return console.log(err);
    db = client.db('testApp');
    console.log('DB connection is active');
  })
}

export  { connectToServer, db};
