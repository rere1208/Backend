const Musique = require('./../models/music'); // Importe ton modèle de musique
const fs = require('fs'); // Importez le module fs
const path = require('path');
const multer = require('multer');

const controllerMusic = {
    find: async (req, res) => {
        try {
            const musics = await Musique.findAll();
            res.status(200).json({ musics });
        } catch (error) {
            console.error("Erreur lors de la recherche des musiques :", error);
            res.status(500).json({ error: "Erreur lors de la recherche des musiques" });
        }
    },

    create: async (req, res) => {
        try {
            // Vérifie si les fichiers audio et image ont été téléchargés
            if (!req.files || !req.files.audioFile || !req.files.imageFile) {
                return res.status(400).json({ error: "Veuillez télécharger à la fois le fichier audio et l'image" });
            }
    
            // Accède aux fichiers audio et image téléchargés
            const audioFiles = req.files.audioFile; // Tableau de fichiers audio
            const imageFiles = req.files.imageFile; // Tableau de fichiers image
    
            // Créer un tableau pour stocker les informations sur les nouvelles musiques ajoutées
            const newMusics = [];
    
            // Boucle sur les fichiers audio et image pour créer une musique pour chaque paire
            for (let i = 0; i < audioFiles.length; i++) {
                const audioFile = audioFiles[i];
                const imageFile = imageFiles[i];
    
                // Supprimer l'extension du titre de la musique
                const audioTitle = audioFile.originalname.replace(/\.[^/.]+$/, "");
    
                // Crée une nouvelle musique en utilisant le titre sans extension
                const newMusic = await Musique.create({
                    title: audioTitle, // Utilise le titre sans extension
                    src: audioFile.originalname, // Enregistre le nom du fichier audio avec l'extension
                    image: imageFile.originalname, // Enregistre le nom du fichier image avec l'extension
                    // Ajoute d'autres champs de ton formulaire si nécessaire
                });
    
                // Ajouter les informations de la nouvelle musique au tableau
                newMusics.push(newMusic);
    
                // Afficher les informations ajoutées à la base de données
                console.log("Nouvelle musique ajoutée :", newMusic);
            }
    
            res.status(201).json({ message: "Musiques ajoutées avec succès", musics: newMusics });
        } catch (error) {
            console.error("Erreur lors de l'ajout des musiques :", error);
            res.status(500).json({ error: "Erreur lors de l'ajout des musiques" });
        }
    },

    findByID: async (req, res) => {
        const id = req.params.id;
        try {
            const music = await Musique.findByPk(id);
            if (!music) {
                return res.status(404).json({ error: "Musique non trouvée" });
            }
            res.status(200).json({ music });
        } catch (error) {
            console.error("Erreur lors de la recherche de la musique par ID :", error);
            res.status(500).json({ error: "Erreur lors de la recherche de la musique par ID" });
        }
    },

    getRandom: async (req, res) => {
        try {
            const count = await Musique.count();
            const randomIndex = Math.floor(Math.random() * count);
            const randomMusic = await Musique.findOne({ offset: randomIndex });
            res.status(200).json({ randomMusic });
        } catch (error) {
            console.error("Erreur lors de la recherche d'une musique aléatoire :", error);
            res.status(500).json({ error: "Erreur lors de la recherche d'une musique aléatoire" });
        }
    },

    deleteByID: async (req, res) => {
        const id = req.params.id;
        try {
            const music = await Musique.findByPk(id);
            if (!music) {
                return res.status(404).json({ error: "Musique non trouvée" });
            }
    
            // Récupérez les chemins des fichiers audio et d'image associés à la musique
            const audioFile = path.join(__dirname, '../uploads/music', music.src);
            const imageFile = path.join(__dirname, '../uploads/images', music.image);
    
            // Supprimez les fichiers audio et d'image du système de fichiers
            fs.unlinkSync(audioFile);
            fs.unlinkSync(imageFile);
    
            // Supprimez la musique de la base de données
            await music.destroy();
    
            res.status(200).json({ message: "Musique supprimée avec succès" });
        } catch (error) {
            console.error("Erreur lors de la suppression de la musique par ID :", error);
            res.status(500).json({ error: "Erreur lors de la suppression de la musique par ID" });
        }
    },
    
    updateByID: async (req, res) => {
        const id = req.params.id;
        try {
            const music = await Musique.findByPk(id);
            if (!music) {
                return res.status(404).json({ error: "Musique non trouvée" });
            }
            
            // Mettre à jour seulement les champs requis
            await music.update({
                title: req.body.title, // Mettez à jour le titre s'il est fourni dans la requête
                // Ajoutez d'autres champs à mettre à jour si nécessaire
            });
    
            res.status(200).json({ message: "Musique mise à jour avec succès", updatedMusic: music });
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la musique par ID :", error);
            res.status(500).json({ error: "Erreur lors de la mise à jour de la musique par ID" });
        }
    },
    
};

module.exports = controllerMusic;
