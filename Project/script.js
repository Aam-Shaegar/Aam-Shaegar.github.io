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

document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    item.classList.toggle('active');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNavMenu = document.querySelector('.mobile-nav-menu');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  // Открытие/закрытие основного мобильного меню
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileNavMenu.classList.toggle('active');
    });
  }

  // Обработка кликов по кнопкам раскрытия подменю
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const submenu = this.nextElementSibling;
      const isActive = submenu.classList.contains('active');

      // Закрываем все другие подменю
      document.querySelectorAll('.dropdown-submenu').forEach(sm => {
        sm.classList.remove('active');
      });

      // Если это не было активно — открываем
      if (!isActive) {
        submenu.classList.add('active');
        this.classList.add('active');
      } else {
        this.classList.remove('active');
      }
    });
  });

  // Закрытие меню при клике на ссылку (опционально)
  const navLinks = document.querySelectorAll('.mobile-nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNavMenu.classList.remove('active');
      // Убираем активность со всех подменю
      document.querySelectorAll('.dropdown-submenu').forEach(sm => {
        sm.classList.remove('active');
      });
      document.querySelectorAll('.dropdown-toggle').forEach(t => {
        t.classList.remove('active');
      });
    });
  });
});

/* === НОВЫЙ КОД ДЛЯ ОТПРАВКИ ФОРМЫ === */
document.addEventListener('DOMContentLoaded', function() {
  // Находим форму по ID (у вас форма имеет id="contactForm")
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) {
    console.log('Форма не найдена на странице');
    return;
  }
  
  console.log('Форма найдена, настраиваю обработку...');
  
  // Создаем элемент для сообщений
  const formMessage = document.createElement('div');
  formMessage.id = 'form-message';
  formMessage.style.cssText = 'margin-top: 15px; padding: 10px; border-radius: 5px; display: none;';
  contactForm.appendChild(formMessage);
  
  // Добавляем honeypot поле для защиты от спама
  const honeypot = document.createElement('input');
  honeypot.type = 'text';
  honeypot.name = 'company';
  honeypot.style.cssText = 'position: absolute; left: -9999px; opacity: 0;';
  honeypot.placeholder = 'Не заполняйте это поле';
  contactForm.appendChild(honeypot);
  
  // Функция для показа сообщений
  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.style.display = 'block';
    
    if (type === 'success') {
      formMessage.style.backgroundColor = '#d4edda';
      formMessage.style.color = '#155724';
      formMessage.style.border = '1px solid #c3e6cb';
    } else if (type === 'error') {
      formMessage.style.backgroundColor = '#f8d7da';
      formMessage.style.color = '#721c24';
      formMessage.style.border = '1px solid #f5c6cb';
    }
    
    // Автоматически скрываем через 5 секунд
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }
  
  // Обработчик отправки формы
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    console.log('Форма отправляется...');
    
    // Проверка honeypot поля
    if (honeypot.value.trim() !== '') {
      console.log('Обнаружен спам-бот');
      showMessage('Обнаружена подозрительная активность', 'error');
      return;
    }
    
    // Проверяем согласие на обработку данных
    const consentCheckbox = document.getElementById('consent');
    if (!consentCheckbox || !consentCheckbox.checked) {
      showMessage('Необходимо дать согласие на обработку персональных данных', 'error');
      return;
    }
    
    // Собираем данные формы
    const formData = {
      name: document.getElementById('name')?.value || '',
      phone: document.getElementById('phone')?.value || '',
      email: document.getElementById('email')?.value || '',
      message: document.getElementById('message')?.value || '',
      consent: true,
      source: 'Drupal-coder Website',
      timestamp: new Date().toISOString(),
      // Добавляем дополнительные поля, которые ожидает Slapform
      subject: 'Заявка с сайта Drupal-coder',
      website: window.location.href
    };
    
    console.log('Данные для отправки:', formData);
    
    // Проверяем обязательные поля
    if (!formData.name || !formData.phone || !formData.email) {
      showMessage('Пожалуйста, заполните все обязательные поля', 'error');
      return;
    }
    
    // Сохраняем оригинальный текст кнопки
    const submitButton = contactForm.querySelector('.form-submit');
    const originalText = submitButton.textContent;
    
    // Меняем текст кнопки и блокируем ее
    submitButton.textContent = 'Отправка...';
    submitButton.disabled = true;
    
    try {
      console.log('Отправляем запрос на Slapform...');
      
      // Отправляем данные на Slapform
      const response = await fetch('https://api.slapform.com/ypHAtTsSt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      console.log('Ответ от сервера:', response.status);
      
      const result = await response.json();
      console.log('Результат:', result);
      
      if (response.ok) {
        // Успешная отправка
        showMessage('✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
        
        // Очищаем форму
        contactForm.reset();
        
        // Прокручиваем к сообщению об успехе
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        // Ошибка от сервера Slapform
        showMessage(`❌ Ошибка отправки: ${result.error || 'Попробуйте еще раз'}`, 'error');
      }
      
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      showMessage('❌ Ошибка сети. Пожалуйста, попробуйте еще раз.', 'error');
    } finally {
      // Восстанавливаем кнопку
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
  
  // Обработчик для проверки телефона (опционально)
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      // Оставляем только цифры, плюс, скобки и дефисы
      this.value = this.value.replace(/[^\d\s\+\-\(\)]/g, '');
    });
  }
  
  console.log('Обработка формы настроена успешно');
});