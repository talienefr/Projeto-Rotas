const express = require('express');
const router = express.Router();
const db = require('../database');

// GET - Listar vínculos funcionário x canteiro
router.get('/', (req, res) => {
  const query = `
    SELECT 
      fc.id,
      f.nome AS funcionario,
      c.nome AS canteiro,
      fc.periodo_trabalho,
      fc.ativo
    FROM funcionarios_canteiros fc
    JOIN funcionarios f ON fc.funcionario_id = f.id
    JOIN canteiros c ON fc.canteiro_id = c.id
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST - Cadastrar vínculo
router.post('/', (req, res) => {
  const { funcionario_id, canteiro_id, periodo_trabalho, ativo } = req.body;

  if (!funcionario_id || !canteiro_id || !periodo_trabalho) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
  }

  const query = `
    INSERT INTO funcionarios_canteiros (funcionario_id, canteiro_id, periodo_trabalho, ativo)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [funcionario_id, canteiro_id, periodo_trabalho, ativo], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

// DELETE - Remover vínculo
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  db.run('DELETE FROM funcionarios_canteiros WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Vínculo removido com sucesso.' });
  });
});

module.exports = router;