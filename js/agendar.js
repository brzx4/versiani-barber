// js/agendar.js

function gerarId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
let clienteId = localStorage.getItem('clienteId');
if (!clienteId) {
  clienteId = gerarId();
  localStorage.setItem('clienteId', clienteId);
}

const horariosDisponiveis = () => {
  const horas = [];
  let hora = 8, minuto = 30;
  while (hora < 20 || (hora === 20 && minuto <= 30)) {
    horas.push(`${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`);
    minuto += 30;
    if (minuto === 60) {
      minuto = 0;
      hora++;
    }
  }
  return horas;
};

const limparAgendamentosAntigos = () => {
  const hoje = new Date().toISOString().split('T')[0];
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
  const novos = agendamentos.filter(a => a.data >= hoje);
  localStorage.setItem('agendamentos', JSON.stringify(novos));
};

limparAgendamentosAntigos();

const horaSelect = document.getElementById('hora');
const dataInput = document.getElementById('data');

dataInput.min = new Date().toISOString().split('T')[0];

const atualizarHoras = () => {
  const data = dataInput.value;
  const horarios = horariosDisponiveis();
  horaSelect.innerHTML = '';
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
  horarios.forEach(hora => {
    const jaAgendado = agendamentos.find(a => a.data === data && a.hora === hora);
    if (!jaAgendado) {
      const option = document.createElement('option');
      option.value = hora;
      option.textContent = hora;
      horaSelect.appendChild(option);
    }
  });
};

dataInput.addEventListener('change', atualizarHoras);

document.getElementById('form-agendamento').addEventListener('submit', e => {
  e.preventDefault();
  const servico = document.getElementById('servico').value;
  const data = dataInput.value;
  const hora = horaSelect.value;
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;

  const precos = {
    'Corte': 20,
    'Barba': 15,
    'Sombrancelha': 5,
    'Corte + Sombrancelha': 25,
    'Corte + Barba': 35
  };

  const agendamento = {
    servico, data, hora, nome, telefone, preco: precos[servico], clienteId
  };

  const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
  agendamentos.push(agendamento);
  localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

  document.getElementById('mensagem-confirmacao').innerHTML = 'Agendamento confirmado com sucesso!';
  document.getElementById('mensagem-confirmacao').style.display = 'block';
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 2000);
});

// Máscara telefone
const telefoneInput = document.getElementById('telefone');
telefoneInput.addEventListener('input', () => {
  let valor = telefoneInput.value.replace(/\D/g, '');
  valor = valor.slice(0, 11);
  if (valor.length <= 10) {
    valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else {
    valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  }
  telefoneInput.value = valor.trim();
});
telefoneInput.addEventListener('keypress', e => {
  if (!/[0-9]/.test(e.key)) e.preventDefault();
});
