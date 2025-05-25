// funcionario.js - Cadastro com verificação de dependências

document.addEventListener('DOMContentLoaded', async () => {
  const canteirosOk = await carregarCanteiros();
  const alojamentosOk = await carregarAlojamentos();

  if (!canteirosOk || !alojamentosOk) {
    document.getElementById('form-funcionario').style.display = 'none';
    const msg = document.getElementById('mensagem');
    msg.style.color = 'red';
    msg.innerText = '⚠️ É necessário cadastrar ao menos um canteiro e um alojamento antes de cadastrar funcionários.';
  }
});

async function carregarCanteiros() {
  try {
    const resposta = await fetch('http://localhost:3000/api/canteiros');
    const canteiros = await resposta.json();
    const select = document.getElementById('canteiro_id');

    if (!canteiros.length) return false;

    select.innerHTML = '<option value="">Selecione um canteiro</option>';
    canteiros.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.nome;
      select.appendChild(opt);
    });
    return true;
  } catch (err) {
    return false;
  }
}

async function carregarAlojamentos() {
  try {
    const resposta = await fetch('http://localhost:3000/api/alojamentos');
    const alojamentos = await resposta.json();
    const select = document.getElementById('alojamento_id');

    if (!alojamentos.length) return false;

    select.innerHTML = '<option value="">Selecione um alojamento</option>';
    alojamentos.forEach(a => {
      const opt = document.createElement('option');
      opt.value = a.id;
      opt.textContent = a.nome;
      select.appendChild(opt);
    });
    return true;
  } catch (err) {
    return false;
  }
}

document.getElementById('form-funcionario').addEventListener('submit', async function (e) {
  e.preventDefault();

  const canteiroId = document.getElementById('canteiro_id').value;
  const alojamentoId = document.getElementById('alojamento_id').value;

  if (!canteiroId || !alojamentoId) {
    alert('Você precisa cadastrar canteiro e alojamento antes de cadastrar funcionário.');
    return;
  }

  const dados = {
    nome: document.getElementById('nome').value.trim(),
    cpf: document.getElementById('cpf').value.trim(),
    telefone: document.getElementById('telefone').value.trim(),
    funcao: document.getElementById('funcao').value.trim(),
    periodo: document.getElementById('periodo').value,
    canteiro_id: parseInt(canteiroId),
    alojamento_id: parseInt(alojamentoId)
  };

  try {
    const resposta = await fetch('http://localhost:3000/api/funcionarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();
    const mensagem = document.getElementById('mensagem');

    if (resposta.ok) {
      mensagem.style.color = 'green';
      mensagem.textContent = 'Funcionário cadastrado com sucesso!';
      document.getElementById('form-funcionario').reset();
    } else {
      mensagem.style.color = 'red';
      mensagem.textContent = resultado.error || 'Erro ao cadastrar funcionário.';
    }
  } catch (erro) {
    document.getElementById('mensagem').textContent = 'Erro de conexão com o servidor.';
    document.getElementById('mensagem').style.color = 'red';
  }
});
