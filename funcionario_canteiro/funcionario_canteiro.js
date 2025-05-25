// funcionario_canteiro.js

document.addEventListener('DOMContentLoaded', () => {
  carregarFuncionarios();
  carregarCanteiros();
  carregarVinculos();
});

async function carregarFuncionarios() {
  try {
    const resposta = await fetch('http://localhost:3000/api/funcionarios');
    const funcionarios = await resposta.json();
    const select = document.getElementById('funcionario_id');
    select.innerHTML = '<option value="">Selecione um funcionário</option>';
    funcionarios.forEach(f => {
      const opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = f.nome;
      select.appendChild(opt);
    });
  } catch (err) {
    console.error('Erro ao carregar funcionários:', err);
  }
}

async function carregarCanteiros() {
  try {
    const resposta = await fetch('http://localhost:3000/api/canteiros');
    const canteiros = await resposta.json();
    const select = document.getElementById('canteiro_id');
    select.innerHTML = '<option value="">Selecione um canteiro</option>';
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

async function carregarVinculos() {
  try {
    const resposta = await fetch('http://localhost:3000/api/funcionarios_canteiros');
    const vinculos = await resposta.json();
    const tbody = document.querySelector('#tabela-vinculos tbody');
    tbody.innerHTML = '';

    if (!vinculos.length) {
      tbody.innerHTML = '<tr><td colspan="5">Nenhum vínculo cadastrado.</td></tr>';
      return;
    }

    vinculos.forEach(v => {
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${v.funcionario}</td>
        <td>${v.canteiro}</td>
        <td>${v.periodo_trabalho}</td>
        <td>${v.ativo ? 'Ativo' : 'Inativo'}</td>
        <td><button onclick="removerVinculo(${v.id})">Remover</button></td>
      `;
      tbody.appendChild(linha);
    });
  } catch (err) {
    console.error('Erro ao carregar vínculos:', err);
  }
}

async function removerVinculo(id) {
  if (!confirm('Tem certeza que deseja remover este vínculo?')) return;

  try {
    const resposta = await fetch(`http://localhost:3000/api/funcionarios_canteiros/${id}`, {
      method: 'DELETE'
    });

    if (resposta.ok) {
      carregarVinculos();
    } else {
      const resultado = await resposta.json();
      alert('Erro ao remover vínculo: ' + (resultado.error || 'Erro desconhecido.'));
    }
  } catch (err) {
    alert('Erro ao se conectar com o servidor.');
  }
}

document.getElementById('form-vinculo').addEventListener('submit', async function (e) {
  e.preventDefault();

  const dados = {
    funcionario_id: parseInt(document.getElementById('funcionario_id').value),
    canteiro_id: parseInt(document.getElementById('canteiro_id').value),
    periodo_trabalho: document.getElementById('periodo_trabalho').value.trim(),
    ativo: document.getElementById('ativo').checked ? 1 : 0
  };

  if (!dados.funcionario_id || !dados.canteiro_id || !dados.periodo_trabalho) {
    return alert('Preencha todos os campos obrigatórios.');
  }

  try {
    const resposta = await fetch('http://localhost:3000/api/funcionarios_canteiros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();
    const mensagem = document.getElementById('mensagem');

    if (resposta.ok) {
      mensagem.style.color = 'green';
      mensagem.textContent = 'Vínculo cadastrado com sucesso!';
      document.getElementById('form-vinculo').reset();
      carregarVinculos();
    } else {
      mensagem.style.color = 'red';
      mensagem.textContent = resultado.error || 'Erro ao cadastrar vínculo.';
    }
  } catch (erro) {
    document.getElementById('mensagem').textContent = 'Erro de conexão com o servidor.';
    document.getElementById('mensagem').style.color = 'red';
  }
});
