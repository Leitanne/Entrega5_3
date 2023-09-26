const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function optica() {
  try {
    await client.connect();
    console.log("Conexión establecida correctamente");

    const database = client.db("optica");
    const proveidors = database.collection("proveidors");
    const ulleres = database.collection("ulleres");
    const clients = database.collection("clients");
    
    // ------------------------------ Clients ---------------------------//
    console.log(">>>>>>>>>>Clients<<<<<<<<<<<");
    const client1 = {
      nom: "client1",
      adreca: "carrer de mentida, 1, 08001, Barcelona",
      telefon: "677663772",
      correu: "client1@correu.com",
      data_registre: new Date("2023-02-20"), 
    };

    const client2 = {
      nom: "client2",
      adreca: "carrer de mentida, 2, 08001, Barcelona",
      telefon: "673553662",
      correu: "client2@correu.com",
      data_registre: new Date("2023-09-01"),
      recomanat_per: [new ObjectId()], 
    }

    const clientsResult = await clients.insertMany([client1, client2]);
    let clientsIds = clientsResult.insertedIds;
    console.log(`${clientsResult.insertedCount} documents s'han insertat.`);

    for (let id of Object.values(clientsIds)) {
        console.log(`S'ha insertat un document amb id: ${id}`);
    }

    await clients.updateOne(
      { _id: client2._id},
      { $set: { recomanat_per: [clientsIds[0]]} }
    );

    // ------------------------------ Proveidors ---------------------------//
   
    console.log(">>>>>>>>>>Proveidors<<<<<<<<<<<");
    const proveidor1 = {
      nom: "Proveidor 1",
      adreca: {
        carrer: "Carrer de proveidor1",
        numero: "1",
        ciutat: "Barcelona",
        codi_postal: "08888",
        pais: "Espanya",
      },
      telefon: "787878787",
      nif: "69213132V",
    };

    const proveidor2 = {
      nom: "Proveidor 2",
      adreca: {
        carrer: "Carrer de proveidor2",
        numero: "2",
        ciutat: "Barcelona",
        codi_postal: "08889",
        pais: "Espanya",
      },
      telefon: "656565656",
      nif: "897976554V",
    };
    
    const proveidorsResult = await proveidors.insertMany([proveidor1, proveidor2]);
    let proveidorsIds = proveidorsResult.insertedIds;
    console.log(`${clientsResult.insertedCount} documents s'han insertat.`);

    for (let id of Object.values(proveidorsIds)) {
        console.log(`S'ha insertat un document amb id: ${id}`);
    }

    // ------------------------------ Ulleres ---------------------------//

    console.log(">>>>>>>>>>Ulleres<<<<<<<<<<<");

    const ullera1 = {
      marca: "marca1",
      graduacio_dret: "1.5",
      graduacio_esquerra: "1.5",
      tipus_montura: "pasta",
      color_montura: "negre",
      color_vidre_esquerra: "blau",
      color_vidre_dreta: "blau",
      preu: 70.60,
      proveidor: [proveidorsIds[0]],
      client: [clientsIds[1]],
      venut_per: "Mercè",
      inici_venda: new Date("2023-01-31"),
      fi_venda: new Date("2023-09-20"),
    };

    const ullera2 = {
      marca: "marca2",
      graduacio_dret: "1.8",
      graduacio_esquerra: "1.8",
      tipus_montura: "metal·lica",
      color_montura: "blau",
      color_vidre_esquerra: "verd",
      color_vidre_dreta: "verd",
      preu: 59.99,
      proveidor: [proveidorsIds[1]],
      client: [clientsIds[0]],
      venut_per: "Joan",
      inici_venda: new Date("2023-03-15"),
      fi_venda: new Date("2023-05-12"),
    };

    const ulleresResult = await ulleres.insertMany([ullera1, ullera2]);
    let ulleresIds = ulleresResult.insertedIds;
    console.log(`${ulleresResult.insertedCount} documents s'han insertat.`);

    for (let id of Object.values(ulleresIds)) {
        console.log(`S'ha insertat un document amb id: ${id}`);
    }

  } finally {
    // Ensures that the client will close when you finish/error
    console.log("Tancant connexió a la base de dades");
    await client.close();
  }
}
optica().catch(console.dir);

