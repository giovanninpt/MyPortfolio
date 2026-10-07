document.addEventListener('DOMContentLoaded', () => {
    initContactFormValidation();
    initQuoteGenerator();
    initCharacterCounter();
    initThemeToggle();

});

function initContactFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const MIN_MESSAGE_LENGTH = 20;

    function showError(input, message) {
        clearError(input);
        input.classList.add('is-invalid');
        const errorEl = document.createElement('div');
        errorEl.className = 'invalid-feedback';
        errorEl.textContent = message;
        errorEl.setAttribute('role', 'alert');
        input.insertAdjacentElement('afterend', errorEl);
    }

    function clearError(input) {
        input.classList.remove('is-invalid');
        const next = input.nextElementSibling;
        if (next && next.classList.contains('invalid-feedback')) {
            next.remove();
        }
    }

    function validateField(input) {
        if (input === nameInput && input.value.trim() === '') {
            showError(input, 'Please enter your name.'); 
            return false;
        }
        if (input === emailInput && !emailpattern.test(input.value.trim())) {
            showError(input, 'Please enter a valid email address.');
            return false;
        }
        if (input === messageInput && input.value.trim().length < MIN_MESSAGE_LENGTH) {
            showError(input, `The message must be at least ${MIN_MESSAGE_LENGTH} characters long.`);
            return false;
        }
        clearError(input);
        return true;
    }
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('blur', () => validateField(input));
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const nameOk = validateField(nameInput);
        const emailOk = validateField(emailInput);
        const messageOk = validateField(messageInput);

        if (nameOk && emailOk && messageOk) {
            form.reset();
            messageInput.dispatchEvent(new Event('input'));
            const successMsg = document.getElementById('form-success');
            if (successMsg) {
                successMsg.textContent = 'Thank you for your message! I\'ll get back to you soon.';
            }
        }

    });
};

function initQuoteGenerator() {
    const quoteBtn = document.getElementById('quote-btn');
    const quoteDisplay = document.getElementById('quote-display');

    if (!quoteBtn || !quoteDisplay) return;

    const quotes = [
        "The best way to predict the future is to create it. - Peter Drucker",
        "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
        "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
        "The harder you work for something, the greater you'll feel when you achieve it.",
        "Dream big and dare to fail. - Norman Vaughan",
        "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart. - Roy T. Bennett"
    ];

    let lastIndex = -1;

    function getRandomQuote() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * quotes.length);
        } while (randomIndex === lastIndex);
        lastIndex = randomIndex;
        return quotes[randomIndex];
    }


    function displayrandomQuote() {
        quoteDisplay.textContent = getRandomQuote();
    }

    quoteBtn.addEventListener('click', displayrandomQuote);
    displayrandomQuote();


}

function initCharacterCounter() {
    const messageInput = document.getElementById('message');
    const charCounter = document.getElementById('char-counter');
    if (!messageInput || !charCounter) return;

    const MAX_LENGTH = 300;

    function updateCharCount() {
        const currentLength = messageInput.value.length;
        charCounter.textContent = `${currentLength} / ${MAX_LENGTH} characters`;

        if (currentLength >= MAX_LENGTH) {
            charCounter.classList.add('char-counter-warning');
        } else {
            charCounter.classList.remove('char-counter-warning');
        }
    }

    messageInput.addEventListener('input', updateCharCount);
    updateCharCount();
}


function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        toggleBtn.textContent = '☀️';
    }

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        toggleBtn.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}


