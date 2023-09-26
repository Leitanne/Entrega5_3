const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function optica() {
  try {
    await client.connect();
    console.log("Conexión establecida correctamente");

    const database = client.db("pizzeria");

  } finally {
    // Ensures that the client will close when you finish/error
    console.log("Tancant connexió a la base de dades");
    await client.close();
  }
}
optica().catch(console.dir);