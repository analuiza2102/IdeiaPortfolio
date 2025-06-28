document.addEventListener('DOMContentLoaded', function () {
  // Elementos do modo escuro
  const toggleBtn = document.getElementById('toggleTheme');
  const toggleBtnMobile = document.getElementById('toggleThemeMobile');
  const body = document.body;

  // Elementos do menu mobile
  const openMenu = document.getElementById('openMenu');
  const closeMenu = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');

  // === Função: alternar modo escuro ===
  function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    if (toggleBtn) toggleBtn.textContent = isDark ? '☀️' : '🌙';
    if (toggleBtnMobile) toggleBtnMobile.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro';
  }

  // === Tema salvo no localStorage ===
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    if (toggleBtn) toggleBtn.textContent = '☀️';
    if (toggleBtnMobile) toggleBtnMobile.textContent = '☀️ Modo Claro';
  }

  // === Listeners: botões de tema ===
  if (toggleBtn) toggleBtn.addEventListener('click', toggleDarkMode);
  if (toggleBtnMobile) toggleBtnMobile.addEventListener('click', toggleDarkMode);

  // === Abrir menu mobile ===
  if (openMenu && mobileMenu) {
    openMenu.addEventListener('click', () => {
      mobileMenu.classList.add('active');
    });
  }

  // === Fechar menu mobile ===
  if (closeMenu && mobileMenu) {
    closeMenu.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  }

  // === Fechar menu ao clicar em um link ===
  if (mobileMenu) {
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }

  // === Efeito de digitação no h1 ===
  const typedText = document.getElementById('typed-text');
  if (typedText) {
    new Typed('#typed-text', {
      strings: [
        'De ideias ao código,',
        'soluções digitais sob medida.'
      ],
      typeSpeed: 30,
      backSpeed: 10,
      backDelay: 2100,
      loop: true
    });
  }

  // === Envio do formulário de contato com feedback ===
  const form = document.getElementById("contact-form");
  const statusMsg = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const action = form.action;

      try {
        const response = await fetch(action, {
          method: "POST",
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.reset();
          statusMsg.innerText = "Mensagem enviada com sucesso!";
          statusMsg.style.color = "green";
        } else {
          statusMsg.innerText = "Ocorreu um erro. Tente novamente.";
          statusMsg.style.color = "red";
        }
      } catch (error) {
        statusMsg.innerText = "Erro de conexão. Verifique sua internet.";
        statusMsg.style.color = "red";
      }
    });
  }
});
