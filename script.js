document.addEventListener('DOMContentLoaded', function() {
    // Пиксельный дождь
    createPixelRain();
    
    // Анимация текста в консоли
    const consoleText = document.getElementById('console-text');
    const consoleUnderscore = document.getElementById('console-underscore');
    const phrases = [
        'Разработка игр на Unity',
        'Программирование на C#/C++',
        'Создание игрового ИИ',
        'Оптимизация производительности',
        'Разработка VR/AR приложений'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function typeText() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            consoleText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            consoleText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isEnd = true;
            setTimeout(() => {
                isDeleting = true;
                typeText();
            }, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
        
        const speed = isDeleting ? 100 : 150;
        setTimeout(typeText, isEnd ? speed / 2 : speed);
        isEnd = false;
    }
    
    // Запуск анимации текста
    setTimeout(typeText, 1000);
    
    // Анимация подчеркивания
    setInterval(() => {
        consoleUnderscore.style.opacity = consoleUnderscore.style.opacity === '0' ? '1' : '0';
    }, 500);
    
    // Анимация прогресс-баров
    function animateStats() {
        const statBars = document.querySelectorAll('.stat-bar');
        statBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        });
    }
    
    // Запуск анимации при скролле
    window.addEventListener('scroll', function() {
        const skillsSection = document.getElementById('skills');
        const skillsPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (skillsPosition < screenPosition) {
            animateStats();
        }
    });
    
   // Фильтрация портфолио
const filterButtons = document.querySelectorAll('.portfolio-filter button');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Удаляем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Создание пиксельного дождя
    function createPixelRain() {
        const container = document.getElementById('pixel-rain');
        const pixelCount = 100;
        
        for (let i = 0; i < pixelCount; i++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            
            // Случайные свойства
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * window.innerWidth;
            const delay = Math.random() * 5;
            const duration = Math.random() * 5 + 5;
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Цвета из палитры сайта
            const colors = ['#6a5acd', '#9370db', '#ff6b6b', '#4ecdc4'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            pixel.style.width = `${size}px`;
            pixel.style.height = `${size}px`;
            pixel.style.left = `${posX}px`;
            pixel.style.backgroundColor = color;
            pixel.style.opacity = opacity;
            pixel.style.animationDelay = `${delay}s`;
            pixel.style.animationDuration = `${duration}s`;
            
            container.appendChild(pixel);
        }
    }
    
    // Добавляем стили для пикселей дождя
    const style = document.createElement('style');
    style.textContent = `
        .pixel {
            position: absolute;
            top: -20px;
            border-radius: 50%;
            animation: fall linear infinite;
            pointer-events: none;
        }
        
        @keyframes fall {
            to {
                transform: translateY(calc(100vh + 20px));
            }
        }
    `;
    document.head.appendChild(style);
    
    // Интерактивный health bar
    window.addEventListener('scroll', function() {
        const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        const healthFill = document.querySelector('.health-fill');
        const levelNumber = document.querySelector('.level-number');
        
        // Рассчитываем "здоровье" в зависимости от прокрутки
        const health
