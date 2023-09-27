const { MongoClient, ObjectId, Collection } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function youtube() {
    try {
        await client.connect();
        console.log("Conexión establecida correctamente");

        const database = client.db("youtube");
        const usuaris = database.collection("usuaris");
        const videos = database.collection("videos");
        const etiquetes = database.collection("etiquetes");
        const canals = database.collection("canals");
        const playlists = database.collection("playlists");
        const comentaris = database.collection("comentaris");

        //los likes y dislikes guardarlos en el mismo documento, no hace falta hacer una coleccion
    }finally{
        console.log("Tancant connexió a la base de dades");
        await client.close(); 
    }
}

youtube().catch(console.dir);