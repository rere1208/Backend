const express = require ('express');
const router = express.Router();
const controllerMusic = require('./../Controller/Music');

router.get("/", (req, res) => {
    res.status(200).json({ success: "racine api" });
});

router.post('/', (req, res) => {
    res.status(200).json({ success: 'bravo' });
});

router.get('/musique', controllerMusic.find);

router.post('/musique', controllerMusic.create);

router.get('/musique/random', controllerMusic.getRandom);

router.get('/musique/:id', controllerMusic.findByID);



module.exports = router;