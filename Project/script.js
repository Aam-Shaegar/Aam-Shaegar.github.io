/*<!-- Скрипт для мобильного меню -->*/
document.addEventListener('DOMContentLoaded', function() {
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
});

/* Слайдер отзывов */
document.addEventListener('DOMContentLoaded', function() {
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
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(reviewItems.length).padStart(2, '0')}`;
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
});

/* FAQ аккордеон */
document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    item.classList.toggle('active');
  });
});

/* Мобильное меню */
document.addEventListener('DOMContentLoaded', function() {
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
});

/* === УЛУЧШЕННАЯ ОБРАБОТКА ФОРМЫ === */
document.addEventListener('DOMContentLoaded', function() {
  const FORM_ENDPOINT = "https://api.slapform.com/ypHAtTsSt";
  const STORAGE_KEY = "drupalFormData:v1";
  
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) {
    console.log('Форма не найдена');
    return;
  }
  
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const consentCheckbox = document.getElementById('consent');
  const submitBtn = contactForm.querySelector('.form-submit');
  
  // Создаем элемент для статуса
  let statusEl = document.getElementById('form-status');
  if (!statusEl) {
    statusEl = document.createElement('div');
    statusEl.id = 'form-status';
    statusEl.style.cssText = 'margin-top: 15px; padding: 10px; border-radius: 5px; display: none;';
    contactForm.appendChild(statusEl);
  }
  
  /* === ИДЕИ ИЗ ВАШЕГО КОДА === */
  
  // 1. Сохранение в localStorage (пользователь не потеряет данные)
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
      console.log('Не удалось сохранить в localStorage');
    }
  }
  
  // 2. Восстановление из localStorage
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
    } catch (e) {
      console.log('Не удалось восстановить из localStorage');
    }
  }
  
  // 3. Очистка формы и хранилища
  function clearFormAndStorage() {
    contactForm.reset();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // Игнорируем ошибки очистки
    }
  }
  
  // 4. Валидация формы (улучшенная)
  function validateForm() {
    statusEl.style.display = 'none';
    
    if (!nameInput || !nameInput.value.trim()) {
      showStatus('Пожалуйста, укажите ваше имя', 'error');
      nameInput?.focus();
      return false;
    }
    
    if (!phoneInput || !phoneInput.value.trim()) {
      showStatus('Пожалуйста, укажите телефон', 'error');
      phoneInput?.focus();
      return false;
    }
    
    // Простая валидация телефона (хотя бы 5 цифр)
    const phoneDigits = phoneInput.value.replace(/\D/g, '');
    if (phoneDigits.length < 5) {
      showStatus('Пожалуйста, укажите корректный номер телефона', 'error');
      phoneInput.focus();
      return false;
    }
    
    if (!emailInput || !emailInput.value.trim()) {
      showStatus('Пожалуйста, укажите email', 'error');
      emailInput?.focus();
      return false;
    }
    
    // Простая валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      showStatus('Пожалуйста, укажите корректный email', 'error');
      emailInput.focus();
      return false;
    }
    
    if (!consentCheckbox || !consentCheckbox.checked) {
      showStatus('Необходимо согласие на обработку персональных данных', 'error');
      consentCheckbox?.focus();
      return false;
    }
    
    return true;
  }
  
  // 5. Показ статуса с цветами
  function showStatus(message, type) {
    statusEl.textContent = message;
    statusEl.style.display = 'block';
    
    if (type === 'success') {
      statusEl.style.backgroundColor = '#d4edda';
      statusEl.style.color = '#155724';
      statusEl.style.border = '1px solid #c3e6cb';
    } else if (type === 'error') {
      statusEl.style.backgroundColor = '#f8d7da';
      statusEl.style.color = '#721c24';
      statusEl.style.border = '1px solid #f5c6cb';
    }
  }
  
  // 6. Обработчик отправки (асинхронный, как у вас)
  contactForm.addEventListener('submit', async function(ev) {
    ev.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    // Подготовка данных для отправки
    const payload = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      email: emailInput.value.trim(),
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
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Успешная отправка
      showStatus('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
      clearFormAndStorage();
      
      // Прокрутка к сообщению об успехе
      setTimeout(() => {
        statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
      
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      showStatus(`Ошибка отправки: ${error.message || 'Попробуйте еще раз'}`, 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
  
  // 7. Автосохранение при вводе (как у вас)
  if (nameInput) nameInput.addEventListener('input', saveToStorage);
  if (phoneInput) phoneInput.addEventListener('input', saveToStorage);
  if (emailInput) emailInput.addEventListener('input', saveToStorage);
  if (messageInput) messageInput.addEventListener('input', saveToStorage);
  if (consentCheckbox) consentCheckbox.addEventListener('change', saveToStorage);
  
  // 8. Восстановление данных при загрузке
  restoreFromStorage();
  
  // 9. Обработчик для телефона (форматирование)
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      // Сохраняем позицию курсора
      const cursorPos = this.selectionStart;
      const originalLength = this.value.length;
      
      // Удаляем все нецифровые символы, кроме + в начале
      let value = this.value;
      if (value.startsWith('+')) {
        const plus = '+';
        const digits = value.substring(1).replace(/\D/g, '');
        value = plus + digits;
      } else {
        value = value.replace(/\D/g, '');
      }
      
      this.value = value;
      
      // Восстанавливаем позицию курсора
      const newLength = this.value.length;
      const cursorOffset = newLength - originalLength;
      this.setSelectionRange(cursorPos + cursorOffset, cursorPos + cursorOffset);
      
      // Автосохранение
      saveToStorage();
    });
  }
  
  // 10. Автоматическое определение страны по телефону (опционально)
  if (phoneInput && !phoneInput.value.startsWith('+')) {
    phoneInput.value = '+7' + (phoneInput.value || '');
  }
  
  console.log('Форма настроена с улучшениями из вашего кода');
});