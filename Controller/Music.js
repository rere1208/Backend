const Musique = require('./../models/music'); // Importez votre modèle Musique

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
            const newMusic = await Musique.create(req.body);
            res.status(201).json({ message: "Musique ajoutée avec succès", data: newMusic });
        } catch (error) {
            console.error("Erreur lors de l'ajout de la musique :", error);
            res.status(500).json({ error: "Erreur lors de l'ajout de la musique" });
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
            await music.update(req.body); // Mettre à jour la musique avec les données envoyées dans la requête
            res.status(200).json({ message: "Musique mise à jour avec succès", updatedMusic: music });
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la musique par ID :", error);
            res.status(500).json({ error: "Erreur lors de la mise à jour de la musique par ID" });
        }
    },
};


module.exports = controllerMusic;
