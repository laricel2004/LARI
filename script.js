// script.js

// 1. Melhorar o foco visível para navegação por teclado
document.addEventListener('keyup', function (event) {
    if (event.key === 'Tab') {
        const focusedElement = document.activeElement;
        focusedElement.classList.add('focus-visible');
    }
});

document.addEventListener('click', function (event) {
    const focusedElements = document.querySelectorAll('.focus-visible');
    focusedElements.forEach(element => element.classList.remove('focus-visible'));
});

// 2. Alternar tema de alto contraste
const toggleContrastButton = document.createElement('button');
toggleContrastButton.textContent = 'Alto Contraste';
toggleContrastButton.style.position = 'fixed';
toggleContrastButton.style.top = '10px';
toggleContrastButton.style.right = '10px';
toggleContrastButton.style.zIndex = '1000';
toggleContrastButton.setAttribute('aria-label', 'Alternar tema de alto contraste');
document.body.appendChild(toggleContrastButton);

toggleContrastButton.addEventListener('click', function () {
    document.body.classList.toggle('high-contrast');
});

// 3. Adicionar rótulos acessíveis para leitores de tela
const images = document.querySelectorAll('img');
images.forEach(image => {
    if (!image.getAttribute('alt')) {
        image.setAttribute('alt', 'Imagem decorativa');
    }
});

const links = document.querySelectorAll('a');
links.forEach(link => {
    if (!link.getAttribute('aria-label')) {
        link.setAttribute('aria-label', link.textContent);
    }
});

// 4. Facilitar a navegação por teclado
document.addEventListener('keydown', function (event) {
    const focusableElements = document.querySelectorAll('a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.key === 'Tab' && event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
    } else if (event.key === 'Tab' && !event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
    }
});