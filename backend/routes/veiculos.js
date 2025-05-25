const express = require('express');
const router = express.Router();
const db = require('../database');

// GET - Listar todos os veículos
router.get('/', (req, res) => {
  db.all('SELECT * FROM veiculos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST - Cadastrar veículo
router.post('/', (req, res) => {
  const { tipo, placa, capacidade, canteiro_id } = req.body;

  if (!tipo || !placa || !capacidade) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
  }

  const query = `
    INSERT INTO veiculos (tipo, placa, capacidade, canteiro_id)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [tipo, placa, capacidade, canteiro_id || null], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

module.exports = router;

