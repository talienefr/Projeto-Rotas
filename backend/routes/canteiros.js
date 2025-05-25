const express = require('express');
const router = express.Router();
const db = require('../database');

// GET - Listar todos os canteiros
router.get('/', (req, res) => {
  db.all('SELECT * FROM canteiros', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST - Cadastro
router.post('/', (req, res) => {
  const {
    nome,
    rua,
    numero,
    bairro,
    cidade,
    estado,
    cep,
    latitude,
    longitude,
    status
  } = req.body;

  if (!nome || !rua || !numero || !bairro || !cidade || !estado || !cep || latitude == null || longitude == null || !status) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
  }

  const query = `
    INSERT INTO canteiros (
      nome, rua, numero, bairro, cidade, estado, cep,
      latitude, longitude, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    nome, rua, numero, bairro, cidade, estado, cep,
    latitude, longitude, status
  ];

  db.run(query, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

module.exports = router;