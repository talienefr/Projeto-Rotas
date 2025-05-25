// script.js - Comportamento inicial do sistema

document.addEventListener('DOMContentLoaded', () => {
  console.log('Sistema de Rotas carregado com sucesso.');

  // Exemplo: adicionar efeito ao clicar nos botões
  const botoes = document.querySelectorAll('.menu-btn');
  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      botao.classList.add('ativo');
      setTimeout(() => botao.classList.remove('ativo'), 200);
    });
  });
});
