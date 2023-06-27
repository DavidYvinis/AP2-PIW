const express = require('express');
const router = express.Router();
const alunoServiceMongo = require("../services/aluno.services.mongo");

router.get("/listar", alunoServiceMongo.list);
router.post("/inserir", alunoServiceMongo.register);
router.put("/update/:id", alunoServiceMongo.update);
router.delete("/delete/:id", alunoServiceMongo.delete);
router.get("/retrieve/:id", alunoServiceMongo.retrieve);

module.exports = router;