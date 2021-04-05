const express = require("express");
const petshop = require("./petshop");
const app = express();

app.use(express.json());

app.get("/pets/:nome", (req, res) => {
    const {nome} = req.params;
    
    return res.send(petshop.buscarPet(nome));
});

app.post("/adicionarpet", (req, res) => {
    const novoPet = req.body;

    petshop.adicionarPet(novoPet);

    return res.json(novoPet);
})

app.listen(3000);
