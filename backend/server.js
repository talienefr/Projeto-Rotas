const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/funcionarios', require('./routes/funcionarios'));
app.use('/api/canteiros', require('./routes/canteiros'));
app.use('/api/alojamentos', require('./routes/alojamentos'));
app.use('/api/veiculos', require('./routes/veiculos'));
app.use('/api/funcionarios_canteiros', require('./routes/funcionarios_canteiros'));


app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));