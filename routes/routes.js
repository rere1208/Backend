const express = require('express');
const router = express.Router();
const controllerMusic = require('./../Controller/Music');
const multer = require('multer');
const path = require('path');

// Configuration de Multer pour stocker le fichier audio avec son nom d'origine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'audioFile') {
            cb(null, 'uploads/music');
        } else if (file.fieldname === 'imageFile') {
            cb(null, 'uploads/images');
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Utilisation de Multer avec la configuration définie
const upload = multer({ storage: storage });

// Utilise la configuration de Multer pour la route de création de musique
router.post('/musique', upload.fields([{ name: 'audioFile', minCount: 1 }, { name: 'imageFile', minCount: 1 }]), controllerMusic.create);

// Route pour obtenir toutes les musiques
router.get('/musique', controllerMusic.find);

// Route pour obtenir une musique par ID
router.get('/musique/:id', controllerMusic.findByID);

// Route pour obtenir une musique aléatoire
router.get('/musique/random', controllerMusic.getRandom);

// Route pour mettre à jour une musique par ID
router.put('/musique/:id', controllerMusic.updateByID);

// Route pour supprimer une musique par ID
router.delete('/musique/:id', controllerMusic.deleteByID);

// Servir les images statiques depuis le dossier uploads/images
router.use('/images', express.static(path.join(__dirname, '../uploads/images')));

// Servir les images statiques depuis le dossier uploads/images
router.use('/music', express.static(path.join(__dirname, '../uploads/music')));

module.exports = router;
