const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function pizzeria() {
  try {
    await client.connect();
    console.log("Conexión establecida correctamente");

    const database = client.db("pizzeria");
    const clients = database.collection("clients");
    const comandes = database.collection("comandes");
    const productes = database.collection("productes");
    const categoriaPizza = database.collection("categoriaPizza");
    const botigues = database.collection("botigues");
    const empleats = database.collection("empleats");
    
    // ------------------------------ Clients ---------------------------//
    console.log(">>>>>>>>>>Clients<<<<<<<<<<<");

    const client1 = {
      nom: "client1",
      cognoms: "cognomClient1 cognom2Client1",
      adreca: {
        carrer: "carrer de mentida, 1",
        codi_postal: "08001",
        localitat: "Barcelona",
        provincia: "Barcelona"
      },
      telefon: "677663772",
    };

    const client2 = {
      nom: "client2",
      cognoms: "cognomClient2 cognom2Client2",
      adreca: {
        carrer: "carrer de mentida, 2",
        codi_postal: "08002",
        localitat: "Barcelona",
        provincia: "Barcelona"
      },
      telefon: "633781762",
    };

    const clientsResult = await clients.insertMany([client1, client2]);
    let clientsIds = clientsResult.insertedIds;
    console.log(`${clientsResult.insertedCount} documents s'han insertat.`);

    for (let id of Object.values(clientsIds)) {
      console.log(`S'ha insertat un document amb id: ${id}`);
    }

    // ------------------------------ Categories de pizzes ---------------------------//
    console.log(">>>>>>>>>>Categories de pizzes<<<<<<<<<<<");

    const categoria1 = {
      nom: "Calzone",
    };

    const categoria2 = {
      nom: "Amb 2 ingredients",
    };

    const categoria3 = {
      nom: "Amb 3 ingredients o més",
    };

    const categoriaPizzaResult = await categoriaPizza.insertMany([categoria1, categoria2, categoria3]);
    let categoriesIds = categoriaPizzaResult.insertedIds;
    console.log(`${categoriaPizzaResult.insertedCount} documents s'han insertat.`);

    for (let id of Object.values(categoriesIds)) {
      console.log(`S'ha insertat un document amb id: $  1{id}`);
    }

    // ------------------------------ Productes ---------------------------//
    console.log(">>>>>>>>>>Productes<<<<<<<<<<<");

    const hamburguesa1 = {
      nom: "Hamburguesa amb formatge",
      descripcio: "Una hamburguesa de carn de boví amb una rodanxa de formatge emmental",
      preu: 10.50,
    }

    const hamburguesa2 = {
      nom: "Hamburguesa amb formatge, cogombre i tomaquet",
      descripcio: "Una hamburguesa de carn de boví amb rodanxes de cogombre, formatge emmental i tomaquet",
      preu: 12.00,
    }

    const beguda1 = {
      nom: "Coca-cola",
      descripcio: "Beguda de la marca Coca-cola",
      preu: 2.00,
    }

    const beguda2 = {
      nom: "Fanta de llimona",
      descripcio: "Beguda amb gust de llimona la marca Fanta. Amb gas",
      preu: 2.00,
    }

    const pizza1 = {
      nom: "Calzone de pernil dolç",
      descripcio: "Pizza de tipus calzone farcida amb pernil dolç",
      preu: 12.00,
      categoria: categoriesIds[0],
    }

    const pizza2 = {
      nom: "Pizza 4 formatges",
      descripcio: "Pizza amb base de tomaquet i amb 4 formatges: mozzarela, gorgonzola, fontina i parmesà",
      preu: 12.00,
      categoria: categoriesIds[2],
    }

    const pizza3 = {
      nom: "Pizza margarita",
      descripcio: "Pizza amb base de tomaquet, formatge mozzarela i alfàbrega",
      preu: 10.00,
      categoria: categoriesIds[1],
    }

    const productesResult = await productes.insertMany([hamburguesa1, hamburguesa2, beguda1, beguda2, pizza1, pizza2, pizza3]);
    let productesIds = productesResult.insertedIds;
    console.log(`${productesResult.insertedCount} documents s'han insertat.`);

    for (let id of Object.values(productesIds)) {
      console.log(`S'ha insertat un document amb id: ${id}`);
    }

    // ------------------------------ Botigues ---------------------------//
    console.log(">>>>>>>>>>Botigues<<<<<<<<<<<");

    const botiga1 = {
      carrer: "carrer de mentida, 3",
      codi_postal: "08003",
      localitat: "Barcelona",
      provincia: "Barcelona",
    }

    const botiga2 = {
      carrer: "carrer de mentida, 4",
      codi_postal: "08004",
      localitat: "Barcelona",
      provincia: "Barcelona",
    }

    const botiguesResult = await botigues.insertMany([botiga1, botiga2]);
    let botiguesIds = botiguesResult.insertedIds;
    console.log(`${botiguesResult.insertedCount} documents s'han insertat.`);

    for (let id of Object.values(botiguesIds)) {
      console.log(`S'ha insertat un document amb id: ${id}`);
    }

    // ------------------------------ Empleats ---------------------------//
    console.log(">>>>>>>>>>Empleats<<<<<<<<<<<");

    const empleat1 = {
      nom: "empleat1",
      cognom: "cognomEmpleat1 cognom2Empleat1",
      categoria: "cuiner",
      nif: "67829234R",
      telefon: "677377232",
      botiga: botiguesIds[1],
    }

    const empleat2 = {
      nom: "empleat2",
      cognom: "cognomEmpleat2 cognom2Empleat2",
      categoria: "repartidor",
      nif: "32782197T",
      telefon: "632123543",
      botiga: botiguesIds[0],
    }

    const empleatsResult = await empleats.insertMany([empleat1, empleat2]);
    let empleatsIds = empleatsResult.insertedIds;
    console.log(`${empleatsResult.insertedCount} documents s'han insertat.`);

    for (let id of Object.values(empleatsIds)) {
      console.log(`S'ha insertat un document amb id: ${id}`);
    }

    // ------------------------------ Comandes ---------------------------//
    console.log(">>>>>>>>>>Comandes<<<<<<<<<<<");

    const comanda1 = {
      datahora: new Date("2023-05-20T22:00"),
      domicili: false,
      productes: [productesIds[2], productesIds[5]],
      preuTotal: 14.00,
      client: clientsIds[1],
    };

    const comanda2 = {
      datahora: new Date("2023-06-23T14:00"),
      domicili: true,
      productes: [productesIds[2], productesIds[3], productesIds[1], productesIds[6]],
      preuTotal: 26.00,
      client: clientsIds[1],
      lliuratPer: empleatsIds[1],
      datahoraLliurament: new Date("2023-06-23T15:30"),
    };

    const comandesResult = await comandes.insertMany([comanda1, comanda2]);
    let comandesIds = comandesResult.insertedIds;
    console.log(`${comandesResult.insertedCount} documents s'han insertat.`);

    for (let id of Object.values(comandesIds)) {
      console.log(`S'ha insertat un document amb id: ${id}`);
    }
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("Tancant connexió a la base de dades");
    await client.close();
  }
}

pizzeria().catch(console.dir);