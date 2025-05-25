const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./banco.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS funcionarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    telefone TEXT,
    funcao TEXT,
    periodo TEXT,
    canteiro_id INTEGER,
    alojamento_id INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS canteiros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    rua TEXT,
    numero TEXT,
    bairro TEXT,
    cidade TEXT,
    estado TEXT,
    cep TEXT,
    latitude REAL,
    longitude REAL,
    status TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS alojamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    rua TEXT,
    numero TEXT,
    bairro TEXT,
    cidade TEXT,
    estado TEXT,
    cep TEXT,
    localizacao TEXT,
    capacidade INTEGER,
    latitude REAL,
    longitude REAL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS veiculos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT NOT NULL,
    placa TEXT UNIQUE NOT NULL,
    capacidade INTEGER,
    canteiro_id INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS funcionarios_canteiros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    funcionario_id INTEGER NOT NULL,
    canteiro_id INTEGER NOT NULL,
    periodo_trabalho TEXT,
    ativo INTEGER DEFAULT 1,
    FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id),
    FOREIGN KEY (canteiro_id) REFERENCES canteiros(id)
  )`);
});

module.exports = db;
