const express = require('express');
const router = express.Router();
const controllerMusic = require('./../Controller/Music');

router.get("/", (req, res) => {
    res.status(200).json({ success: "racine api" });
});

router.get('/musique', controllerMusic.find);
router.post('/musique', controllerMusic.create);
router.get('/musique/random', controllerMusic.getRandom);
router.get('/musique/:id', controllerMusic.findByID);
router.put('/musique/:id', controllerMusic.updateByID); // Ajout de la route pour l'update
router.delete('/musique/:id', controllerMusic.deleteByID);

module.exports = router;
