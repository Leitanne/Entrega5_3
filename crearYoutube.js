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
        const suscripcions = database.collection("suscripcions");

        //los likes y dislikes guardarlos en el mismo documento, no hace falta hacer una coleccion

        // ------------------------------ Canal ---------------------------//
        console.log(">>>>>>>>>>Canal<<<<<<<<<<<");

        const canal1 = {
            nom: "Canal de usuari1",
            descripcio: "Canal de cuina",
            data_creacio: new Date("2023-03-13"),
        }

        const canal2 = {
            nom: "Canal de usuari2",
            descripcio: "Canal de cuina",
            data_creacio: new Date("2023-06-25"),
        }

        const canal3 = {
            nom: "Canal de usuari3",
            descripcio: "Canal de fitness",
            data_creacio: new Date("2022-05-21"),
        }

        const canal4 = {
            nom: "Canal de usuari4",
            descripcio: "Canal de videojocs",
            data_creacio: new Date("2022-10-12"),
        }

        const canalResult = await canals.insertMany([canal1, canal2, canal3, canal4]);
        let canalsIds = canalResult.insertedIds;
        console.log(`${canalResult.insertedCount} documents s'han insertat.`);

        for (let id of Object.values(canalsIds)) {
            console.log(`S'ha insertat un document amb id: ${id}`);
        }

        // ------------------------------ Usuaris ---------------------------//
        console.log(">>>>>>>>>>Usuaris<<<<<<<<<<<");

        const usuari1 = {
            email: "usuari1@correu.com",
            password: "contrasenya",
            nomUsuari: "pseudonim1",
            data_naixement: new Date("1993-01-27"),
            sexe: "dona",
            pais: "Espanya",
            codi_postal: "08001",
            canal: canalsIds[0],
            subscripcions: [canalsIds[3]],
        };

        const usuari2 = {
            email: "usuari2@correu.com",
            password: "contrasenya",
            nomUsuari: "pseudonim2",
            data_naixement: new Date("1991-11-13"),
            sexe: "home",
            pais: "Espanya",
            codi_postal: "08002",
            canal: canalsIds[1],
            subscripcions: [canalsIds[0]],
        };

        const usuari3 = {
            email: "usuari3@correu.com",
            password: "contrasenya",
            nomUsuari: "pseudonim3",
            data_naixement: new Date("1986-10-11"),
            sexe: "dona",
            pais: "Espanya",
            codi_postal: "08003",
            canal: canalsIds[2],
            subscripcions: [canalsIds[1], canalsIds[0]],
        };

        const usuari4 = {
            email: "usuari4@correu.com",
            password: "contrasenya",
            nomUsuari: "pseudonim4",
            data_naixement: new Date("1997-12-01"),
            sexe: "home",
            pais: "Espanya",
            codi_postal: "08004",
            canal: canalsIds[3],
            subscripcions: [canalsIds[2], canalsIds[1], canalsIds[0]],
        };

        const usuarisResult = await usuaris.insertMany([usuari1, usuari2, usuari3, usuari4]);
        let usuarisIds = usuarisResult.insertedIds;
        console.log(`${usuarisResult.insertedCount} documents s'han insertat.`);

        for (let id of Object.values(usuarisIds)) {
            console.log(`S'ha insertat un document amb id: ${id}`);
        };

        // ------------------------------ Etiquetes ---------------------------//
        console.log(">>>>>>>>>>Etiquetes<<<<<<<<<<<");
        const etiqueta1 = {
            nom: "POV"
        };

        const etiqueta2 = {
            nom: "cuina"
        };

        const etiqueta3 = {
            nom: "mediterrania",
        };

        const etiqueta4 = {
            nom: "mountain bike",
        };

        const etiquetesResult = await etiquetes.insertMany([etiqueta1, etiqueta2, etiqueta3, etiqueta4]);
        let etiquetesIds = etiquetesResult.insertedIds;
        console.log(`${etiquetesResult.insertedCount} documents s'han insertat.`);

        for (let id of Object.values(etiquetesIds)) {
            console.log(`S'ha insertat un document amb id: ${id}`);
        }

        // ------------------------------ Videos ---------------------------//
        console.log(">>>>>>>>>>Videos<<<<<<<<<<<");

        const video1 = {
            propietari: usuarisIds[1],
            data_publicacio: new Date("2023-07-15"),
            titol: "Com fer un arros amb verdures",
            descripció: "En aquest video elaborem un arròs amb verdures de l'hort",
            grandaria: 200,
            arxiu: "recepta_video.mp4",
            durada: new Date("00:10:00"),
            estat: "public",
            reproduccions: 3000,
            likes: 102,
            dislikes: 10,
            etiquetes: [etiquetesIds[1], etiquetesIds[2]],
            likes : 
                [
                    {
                        usuari: usuarisIds[0],
                        data: new Date("2023-09-25"),
                    },
                    {
                        usuari: usuarisIds[2],
                        data: new Date("2023-09-26")
                    }
                ]
        };

        const video2 = {
            propietari: usuarisIds[0],
            data_publicacio: new Date("2023-06-16"),
            titol: "La meva ruta en bici",
            descripció: "POV de la ruta en bici feta el 13 de juny de 2023",
            grandaria: 1550,
            arxiu: "13_06_2023_bici.mp4",
            durada: new Date("01:10:00"),
            estat: "privat",
            reproduccions: 35,
            likes: 3,
            dislikes: 0,
            etiquetes: [etiquetesIds[0], etiquetesIds[3]],
            likes: 
                [
                    {
                        usuari: usuarisIds[2],
                        data: new Date("2023-09-24"),
                    },
                    {
                        usuari: usuarisIds[1],
                        data: new Date("2023-09-24")
                    }
                ],
            dislikes :
                [
                    {
                        usuari: usuarisIds[3],
                        data: new Date("2023-09-25"),
                    }
                ]
        };

        const videosResult = await videos.insertMany([video1, video2]);
        let videosIds = videosResult.insertedIds;
        console.log(`${videosResult.insertedCount} documents s'han insertat.`);

        for (let id of Object.values(videosIds)) {
            console.log(`S'ha insertat un document amb id: ${id}`);
        }

        // ------------------------------ Playlists ---------------------------//
        console.log(">>>>>>>>>>Playlists<<<<<<<<<<<");

        const playlist1 = {
            nom: "playlist1",
            data_creacio: "28-09-2023",
            visibilitat: "publica",
            propietari: usuarisIds[1]
        };

        const playlist2 = {
            nom: "playlist2",
            data_creacio: "20-09-2022",
            visibilitat: "privada",
            propietari: usuarisIds[2]
        };

        const playlist3 = {
            nom: "playlist3",
            data_creacio: "11-08-2023",
            visibilitat: "privada",
            propietari: usuarisIds[0]
        };

        const playlistsResult = await playlists.insertMany([playlist1, playlist2, playlist3]);
        let playlistsIds = playlistsResult.insertedIds;
        console.log(`${playlistsResult.insertedCount} documents s'han insertat.`);

        for (let id of Object.values(playlistsIds)) {
            console.log(`S'ha insertat un document amb id: ${id}`);
        }

        // ------------------------------ Comentaris ---------------------------//
        console.log(">>>>>>>>>>Comentaris<<<<<<<<<<<");

        const comentari1 = {
            text: "Aquest video m'ha agradat molt",
            dataHora: new Date("2023-09-27T12:38"),
            usuari: usuarisIds[2],
            video: videosIds[0],
            likes: [
                {
                    usuari: usuarisIds[3],
                    datahora: new Date("2023-09-27T16:03"),
                }

            ]
        }

        const comentari2 = {
            text: "La recepta sembla fàcil de fer",
            dataHora: new Date("2023-09-27T17:56"),
            usuari: usuarisIds[3],
            video: videosIds[0],
            dislikes: [
                {
                    usuari: usuarisIds[2],
                    datahora: new Date("2023-09-27T15:03"),
                }
            ]
        }

        const comentari3 = {
            text: "Quina ruta més interessant",
            dataHora: new Date("2023-09-24T07:43"),
            usuari: usuarisIds[0],
            video: videosIds[1],
            likes: [
                {
                    usuari: usuarisIds[0],
                    datahora: new Date("2023-09-27T12:12"),
                },
                {
                    usuari: usuarisIds[3],
                    datahora: new Date("2023-09-20T14:32"),
                }
            ]

        }

        const comentarisResult = await comentaris.insertMany([comentari1, comentari2, comentari3]);
        let comentarisIds = comentarisResult.insertedIds;
        console.log(`${comentarisResult.insertedCount} documents s'han insertat.`);

        for (let id of Object.values(comentarisIds)) {
            console.log(`S'ha insertat un document amb id: ${id}`);
        }

    }finally{
        console.log("Tancant connexió a la base de dades");
        await client.close(); 
    }
}

youtube().catch(console.dir);