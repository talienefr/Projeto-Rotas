const express = require('express');
const router = express.Router();
const db = require('../database');

// GET - Listar todos os alojamentos
router.get('/', (req, res) => {
  db.all('SELECT * FROM alojamentos', [], (err, rows) => {
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
    localizacao,
    capacidade,
    latitude,
    longitude
  } = req.body;

  if (!nome || !rua || !numero || !bairro || !cidade || !estado || !cep || latitude == null || longitude == null) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
  }

  const query = `
    INSERT INTO alojamentos (
      nome, rua, numero, bairro, cidade, estado, cep,
      localizacao, capacidade, latitude, longitude
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    nome, rua, numero, bairro, cidade, estado, cep,
    localizacao, capacidade, latitude, longitude
  ];

  db.run(query, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

module.exports = router;
