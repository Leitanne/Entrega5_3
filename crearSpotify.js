const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function spotify() {
  try {
    await client.connect();
    console.log("Conexión establecida correctamente");

    const database = client.db("spotify");

    await database.createCollection('usuaris', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['email', 'password'],
            properties: {
              email: {
                bsonType: 'string'
              },
              password: {
                bsonType: 'string'
              }
            }
          }
        }
      });

    const usuaris = database.collection("usuaris");

    } finally {
        // Ensures that the client will close when you finish/error
        console.log("Tancant connexió a la base de dades");
        await client.close();
    }
}

spotify().catch(console.dir);