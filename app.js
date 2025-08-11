// Tema claro/oscuro
(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if(saved === 'light') root.classList.add('light');
  toggle.setAttribute('aria-pressed', saved === 'light' ? 'true' : 'false');
  toggle.addEventListener('click', ()=>{
    const isLight = root.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    toggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
  });
})();

// Año en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Validación simple + envío por correo (mailto)
(function(){
    const form = document.getElementById('contactForm');
    const getErrorEl = (name) => document.querySelector(`[data-error-for="${name}"]`);

    function validate(){
        let ok = true;
        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const mensaje = form.mensaje.value.trim();

        // limpiar
        ['nombre','email','mensaje'].forEach(n=>{ getErrorEl(n).textContent=''; });

        if(!nombre){ getErrorEl('nombre').textContent = 'Requerido'; ok=false; }
        if(!email){ getErrorEl('email').textContent = 'Requerido'; ok=false; }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ getErrorEl('email').textContent = 'Correo inválido'; ok=false; }
        if(!mensaje){ getErrorEl('mensaje').textContent = 'Requerido'; ok=false; }

        return ok;
    }

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        if(!validate()) return;

        const nombre = encodeURIComponent(form.nombre.value.trim());
        const email = encodeURIComponent(form.email.value.trim());
        const mensaje = encodeURIComponent(form.mensaje.value.trim());

        const subject = `Consulta desde el sitio — ${nombre}`;
        const body = `Nombre: ${nombre}%0D%0AEmail: ${email}%0D%0A%0D%0AMensaje:%0D%0A${mensaje}`;

        // Cambiar este correo por el mio
        const to = 'luis.gutierrez.zuniga@est.una.ac.cr';
        window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
    });
})();