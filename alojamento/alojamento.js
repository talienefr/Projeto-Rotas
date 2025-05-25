// alojamento.js - Cadastro com fallback manual de coordenadas

document.getElementById('cep').addEventListener('blur', buscarEnderecoViaCEP);

document.getElementById('form-alojamento').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const rua = document.getElementById('rua').value.trim();
  const numero = document.getElementById('numero').value.trim();
  const bairro = document.getElementById('bairro').value.trim();
  const cidade = document.getElementById('cidade').value.trim();
  const estado = document.getElementById('estado').value.trim();
  const cep = document.getElementById('cep').value.trim();
  const capacidade = document.getElementById('capacidade').value;

  if (!nome || !rua || !numero || !bairro || !cidade || !estado || !cep) {
    return alert('Preencha todos os campos obrigatórios.');
  }

  const enderecoCompleto = `${rua}, ${numero}, ${bairro}, ${cidade}, ${estado}, ${cep}`;

  let latitude = null;
  let longitude = null;

  try {
    const geoURL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoCompleto)}`;
    const respostaGeo = await fetch(geoURL, {
      headers: { 'Accept-Language': 'pt-BR' }
    });
    const resultados = await respostaGeo.json();

    if (resultados.length) {
      latitude = parseFloat(resultados[0].lat);
      longitude = parseFloat(resultados[0].lon);
      document.getElementById('coordenadas-manual').style.display = 'none';
    } else {
      document.getElementById('coordenadas-manual').style.display = 'block';
      latitude = parseFloat(document.getElementById('latitude-manual').value);
      longitude = parseFloat(document.getElementById('longitude-manual').value);

      if (isNaN(latitude) || isNaN(longitude)) {
        return alert('Preencha manualmente latitude e longitude.');
      }
    }
  } catch (erro) {
    document.getElementById('coordenadas-manual').style.display = 'block';
    latitude = parseFloat(document.getElementById('latitude-manual').value);
    longitude = parseFloat(document.getElementById('longitude-manual').value);

    if (isNaN(latitude) || isNaN(longitude)) {
      return alert('Preencha manualmente latitude e longitude.');
    }
  }

  const dados = {
    nome,
    rua,
    numero,
    bairro,
    cidade,
    estado,
    cep,
    localizacao: enderecoCompleto,
    capacidade: capacidade ? parseInt(capacidade) : null,
    latitude,
    longitude
  };

  try {
    const resposta = await fetch('http://localhost:3000/api/alojamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();
    const mensagem = document.getElementById('mensagem');

    if (resposta.ok) {
      mensagem.style.color = 'green';
      mensagem.textContent = 'Alojamento cadastrado com sucesso!';
      document.getElementById('form-alojamento').reset();
      document.getElementById('coordenadas-manual').style.display = 'none';
    } else {
      mensagem.style.color = 'red';
      mensagem.textContent = resultado.error || 'Erro ao cadastrar alojamento.';
    }
  } catch (erro) {
    document.getElementById('mensagem').textContent = 'Erro de conexão ou geocodificação.';
    document.getElementById('mensagem').style.color = 'red';
  }
});

async function buscarEnderecoViaCEP() {
  const cep = document.getElementById('cep').value.replace(/\D/g, '');
  if (cep.length !== 8) return;

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    if (dados.erro) return alert('CEP não encontrado.');

    document.getElementById('rua').value = dados.logradouro || '';
    document.getElementById('bairro').value = dados.bairro || '';
    document.getElementById('cidade').value = dados.localidade || '';
    document.getElementById('estado').value = dados.uf || '';
  } catch (erro) {
    alert('Erro ao buscar o endereço pelo CEP.');
  }
}
