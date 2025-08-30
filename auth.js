// Authentication JavaScript

// Mobile Navigation Toggle (reused from main script)
const hamburger = document.querySelector('.hamburger');
const navCenter = document.querySelector('.nav-center');

if (hamburger && navCenter) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navCenter.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navCenter.classList.remove('active');
        });
    });
}

// Password Toggle Functionality
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.parentElement.querySelector('.password-toggle i');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggle.classList.remove('fa-eye');
        toggle.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        toggle.classList.remove('fa-eye-slash');
        toggle.classList.add('fa-eye');
    }
}

// Password Strength Checker
function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = [];

    // Length check
    if (password.length >= 8) strength += 1;
    else feedback.push('At least 8 characters');

    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 1;
    else feedback.push('One uppercase letter');

    // Lowercase check
    if (/[a-z]/.test(password)) strength += 1;
    else feedback.push('One lowercase letter');

    // Number check
    if (/\d/.test(password)) strength += 1;
    else feedback.push('One number');

    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    else feedback.push('One special character');

    return { strength, feedback };
}

// Update password strength indicator
function updatePasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthBar || !strengthText) return;

    const { strength, feedback } = checkPasswordStrength(password);
    const percentage = (strength / 5) * 100;
    
    strengthBar.style.width = percentage + '%';
    
    if (strength <= 2) {
        strengthBar.style.background = '#ef4444';
        strengthText.textContent = 'Weak password';
        strengthText.style.color = '#ef4444';
    } else if (strength <= 3) {
        strengthBar.style.background = '#f59e0b';
        strengthText.textContent = 'Fair password';
        strengthText.style.color = '#f59e0b';
    } else if (strength <= 4) {
        strengthBar.style.background = '#10b981';
        strengthText.textContent = 'Good password';
        strengthText.style.color = '#10b981';
    } else {
        strengthBar.style.background = '#059669';
        strengthText.textContent = 'Strong password';
        strengthText.style.color = '#059669';
    }
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');
        const remember = formData.get('remember');
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate successful login
            alert('Login successful! Welcome back to Safe Wear System.');
            
            // Redirect to dashboard (or main page for demo)
            window.location.href = 'index.html';
            
        } catch (error) {
            alert('Login failed. Please check your credentials and try again.');
        } finally {
            // Reset button state
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// Signup Form Handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    const passwordInput = signupForm.querySelector('#password');
    const confirmPasswordInput = signupForm.querySelector('#confirmPassword');
    
    // Password strength checking
    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            updatePasswordStrength(e.target.value);
            validatePasswordMatch();
        });
    }
    
    // Password confirmation validation
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', validatePasswordMatch);
    }
    
    function validatePasswordMatch() {
        if (!passwordInput || !confirmPasswordInput) return;
        
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword && password !== confirmPassword) {
            confirmPasswordInput.setCustomValidity('Passwords do not match');
            confirmPasswordInput.style.borderColor = '#ef4444';
        } else {
            confirmPasswordInput.setCustomValidity('');
            confirmPasswordInput.style.borderColor = '#e5e7eb';
        }
    }
    
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = signupForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Validate passwords match
        const password = signupForm.querySelector('#password').value;
        const confirmPassword = signupForm.querySelector('#confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match. Please check and try again.');
            return;
        }
        
        // Check password strength
        const { strength } = checkPasswordStrength(password);
        if (strength < 3) {
            alert('Please choose a stronger password with at least 8 characters, including uppercase, lowercase, and numbers.');
            return;
        }
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(signupForm);
        const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            password: formData.get('password'),
            terms: formData.get('terms'),
            newsletter: formData.get('newsletter')
        };
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2500));
            
            // Simulate successful signup
            alert('Account created successfully! Welcome to Safe Wear System.');
            
            // Redirect to login or dashboard
            window.location.href = 'login.html';
            
        } catch (error) {
            alert('Signup failed. Please try again or contact support.');
        } finally {
            // Reset button state
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// Social Login Handlers
document.querySelectorAll('.btn-social').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const provider = btn.classList.contains('btn-google') ? 'Google' : 'Apple';
        alert(`${provider} authentication would be implemented here. This is a demo version.`);
    });
});

// Forgot Password Handler
const forgotPasswordLink = document.querySelector('.forgot-password');
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = prompt('Please enter your email address to reset your password:');
        if (email) {
            alert(`Password reset instructions have been sent to ${email}. Please check your inbox.`);
        }
    });
}

// Form Input Animations
document.querySelectorAll('.input-wrapper input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
    
    // Check if input has value on page load
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Authentication page loaded successfully! 🔐');
    
    // Add smooth transitions
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});