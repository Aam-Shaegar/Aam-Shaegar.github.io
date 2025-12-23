/* === ГЛАВНЫЙ ОБРАБОТЧИК === */
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== КОНСТАНТЫ =====
  const FORM_ENDPOINT = "https://api.slapform.com/ypHAtTsSt";
  const STORAGE_KEY = "drupalFormData:v1";
  
  // ===== МОБИЛЬНОЕ МЕНЮ (DESKTOP) =====
  if (window.innerWidth <= 992) {
    const dropdownItems = document.querySelectorAll('.nav-menu > li');

    dropdownItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        dropdownItems.forEach(other => {
          if (other !== this) {
            other.classList.remove('active-dropdown');
          }
        });

        this.classList.toggle('active-dropdown');
      });
    });

    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-menu')) {
        dropdownItems.forEach(item => {
          item.classList.remove('active-dropdown');
        });
      }
    });
  }
  
  // ===== МОБИЛЬНОЕ МЕНЮ (HAMBURGER) =====
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNavMenu = document.querySelector('.mobile-nav-menu');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileNavMenu.classList.toggle('active');
    });
  }

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const submenu = this.nextElementSibling;
      const isActive = submenu.classList.contains('active');

      document.querySelectorAll('.dropdown-submenu').forEach(sm => {
        sm.classList.remove('active');
      });

      if (!isActive) {
        submenu.classList.add('active');
        this.classList.add('active');
      } else {
        this.classList.remove('active');
      }
    });
  });

  const navLinks = document.querySelectorAll('.mobile-nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNavMenu.classList.remove('active');
      document.querySelectorAll('.dropdown-submenu').forEach(sm => {
        sm.classList.remove('active');
      });
      document.querySelectorAll('.dropdown-toggle').forEach(t => {
        t.classList.remove('active');
      });
    });
  });
  
  // ===== СЛАЙДЕР ОТЗЫВОВ =====
  const reviewItems = document.querySelectorAll('.review-item');
  const prevBtn = document.querySelector('.review-prev');
  const nextBtn = document.querySelector('.review-next');
  const counter = document.querySelector('.review-counter');
  let currentIndex = 0;

  function showReview(index) {
    reviewItems.forEach((item, i) => {
      item.classList.remove('active');
      if (i === index) {
        item.classList.add('active');
      }
    });
    if (counter) {
      counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(reviewItems.length).padStart(2, '0')}`;
    }
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + reviewItems.length) % reviewItems.length;
      showReview(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % reviewItems.length;
      showReview(currentIndex);
    });
  }
  
  // ===== FAQ АККОРДЕОН =====
  document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      
      // Закрываем все остальные
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Переключаем текущий
      item.classList.toggle('active');
    });
  });
  
  // ===== ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Закрываем мобильное меню при переходе
        if (mobileNavMenu && mobileNavMenu.classList.contains('active')) {
          mobileNavMenu.classList.remove('active');
        }
      }
    });
  });
  
  // ========================================
  // ===== ОБРАБОТКА ФОРМЫ =====
  // ========================================
  
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) {
    console.warn('Форма #contact-form не найдена');
    return;
  }
  
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const consentCheckbox = document.getElementById('consent');
  const submitBtn = document.getElementById('submit-btn');
  const statusEl = document.getElementById('form-status');
  
  if (!statusEl) {
    console.error('Элемент #form-status не найден в HTML!');
    return;
  }
  
  // ===== ФУНКЦИИ РАБОТЫ С LOCALSTORAGE =====
  
  function saveToStorage() {
    try {
      const formData = {
        name: nameInput?.value || '',
        phone: phoneInput?.value || '',
        email: emailInput?.value || '',
        message: messageInput?.value || '',
        consent: consentCheckbox?.checked || false
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
      console.warn('Не удалось сохранить в localStorage:', e);
    }
  }
  
  function restoreFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      
      const data = JSON.parse(saved);
      if (nameInput) nameInput.value = data.name || '';
      if (phoneInput) phoneInput.value = data.phone || '';
      if (emailInput) emailInput.value = data.email || '';
      if (messageInput) messageInput.value = data.message || '';
      if (consentCheckbox) consentCheckbox.checked = data.consent || false;
      
      console.log('Данные восстановлены из localStorage');
    } catch (e) {
      console.warn('Не удалось восстановить из localStorage:', e);
    }
  }
  
  function clearFormAndStorage() {
    contactForm.reset();
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('localStorage очищен');
    } catch (e) {
      console.warn('Ошибка при очистке localStorage:', e);
    }
  }
  
  // ===== ВАЛИДАЦИЯ ФОРМЫ =====
  
  function validateForm() {
    hideStatus();
    
    if (!nameInput || !nameInput.value.trim()) {
      showStatus('Пожалуйста, укажите ваше имя', 'error');
      nameInput?.focus();
      return false;
    }
    
    if (!emailInput || !emailInput.value.trim()) {
      showStatus('Пожалуйста, укажите email', 'error');
      emailInput?.focus();
      return false;
    }
    
    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      showStatus('Пожалуйста, укажите корректный email', 'error');
      emailInput.focus();
      return false;
    }
    
    if (phoneInput && phoneInput.value.trim()) {
      // Если телефон указан, проверяем его
      const phoneDigits = phoneInput.value.replace(/\D/g, '');
      if (phoneDigits.length < 6) {
        showStatus('Пожалуйста, укажите корректный номер телефона', 'error');
        phoneInput.focus();
        return false;
      }
    }
    
    if (!consentCheckbox || !consentCheckbox.checked) {
      showStatus('Необходимо согласие на обработку персональных данных', 'error');
      consentCheckbox?.focus();
      return false;
    }
    
    return true;
  }
  
  // ===== ПОКАЗ/СКРЫТИЕ СТАТУСА =====
  
  function showStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = `form-status ${type}`;
    
    // Прокрутка к статусу
    setTimeout(() => {
      statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
  
  function hideStatus() {
    statusEl.className = 'form-status';
    statusEl.textContent = '';
  }
  
  // ===== ОТПРАВКА ФОРМЫ =====
  
  contactForm.addEventListener('submit', async function(ev) {
    ev.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'ОТПРАВКА...';
    submitBtn.disabled = true;
    showStatus('Отправка данных...', 'info');
    
    // Подготовка данных
    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput?.value.trim() || '',
      message: messageInput?.value.trim() || '',
      timestamp: new Date().toISOString(),
      source: window.location.href
    };
    
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`Сервер вернул ошибку: ${response.status}`);
      }
      
      // Пытаемся получить JSON ответ
      let data;
      try {
        data = await response.json();
      } catch (e) {
        // Если ответ не JSON, это тоже OK
        data = { success: true };
      }
      
      // Успешная отправка
      showStatus('Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
      clearFormAndStorage();
      
      console.log('Форма успешно отправлена:', data);
      
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      showStatus(`Ошибка отправки: ${error.message || 'Попробуйте позже'}`, 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
  
  // ===== АВТОСОХРАНЕНИЕ ПРИ ВВОДЕ =====
  
  if (nameInput) nameInput.addEventListener('input', saveToStorage);
  if (phoneInput) phoneInput.addEventListener('input', saveToStorage);
  if (emailInput) emailInput.addEventListener('input', saveToStorage);
  if (messageInput) messageInput.addEventListener('input', saveToStorage);
  if (consentCheckbox) consentCheckbox.addEventListener('change', saveToStorage);
  
  // ===== ФОРМАТИРОВАНИЕ ТЕЛЕФОНА =====
  
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      // Разрешаем только цифры и символ +
      let value = this.value;
      
      // Если есть +, оставляем только в начале
      if (value.includes('+')) {
        const parts = value.split('+');
        value = '+' + parts.join('').replace(/\D/g, '');
      } else {
        value = value.replace(/\D/g, '');
      }
      
      this.value = value;
    });
  }
  
  // ===== ВОССТАНОВЛЕНИЕ ДАННЫХ ПРИ ЗАГРУЗКЕ =====
  restoreFromStorage();
  
  console.log('✅ Форма настроена успешно');
  console.log('📍 Endpoint:', FORM_ENDPOINT);
  
}); // Конец DOMContentLoaded