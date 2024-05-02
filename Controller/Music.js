const data = require("./../models/data.json");

const controllerMusic = {
    find: (req,res) => {
        if(req.query.search){
            const query = req.query.search;
            const result = data.filter(song => song.title.toLowerCase().includes(query.toLowerCase()));
            if(result.length === 0) {
                return res.status(404).json({error: "Not found"});
            } else {
                return res.status(200).json({result})
            }
        } else {
            res.status(200).json({result: data});
        }
    },


    create : (req,res) =>{
        console.log(req.body)
        res.status(201).json({message : "votre musique a etait ajouté",data : req.body})
    },

    findByID: (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        if (id < 1 || id > data.length) {
            return res.status(404).json({ error: "Music not found" });
        }
        return res.status(200).json({ result: data[id - 1] });
    },

    getRandom: (req, res) => {
        const randomIndex = Math.floor(Math.random() * data.playlist.length);
        const randomMusic = data.playlist[randomIndex];
        res.status(200).json({ result: randomMusic });
    },
};

module.exports = controllerMusic;
