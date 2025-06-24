// js/admin.js

const lista = document.getElementById('agendamentos');
let agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');

const renderizar = () => {
  lista.innerHTML = '';
  if (agendamentos.length === 0) {
    lista.innerHTML = '<p>Não há agendamentos cadastrados.</p>';
  } else {
    agendamentos.forEach((a, index) => {
      const item = document.createElement('div');
      item.className = 'agendamento';
      item.innerHTML = `
        <strong>${a.nome}</strong> - Cliente ID: ${a.clienteId}<br>
        Serviço: ${a.servico}<br>
        Data: ${a.data}<br>
        Hora: ${a.hora}<br>
        Telefone: ${a.telefone}<br>
        Preço: R$${a.preco}<br>
        <button class="cancelar-btn" data-index="${index}">Cancelar</button>
      `;
      lista.appendChild(item);
    });
  }

  document.querySelectorAll('.cancelar-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const i = e.target.getAttribute('data-index');
      agendamentos.splice(i, 1);
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
      renderizar();
    });
  });
};

renderizar();
