const express = require('express');
const router = express.Router();
const db = require('../database');

// GET - Listar todos os funcionários
router.get('/', (req, res) => {
  db.all('SELECT * FROM funcionarios', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST - Cadastrar funcionário
router.post('/', (req, res) => {
  const { nome, cpf, telefone, funcao, periodo, canteiro_id, alojamento_id } = req.body;

  if (!nome || !cpf || !funcao || !periodo || !canteiro_id || !alojamento_id) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
  }

  const query = `
    INSERT INTO funcionarios (nome, cpf, telefone, funcao, periodo, canteiro_id, alojamento_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [nome, cpf, telefone, funcao, periodo, canteiro_id, alojamento_id];

  db.run(query, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

module.exports = router;
