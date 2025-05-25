// veiculo.js - Cadastro com validação e dropdown de canteiro

document.addEventListener('DOMContentLoaded', () => {
  carregarCanteiros();
});

async function carregarCanteiros() {
  try {
    const resposta = await fetch('http://localhost:3000/api/canteiros');
    const canteiros = await resposta.json();
    const select = document.getElementById('canteiro_id');
    select.innerHTML = '<option value="">Selecione um canteiro (opcional)</option>';
    canteiros.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.nome;
      select.appendChild(opt);
    });
  } catch (err) {
    console.error('Erro ao carregar canteiros:', err);
  }
}

document.getElementById('form-veiculo').addEventListener('submit', async function (e) {
  e.preventDefault();

  const tipo = document.getElementById('tipo').value.trim();
  const placa = document.getElementById('placa').value.trim().toUpperCase();
  const capacidade = parseInt(document.getElementById('capacidade').value);
  const canteiro_id = document.getElementById('canteiro_id').value;

  if (!tipo || tipo.length < 3) return alert('Informe o tipo do veículo.');
  if (!placa.match(/^[A-Z]{3}\d{4}$/)) return alert('Placa inválida. Use o formato ABC1234.');
  if (isNaN(capacidade) || capacidade <= 0) return alert('Capacidade deve ser um número positivo.');

  const dados = {
    tipo,
    placa,
    capacidade,
    canteiro_id: canteiro_id ? parseInt(canteiro_id) : null
  };

  try {
    const resposta = await fetch('http://localhost:3000/api/veiculos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();
    const mensagem = document.getElementById('mensagem');

    if (resposta.ok) {
      mensagem.style.color = 'green';
      mensagem.textContent = 'Veículo cadastrado com sucesso!';
      document.getElementById('form-veiculo').reset();
    } else {
      mensagem.style.color = 'red';
      mensagem.textContent = resultado.error || 'Erro ao cadastrar veículo.';
    }
  } catch (erro) {
    document.getElementById('mensagem').textContent = 'Erro de conexão com o servidor.';
    document.getElementById('mensagem').style.color = 'red';
  }
});