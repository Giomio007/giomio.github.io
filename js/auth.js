document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Password toggle functionality
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input');
            const inputType = passwordInput.getAttribute('type');
            
            if (inputType === 'password') {
                passwordInput.setAttribute('type', 'text');
                this.classList.add('password-visible');
            } else {
                passwordInput.setAttribute('type', 'password');
                this.classList.remove('password-visible');
            }
        });
    });
    
    // Password strength evaluation
    if (registerForm) {
        const passwordInput = document.getElementById('password');
        const strengthMeter = document.querySelector('.strength-meter-fill');
        const strengthText = document.querySelector('.strength-text');
        
        passwordInput.addEventListener('input', evaluatePasswordStrength);
        
        // Password confirmation validation
        const confirmPasswordInput = document.getElementById('confirm-password');
        
        confirmPasswordInput.addEventListener('input', function() {
            if (passwordInput.value !== confirmPasswordInput.value) {
                confirmPasswordInput.classList.add('input-error');
                // Check if error message already exists
                let errorEl = confirmPasswordInput.parentElement.nextElementSibling;
                if (!errorEl || !errorEl.classList.contains('error-message')) {
                    errorEl = document.createElement('div');
                    errorEl.classList.add('error-message');
                    errorEl.textContent = 'Пароли не совпадают';
                    confirmPasswordInput.parentElement.after(errorEl);
                }
            } else {
                confirmPasswordInput.classList.remove('input-error');
                const errorEl = confirmPasswordInput.parentElement.nextElementSibling;
                if (errorEl && errorEl.classList.contains('error-message')) {
                    errorEl.remove();
                }
            }
        });
        
        // Form submission
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            const termsCheckbox = document.getElementById('terms');
            
            // Basic validation checks
            if (!fullname || !email || !password || !confirmPassword) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Пароли не совпадают');
                return;
            }
            
            if (!termsCheckbox.checked) {
                alert('Пожалуйста, примите условия использования');
                return;
            }
            
            // Frontend validation successful, simulate registration success
            // In a real app, this would make an API call to register the user
            
            // For demo purposes, save user in local storage
            const user = {
                fullname: fullname,
                email: email,
                password: password // In a real app, never store passwords in local storage
            };
            
            localStorage.setItem('demoUser', JSON.stringify(user));
            
            // Redirect to login page
            alert('Регистрация успешна! Теперь вы можете войти в систему.');
            window.location.href = 'login.html';
        });
    }
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember') ? document.getElementById('remember').checked : false;
            
            // Simple validation
            if (!email || !password) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
            
            // Frontend validation successful, simulate login
            // In a real app, this would make an API call to authenticate the user
            
            // For demo purposes, check against local storage
            const storedUser = localStorage.getItem('demoUser') ? JSON.parse(localStorage.getItem('demoUser')) : null;
            
            if (storedUser && storedUser.email === email && storedUser.password === password) {
                // Login successful
                if (rememberMe) {
                    localStorage.setItem('demoLoggedIn', 'true');
                } else {
                    sessionStorage.setItem('demoLoggedIn', 'true');
                }
                
                // Redirect to profile page
                window.location.href = 'profile.html';
            } else {
                // Check if we have a demo user
                if (!storedUser) {
                    // Create a demo user for easier testing
                    const demoUser = {
                        fullname: 'Иван Петров',
                        email: 'demo@example.com',
                        password: 'password123'
                    };
                    localStorage.setItem('demoUser', JSON.stringify(demoUser));
                    
                    alert('Для демо-версии, используйте следующие данные:\nEmail: demo@example.com\nПароль: password123');
                } else {
                    alert('Неверный email или пароль');
                }
            }
        });
    }
});

function evaluatePasswordStrength() {
    const password = this.value;
    const strengthMeter = document.querySelector('.strength-meter-fill');
    const strengthText = document.querySelector('.strength-text');
    
    // Define password strength criteria
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[^A-Za-z0-9]/.test(password);
    const isLongEnough = password.length >= 8;
    
    // Calculate strength score (0-4)
    let strength = 0;
    if (hasLowerCase) strength++;
    if (hasUpperCase) strength++;
    if (hasNumbers) strength++;
    if (hasSpecialChars) strength++;
    if (isLongEnough) strength++;
    
    // Update strength meter
    let percentage = (strength / 5) * 100;
    strengthMeter.style.width = `${percentage}%`;
    
    // Update strength text and color
    if (password.length === 0) {
        strengthMeter.style.backgroundColor = '#e0e0e0';
        strengthText.textContent = 'Введите пароль';
        return;
    }
    
    if (strength <= 2) {
        strengthMeter.style.backgroundColor = '#e74c3c';
        strengthText.textContent = 'Слабый пароль';
    } else if (strength <= 4) {
        strengthMeter.style.backgroundColor = '#f39c12';
        strengthText.textContent = 'Средний пароль';
    } else {
        strengthMeter.style.backgroundColor = '#27ae60';
        strengthText.textContent = 'Сильный пароль';
    }
}