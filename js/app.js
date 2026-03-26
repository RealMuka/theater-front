const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

burger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  burger.classList.toggle('active', isOpen);
  burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    burger.classList.remove('active');
    document.body.style.overflow = '';
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));


const modal = document.getElementById('showModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');

function openModal(data) {
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalGenre').textContent = data.genre;
  document.getElementById('modalDate').textContent = data.date;
  document.getElementById('modalStage').textContent = data.stage;
  document.getElementById('modalPrice').textContent = data.price;
  document.getElementById('modalDescription').textContent = data.description;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => modalClose.focus(), 100);
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    openModal({
      title: btn.dataset.title,
      genre: btn.dataset.genre,
      date: btn.dataset.date,
      stage: btn.dataset.stage,
      price: btn.dataset.price,
      description: btn.dataset.description,
    });
  });
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

const performancesData = [
  {
    title: 'Ночь без аплодисментов',
    genre: 'Драма',
    date: '27 марта • 20:00',
    stage: 'Малая сцена',
    price: 'от 20 BYN',
    description: 'Психологическая постановка о страхе, памяти и цене откровенности. Интимное пространство малой сцены усиливает каждое слово и взгляд актёров.',
  },
  {
    title: 'Вишневый вечер',
    genre: 'Классика',
    date: '30 марта • 19:00',
    stage: 'Большая сцена',
    price: 'от 25 BYN',
    description: 'Современное сценическое прочтение классического произведения. Режиссёр переносит действие в наше время, сохраняя поэтику оригинала.',
  },
  {
    title: 'Город огней',
    genre: 'Музыкальный',
    date: '2 апреля • 19:30',
    stage: 'Экспериментальная сцена',
    price: 'от 30 BYN',
    description: 'Музыка, танец и кинематографичная пластика в одном спектакле. Живой оркестр, световые инсталляции и захватывающая хореография.',
  },
];

document.querySelectorAll('.performance-card').forEach((card, i) => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    if (performancesData[i]) openModal(performancesData[i]);
  });
});

const subscribeForm = document.getElementById('subscribeForm');
const toast = document.getElementById('toast');

function showToast(message, type = 'success') {
  toast.textContent = message;
  toast.className = 'toast show ' + type;
  setTimeout(() => toast.classList.remove('show'), 3500);
}

subscribeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('subscribeEmail').value.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Введите корректный email', 'error');
    return;
  }

  const btn = subscribeForm.querySelector('button');
  btn.textContent = 'Отправляем...';
  btn.disabled = true;

  setTimeout(() => {
    showToast('Вы подписаны на новости премьер!');
    subscribeForm.reset();
    btn.textContent = 'Подписаться';
    btn.disabled = false;
  }, 1000);
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const heroOverlay = document.querySelector('.hero-overlay');
if (heroOverlay) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}