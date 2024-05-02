const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json'); // Assure-toi que le chemin est correct
const app = express();
const port = 3000;
const version = "v1";
const router = require('./routes/routes');

// Utilisation du middleware pour parser les requêtes JSON et les données encodées dans l'URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utilisation du routeur pour gérer les différentes routes de l'API
app.use(`/api/${version}/`, router);

// Utilisation de Swagger UI pour servir la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Démarrage du serveur sur le port spécifié
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
