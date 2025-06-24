document.getElementById('cliente').addEventListener('click', () => {
  window.location.href = 'index.html';
});

document.getElementById('admin').addEventListener('click', () => {
  document.getElementById('senha-container').style.display = 'block';
});

document.getElementById('entrar-admin').addEventListener('click', () => {
  const senha = document.getElementById('senha').value;
  if (senha === '1234') { // você pode trocar essa senha
    window.location.href = 'admin.html';
  } else {
    document.getElementById('erro-senha').style.display = 'block';
  }
});
