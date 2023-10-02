const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function spotify() {
  try {
    await client.connect();
    console.log("Conexión establecida correctamente");

    const database = client.db("spotify");

    // ------------------------------ Usuaris ---------------------------//
    console.log(">>>>>>>>>>Usuaris<<<<<<<<<<<");
    await database.createCollection('usuaris', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['email', 'password', 'tipus', 'usuari'],
            properties: {
              tipus: {
                enum: ['free', 'premium']
              },
              email: {
                bsonType: 'string'
              },
              password: {
                bsonType: 'string'
              },
              usuari: {
                bsonType: "string"
              },
              data_naixement: {
                bsonType: "date"
              },
              sexe: {
                bsonType: "string"
              },
              pais: {
                bsonType: "string"
              },
              codi_postal: {
                bsonType: "string"
              },
              suscripcio: {
                bsonType: "objectId"
              },
              artistes_seguits: {
                bsonType: 'array'
              },
              albums_preferits: {
                bsonType: 'array'
              },
              cancons_preferides: {
                bsonType: 'array'
              }
            }
          }
        }
      });

      // ------------------------------ Subscripcions ---------------------------//
      console.log(">>>>>>>>>>Subscripcions<<<<<<<<<<<");

      await database.createCollection('subscripcions', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['data_inici', 'data_renovacio', 'pagament'],
            properties: {
              pagament: {
                bsonType: "objectId"
              },
              data_inici: {
                bsonType: "date"
              },
              data_renovacio: {
                bsonType: "date"
              }
            }
          }
        }
      });

      // ------------------------------ Targetes de Crèdit ---------------------------//
      console.log(">>>>>>>>>>Targetes de Crèdit<<<<<<<<<<<");

      await database.createCollection('targetesDeCredit', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['numero', 'caducitat', 'codi_seguretat'],
            properties: {
              numero: {
                bsonType: "string"
              },
              caducitat: {
                bsonType: 'object',
                properties: {
                  mes:{
                    bsonType: "string"
                  },
                  any: {
                    bsonType: "string"
                  },
                },
              },
              codi_seguretat:{
                bsonType: "string"
              }
            }
          }
        }
      });

      // ------------------------------ Paypal ---------------------------//
      console.log(">>>>>>>>>>Paypal<<<<<<<<<<<");

      await database.createCollection('Paypal', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['usuari'],
            properties: {
              usuari: {
                bsonType: "string"
              }
            }
          }
        }
      });

      // ------------------------------ Pagaments ---------------------------//
      console.log(">>>>>>>>>>Pagaments<<<<<<<<<<<");

      await database.createCollection('pagaments', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['num_ordre', 'data', 'total'],
            properties: {
              num_ordre: {
                bsonType: 'int'
              },
              data: {
                bsonType: 'date'
              },
              total: {
                bsonType: 'double'
              },
              metode: {
                bsonType: 'objectId'
              }
            }
          }
        }
      });

      // ------------------------------ Playlists ---------------------------//
      console.log(">>>>>>>>>>Playlists<<<<<<<<<<<");

      await database.createCollection('playlists', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['titol', 'numero_cancons', 'data_creacio'],
            properties: {
              titol: {
                bsonType: 'string'
              },
              numero_cancons: {
                bsonType: 'int'
              },
              data_creacio: {
                bsonType: 'date'
              },
              eliminada: {
                bsonType: 'bool'
              },
              data_eliminada: {
                bsonType: 'date'
              },
              propietari: {
                bsonType: 'objectId'
              },
              compartit_amb: {
                bsonType: 'array'
              },
              llista_cancons: {
                bsonType: 'array',
                items: {
                  bsonType: 'object',
                  properties: {
                    canco: {
                      bsonType: 'objectId'
                    },
                    usuari: {
                      bsonType: 'objectId'
                    },
                    data: {
                      bsonType: 'date'
                    }
                  }
                }
              }
            }
          }
        }
      });

      // ------------------------------ Cançons ---------------------------//
      console.log(">>>>>>>>>>Cançons<<<<<<<<<<<");

      await database.createCollection('cancons', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['titol', 'durada', 'reproduccions', 'album'],
            properties: {
              titol: {
                bsonType: 'string'
              },
              durada: {
                bsonType: 'int'
              },
              reproduccions: {
                bsonType: 'int'
              },
              album: {
                bsonType: 'objectId'
              }
            }
          }
        }
      });

      // ------------------------------ Albums ---------------------------//
      console.log(">>>>>>>>>>Albums<<<<<<<<<<<");

      await database.createCollection('albums', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['titol', 'any_publicacio', 'artista'],
            properties: {
              titol: {
                bsonType: 'string'
              },
              any_publicacio: {
                bsonType: 'date'
              },
              imatge_portada: {
                bsonType: 'binData'
              },
              artista: {
                bsonType: 'objectId'
              }
            }
          }
        }
      });

      // ------------------------------ Artista ---------------------------//
      console.log(">>>>>>>>>>Artista<<<<<<<<<<<");

      await database.createCollection('artistes', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['nom'],
            properties: {
              nom: {
                bsonType: 'string'
              },
              imatge: {
                bsonType: 'binData'
              },
              artistes_relacionats: {
                bsonType: 'array'
              }
            }
          }
        }
      });

      const usuaris = database.collection("usuaris");
      const subscripcions = database.collection("subscripcions");
      const targetesDeCredit = database.collection("targetesDeCredit");
      const paypal = database.collection("paypal");
      const pagaments = database.collection("pagaments");
      const playlists = database.collection("playlists");
      const cancons = database.collection("cancons");
      const albums = database.collection("albums");
      const artistes = database.collection("artistes");
      
      // ------------------------------ Inserció de dades ---------------------------//
      // ------------------------------ Paypal ---------------------------//
      console.log(">>>>>>>>>>Paypal<<<<<<<<<<<");

      const paypal1 = {
        usuari: 'usuari1'
      };

      const paypal2 = {
        usuari: 'usuari2'
      };

      const paypalResult = await paypal.insertMany([paypal1, paypal2]);
      let paypalIds = paypalResult.insertedIds;
      console.log(`${paypalResult.insertedCount} documents s'han insertat.`);

      for (let id of Object.values(paypalIds)) {
        console.log(`S'ha insertat un document amb id: ${id}`);
      }

      // ------------------------------ Targeta ---------------------------//
      console.log(">>>>>>>>>>Targeta<<<<<<<<<<<");
      const targeta = 
      {
        numero: '1234 5678 9012 3456',
        caducitat: {
          mes: '12',
          any: '25',
        },
        codi_seguretat: '123',
      };
      
      const targetaResult = await targetesDeCredit.insertOne(targeta);
      let targetaId = targetaResult.insertedId;
      console.log(`1 document s'ha insertat.`);
      console.log(`S'ha insertat un document amb id: ${targetaId}`);


      // ------------------------------ Pagaments ---------------------------//
      console.log(">>>>>>>>>>Pagaments<<<<<<<<<<<");

      const pagament1 = {
        num_ordre: 1001,
        data: new Date('2023-01-15'),
        total: 25.99,
        metode: paypalIds[0],
      };

      const pagament2 = {
        num_ordre: 1002,
        data: new Date('2023-02-20'),
        total: 15.50,
        metode: targetaId,
      };

      const pagament3 = {
        num_ordre: 1003,
        data: new Date('2023-03-10'),
        total: 50.75,
        metode: paypalIds[1],
      };

      const pagamentsResult = await pagaments.insertMany([pagament1, pagament2, pagament3]);
      let pagamentsIds = pagamentsResult.insertedIds;
      console.log(`${pagamentsResult.insertedCount} documents s'han insertat.`);

      for (let id of Object.values(pagamentsIds)) {
          console.log(`S'ha insertat un document amb id: ${id}`);
      }

      // ------------------------------ Subscripcions ---------------------------//
      console.log(">>>>>>>>>>Subscripcions<<<<<<<<<<<");
      
      const subscripcio1 = {
        pagament: pagamentsIds[0],
        data_inici: new Date('2023-01-01'),
        data_renovacio: new Date('2023-02-01'),
      };

      const subscripcio2 = {
        pagament: pagamentsIds[1],
        data_inici: new Date('2023-03-15'),
        data_renovacio: new Date('2023-04-15'),
      };

      const subscripcio3 = {
        pagament: pagamentsIds[2],
        data_inici: new Date('2023-05-10'),
        data_renovacio: new Date('2023-06-10'),
      };

      const subscripcionsResult = await subscripcions.insertMany([subscripcio1, subscripcio2, subscripcio3]);
      let subscripcionsIds = subscripcionsResult.insertedIds;
      console.log(`${subscripcionsResult.insertedCount} documents s'han insertat.`);

      for (let id of Object.values(subscripcionsIds)) {
          console.log(`S'ha insertat un document amb id: ${id}`);
      }

      // ------------------------------ Artistes ---------------------------//
      console.log(">>>>>>>>>>Artistes<<<<<<<<<<<");

      const artista1 = {
        nom: 'Artist 1',
      };

      const artista2 = {
        nom: 'Artist 2',
      };

      const artistesResult = await artistes.insertMany([artista1, artista2]);
      let artistesIds = artistesResult.insertedIds;
      console.log(`${artistesResult.insertedCount} documents s'han insertat.`);

      for (let id of Object.values(artistesIds)) {
          console.log(`S'ha insertat un document amb id: ${id}`);
      }

      await artistes.updateOne(
        { _id: artista2._id},
        { $set: { artistes_relacionats: [artistesIds[0]]} }
      );

      // ------------------------------ Albums ---------------------------//
      console.log(">>>>>>>>>>Albums<<<<<<<<<<<");

      const album1 = {
        titol: 'Album 1',
        any_publicacio: new Date('2023-01-10'),
        artista: artistesIds[0],
      };

      const album2 = {
        titol: 'Album 2',
        any_publicacio: new Date('2023-02-15'),
        artista: artistesIds[1],
      };

      const albumsResult = await albums.insertMany([album1, album2]);
      let albumsIds = albumsResult.insertedIds;
      console.log(`${albumsResult.insertedCount} documents s'han insertat.`);

      for (let id of Object.values(albumsIds)) {
          console.log(`S'ha insertat un document amb id: ${id}`);
      }

      // ------------------------------ Cançons ----------------------------//
      console.log(">>>>>>>>>>Cançons<<<<<<<<<<<");

      const canco1 = {
        titol: 'Song 1',
        durada: 240, 
        reproduccions: 1000,
        album: albumsIds[0],
      };

      const canco2 = {
        titol: 'Song 2',
        durada: 180, 
        reproduccions: 800,
        album: albumsIds[1],
      };

      const canco3 = {
        titol: 'Song 3',
        durada: 300, 
        reproduccions: 1200,
        album: albumsIds[0],
      };

      const canco4 = {
        titol: 'Song 4',
        durada: 210, 
        reproduccions: 600,
        album: albumsIds[1],
      };
      
      const canco5 = {
        titol: 'Song 5',
        durada: 270, 
        reproduccions: 1500,
        album: albumsIds[0],
      };

      const canconsResult = await cancons.insertMany([canco1, canco2, canco3, canco4, canco5]);
      let canconsIds = canconsResult.insertedIds;
      console.log(`${canconsResult.insertedCount} documents s'han insertat.`);

      for (let id of Object.values(canconsIds)) {
          console.log(`S'ha insertat un document amb id: ${id}`);
      }

      // ------------------------------ Usuaris ---------------------------//
      console.log(">>>>>>>>>>Usuaris<<<<<<<<<<<");

      const usuari1 = {
      email: 'alice.jones@example.com',
      password: 'securepass',
      tipus: 'premium',
      usuari: 'alicejones',
      data_naixement: new Date('1988-10-10'),
      sexe: 'female',
      pais: 'United Kingdom',
      codi_postal: 'SW1A 1AA',
      suscripcio: subscripcionsIds[0],
      artistes_seguits: [artistesIds[0]],
      albums_preferits: [albumsIds[0]],
      cancons_preferides: [canconsIds[0], canconsIds[3], canconsIds[4]],
      };

      const usuari2 = {
        email: 'mark.wilson@example.com',
        password: 'pass1234',
        tipus: 'free',
        usuari: 'markwilson',
        data_naixement: new Date('1995-03-25'),
        sexe: 'male',
        pais: 'Australia',
        codi_postal: '2000',
        artistes_seguits: [artistesIds[1]],
        albums_preferits: [albumsIds[1]],
        cancons_preferides: [canconsIds[1], canconsIds[3]],
      };

      const usuari3 = {
        email: 'lisa.davis@example.com',
        password: 'passwordabc',
        tipus: 'premium',
        usuari: 'lisadavis',
        data_naixement: new Date('1980-07-15'),
        sexe: 'female',
        pais: 'Canada',
        codi_postal: 'M5H 2N2',
        suscripcio: subscripcionsIds[1],
        albums_preferits: [albumsIds[0], albumsIds[1]],
        cancons_preferides: [canconsIds[0], canconsIds[1], canconsIds[3], canconsIds[4]],
      };

      const usuari4 = {
        email: 'michael.brown@example.com',
        password: '12345pass',
        tipus: 'free',
        usuari: 'michaelbrown',
        data_naixement: new Date('1992-02-05'),
        sexe: 'male',
        pais: 'United States',
        codi_postal: '10001',
        artistes_seguits: [artistesIds[0]],
        albums_preferits: [albumsIds[1]],
        cancons_preferides: [canconsIds[1], canconsIds[4]],
      };

      const usuari5 = {
        email: 'sarah.miller@example.com',
        password: 'securepass123',
        tipus: 'premium',
        usuari: 'sarahmiller',
        data_naixement: new Date('1987-12-03'),
        sexe: 'female',
        pais: 'United Kingdom',
        codi_postal: 'SW1A 2AA',
        suscripcio: subscripcionsIds[2],
        albums_preferits: [albumsIds[0]],
        cancons_preferides: [canconsIds[0]],
      };

      const usuarisResult = await usuaris.insertMany([usuari1, usuari2,  usuari3, usuari4, usuari5]);
      let usuarisIds = usuarisResult.insertedIds;
      console.log(`${usuarisResult.insertedCount} documents s'han insertat.`);

      for (let id of Object.values(usuarisIds)) {
          console.log(`S'ha insertat un document amb id: ${id}`);
      }

      // ------------------------------ Playlists ---------------------------//
      console.log(">>>>>>>>>>Playlists<<<<<<<<<<<");

      const playlist1 = {
        titol: 'Relaxing Playlist',
        numero_cancons: 8,
        data_creacio: new Date('2023-02-20'),
        eliminada: false,
        propietari: usuarisIds[0],
        compartit_amb: [usuarisIds[4]],
        llista_cancons: [
          {
            canco: canconsIds[0],
            usuari: usuarisIds[4],
            data: new Date('2023-02-21'),
          },
          {
            canco: canconsIds[3],
            usuari: usuarisIds[0],
            data: new Date('2023-02-22'),
          },
        ],
      }

      const playlist2 = {
        titol: 'Chill Vibes',
        numero_cancons: 12,
        data_creacio: new Date('2023-04-05'),
        eliminada: false,
        propietari: usuarisIds[1],
        compartit_amb: [usuarisIds[0], usuarisIds[2], usuarisIds[3]],
        llista_cancons: [
          {
            canco: canconsIds[3],
            usuari: usuarisIds[2],
            data: new Date('2023-04-06'),
          },
          {
            canco: canconsIds[1],
            usuari: usuarisIds[3],
            data: new Date('2023-04-07'),
          },
        ],
      }

      const playlist3 = {
        titol: 'My Favorite Songs',
        numero_cancons: 10,
        data_creacio: new Date('2023-01-15'),
        eliminada: false,
        propietari: usuarisIds[2],
        compartit_amb: [usuarisIds[0], usuarisIds[1]],
        llista_cancons: [
          {
            canco: canconsIds[0],
            usuari: usuarisIds[1],
            data: new Date('2023-01-16'),
          },
          {
            canco: canconsIds[0],
            usuari: usuarisIds[2],
            data: new Date('2023-01-17'),
          },
        ],
      };

      const playlistsResult = await playlists.insertMany([playlist1, playlist2, playlist3]);
      let playlistsIds = playlistsResult.insertedIds;
      console.log(`${playlistsResult.insertedCount} documents s'han insertat.`);

      for (let id of Object.values(playlistsIds)) {
          console.log(`S'ha insertat un document amb id: ${id}`);
      }

    } finally {
        // Ensures that the client will close when you finish/error
        console.log("Tancant connexió a la base de dades");
        await client.close();
    }
}

spotify().catch(console.dir);