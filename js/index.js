// js/index.js

function gerarId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
let clienteId = localStorage.getItem('clienteId');
if (!clienteId) {
  clienteId = gerarId();
  localStorage.setItem('clienteId', clienteId);
}

const limparAgendamentosAntigos = () => {
  const hoje = new Date().toISOString().split('T')[0];
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
  const novos = agendamentos.filter(a => a.data >= hoje);
  localStorage.setItem('agendamentos', JSON.stringify(novos));
};

limparAgendamentosAntigos();

const lista = document.getElementById('agendamentos');
let agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');

function renderizar() {
  lista.innerHTML = '';
  const agendamentosCliente = agendamentos.filter(a => a.clienteId === clienteId);
  if (agendamentosCliente.length === 0) {
    lista.innerHTML = '<p>Você ainda não tem agendamentos.</p>';
  } else {
    agendamentosCliente.forEach((a) => {
      const item = document.createElement('div');
      item.className = 'agendamento';
      item.innerHTML = `
        <strong>${a.nome}</strong><br>
        Serviço: ${a.servico}<br>
        Data: ${a.data}<br>
        Hora: ${a.hora}<br>
        Telefone: ${a.telefone}<br>
        Preço: R$${a.preco}<br>
        <button class="cancelar-btn" data-data="${a.data}" data-hora="${a.hora}">Cancelar</button>
      `;
      lista.appendChild(item);
    });
  }

  document.querySelectorAll('.cancelar-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const data = e.target.getAttribute('data-data');
      const hora = e.target.getAttribute('data-hora');
      agendamentos = agendamentos.filter(a => !(a.clienteId === clienteId && a.data === data && a.hora === hora));
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
      renderizar();
    });
  });
}

renderizar();

document.getElementById('btn-novo').addEventListener('click', () => {
  window.location.href = 'agendar.html';
});
