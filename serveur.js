const express = require('express');
const { Sequelize } = require('sequelize');
const swaggerUi = require('swagger-ui-express');
const cors = require ("cors");
const swaggerDocument = require('./swagger/swagger.json');
const app = express();
const port = 3000;
const version = "v1";
const router = require('./routes/routes');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite', 
    storage: './DB/database.sqlite',
    database: './DB/database.sqlite',
});

(async function dbconnect(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

const Musique = require("./models/music.js");

(async () => {
    try {
        // Synchronisez le modèle avec la base de données
        await Musique.sync({ force: true }); // Utilisez { force: true } pour supprimer et recréer la table à chaque fois
        console.log('All models were synchronized successfully.');

        // Ajoutez des données dans la base de données
        const playlist = [
            {
                "title": "KINGDOM HEARTS - Dearly Beloved - All Versions 2002-2017",
                "src": "upload/music/KINGDOM HEARTS - Dearly Beloved - All Versions 2002-2017.mp4",
                "image": "upload/Images/Kingdom_Hearts_Logo.png"
            },
            {
                "title": "Dont Think Twice",
                "src": "upload/music/Dont Think Twice.mp4",
                "image": "upload/Images/imagekh3.jpg"
            },
            {
                "title": "Sanctuary (Ending)",
                "src": "upload/music/Sanctuary (Ending).mp4",
                "image": "upload/Images/Sactuary.jpg"
            }
        ];

        for (const item of playlist) {
            try {
                await Musique.create(item);
                console.log(`Musique "${item.title}" ajoutée avec succès.`);
            } catch (error) {
                console.error(`Erreur lors de l'ajout de la musique "${item.title}" :`, error);
            }
        }
    } catch (error) {
        console.error('Erreur lors de la synchronisation des modèles avec la base de données :', error);
    }
})();

// Utilisation du middleware pour parser les requêtes JSON et les données encodées dans l'URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Utilisation du middleware cors

// Utilisation du routeur pour gérer les différentes routes de l'API
app.use(`/api/${version}/`, router);

// Utilisation de Swagger UI pour servir la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Démarrage du serveur sur le port spécifié
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
