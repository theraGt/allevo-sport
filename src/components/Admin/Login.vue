<template>
    <section class="login-page">
        <div class="login-bg">
            <div class="video-background">
                <iframe
                    src="https://www.youtube.com/embed/nWVvt7fzVGw?autoplay=1&mute=1&loop=1&playlist=nWVvt7fzVGw&controls=0&showinfo=0&modestbranding=1"
                    frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
            <div class="gradient-overlay"></div>
        </div>

        <div class="login-container">
            <div class="login-card" v-reveal="'fade-up'">
                <div class="login-header">
                    <div class="logo-wrapper" v-reveal="'scale-in-spring'">
                        <img src="/assets/images/logo-alevo.webp" alt="Alevo Sports" class="login-logo" />
                    </div>
                    <h1 class="login-title" v-reveal="'fade-up'">Panel Admin</h1>
                    <p class="login-subtitle" v-reveal="'fade-up'">Accede al sistema de gestión</p>
                </div>

                <form class="login-form" @submit.prevent="handleLogin" v-reveal="'fade-up'">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input id="email" type="email" v-model="email" @blur="validateEmail" @input="clearEmailError"
                            :class="{ 'has-error': emailError, 'is-valid': emailValid }"
                            placeholder="admin@alevo.com" />
                        <span v-if="emailError" class="error-message">{{ emailError }}</span>
                    </div>

                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <div class="password-wrapper">
                            <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password"
                                @blur="validatePassword" @input="clearPasswordError"
                                :class="{ 'has-error': passwordError, 'is-valid': passwordValid }"
                                placeholder="••••••••" />
                            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                                    fill="currentColor">
                                    <path
                                        d="M288 32c-80.8 0-156.2 27.7-213.9 81.4L51.3 136c-5.3-4-10.7-6.4-16.2-6.4C20.3 129.6 0 149.9 0 171.2c0 16.4 10.1 30.9 24.5 36.5l145.5 116.3c17.4 13.9 38.2 22.3 59.8 22.3s42.4-8.4 59.8-22.3l129.1-103c4.8-3.8 10.7-5.9 16.7-5.9 22.5 0 40.8 18.2 40.8 40.8 0 20.6-15.4 37.2-35.2 40.6-5.3.9-10.7.8-16 .1l-136.6-109.3C280.4 212.1 336 182.8 336 144c0-43.6-31.4-79.8-72.6-88.6-4.1-.9-8.2-1.3-12.4-1.3zm280.5 171.2c-1.8 20.1-13.6 37.3-32.8 44.6l-104.4 83.5c22.2 15.8 48.2 23.7 72.6 23.7s50.4-7.9 72.6-23.7l91.1-73c27.5-22 43.3-54.3 43.3-89 0-22.6-6.4-44.5-18.2-63.1L470.9 161C518.7 206.6 512 267.2 512 328c0 79.4-64.6 144-144 144zM144 224c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96 0c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96 0c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24z" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                                    fill="currentColor">
                                    <path
                                        d="M288 80c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm-96 0c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm-96 0c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zM288 32c-80.8 0-156.2 27.7-213.9 81.4L51.3 136c-5.3-4-10.7-6.4-16.2-6.4C20.3 129.6 0 149.9 0 171.2c0 16.4 10.1 30.9 24.5 36.5l145.5 116.3c17.4 13.9 38.2 22.3 59.8 22.3s42.4-8.4 59.8-22.3l129.1-103c33.1-26.5 57.3-60.7 71.1-100.2-36.1-21.1-80.1-33.1-126.9-33.1zM480 384c-39.6 0-78.4 12.8-111.1 34.9l-94.3 75.4c27.1 18.2 58.8 28.6 90.8 28.6s63.7-10.4 90.8-28.6l68.8-55c8.5-6.8 13.9-16.2 15.3-26.4-19.9-21.8-46.5-39.6-75.6-49.1-4.9-1.6-9.9-2.6-15-2.9l-16-12.8c.8-2.3 1.4-4.7 1.9-7.1 2-10.6 3-21.5 3-32.5 0-60.5-34.7-110.7-80.6-127.3-11-4-22.6-6.4-34.3-6.4-7.9 0-15.6.8-23.1 2.3C245.4 166.3 208.6 192 176 224c-39.6 38.8-62.1 91.3-62.1 147.2 0 52.3 23 98.3 60.6 132.6l-84.5 67.6C42.4 505.4 0 447.3 0 384 0 273.7 112.8 181.3 277.3 144c8.4-2.5 17.1-3.8 26-3.8 18.3 0 35.6 3.7 51.7 10.6C402.7 179.3 440.8 224 480 224c48.2 0 91.5-18.8 125.2-50.6-6.3-5.6-13.2-12.5-20.3-20.8-1.3-1.5-2.7-3.1-4-4.7-27.1-33.1-64.5-59.1-107.9-71.6C436.8 61.7 362.6 32 288 32z" />
                                </svg>
                            </button>
                        </div>
                        <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
                    </div>

                    <button type="submit" class="btn-primary login-btn" :disabled="!isFormValid || isLoading"
                        :class="{ 'loading': isLoading }">
                        <span v-if="!isLoading">Iniciar Sesión</span>
                        <span v-else class="loader"></span>
                    </button>

                    <div v-if="loginError" class="login-error">
                        {{ loginError }}
                    </div>
                </form>

                <div class="login-footer" v-reveal="'fade-up'">
                    <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const loginError = ref('')

const emailError = ref('')
const passwordError = ref('')

const emailValid = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email.value)
})

const passwordValid = computed(() => {
    return password.value.length >= 6
})

const isFormValid = computed(() => {
    return emailValid.value && passwordValid.value && email.value.length > 0 && password.value.length > 0
})

const validateEmail = () => {
    if (!email.value) {
        emailError.value = 'El email es requerido'
    } else if (!emailValid.value) {
        emailError.value = 'Ingresa un email válido'
    } else {
        emailError.value = ''
    }
}

const validatePassword = () => {
    if (!password.value) {
        passwordError.value = 'La contraseña es requerida'
    } else if (password.value.length < 6) {
        passwordError.value = 'Mínimo 6 caracteres'
    } else {
        passwordError.value = ''
    }
}

const clearEmailError = () => {
    emailError.value = ''
}

const clearPasswordError = () => {
    passwordError.value = ''
}

const handleLogin = async () => {
    validateEmail()
    validatePassword()

    if (emailError.value || passwordError.value) return

    isLoading.value = true
    loginError.value = ''

    await new Promise(resolve => setTimeout(resolve, 1500))

    if (email.value === 'admin@allevo.com' && password.value === 'admin123') {
        window.location.href = '/admin/dashboard/overview'
    } else {
        loginError.value = 'Credenciales incorrectas. Intenta de nuevo.'
        isLoading.value = false
    }
}
</script>

<style scoped>
.login-page {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-bg);
    overflow: hidden;
}

.login-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
}

.video-background {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100vw;
    min-height: 100vh;
    width: 100vw;
    height: 100vh;
    transform: translate(-50%, -50%);
}

.video-background iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200vw;
    height: 200vh;
    transform: translate(-50%, -50%);
    pointer-events: none;
    object-fit: cover;
}

.gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg,
            rgba(9, 16, 34, 0.92) 0%,
            rgba(0, 0, 0, 0.95) 50%,
            rgba(207, 46, 46, 0.08) 100%);
}

.login-container {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 440px;
    padding: var(--spacing-lg);
}

.login-card {
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(20px);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-3xl) var(--spacing-2xl);
    position: relative;
    transition: all 0.3s ease;
}

.login-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--border-radius-lg);
    padding: 2px;
    background: linear-gradient(90deg, #cf2e2e 0%, #cf2e2e 25%, #e63939 50%, #cf2e2e 75%, #cf2e2e 100%);
    background-size: 200% 100%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: led-paseo 2s linear infinite;
    pointer-events: none;
    z-index: 10;
    opacity: 0;
}

.login-card::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--border-radius-lg);
    padding: 2px;
    background: linear-gradient(90deg, transparent 0%, transparent 45%, #cf2e2e 45%, #cf2e2e 55%, transparent 55%, transparent 100%);
    background-size: 200% 100%;
    background-position: 100% 0;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: draw-border 3s linear infinite;
    pointer-events: none;
    z-index: 10;
}

@keyframes led-paseo {
    0% {
        background-position: 0% 50%;
        box-shadow: 0 0 5px #cf2e2e, 0 0 10px #cf2e2e, inset 0 0 5px rgba(207, 46, 46, 0.3);
        opacity: 0;
    }

    50% {
        box-shadow: 0 0 15px #cf2e2e, 0 0 25px #cf2e2e, inset 0 0 10px rgba(207, 46, 46, 0.5);
        opacity: 1;
    }

    100% {
        background-position: 200% 50%;
        box-shadow: 0 0 5px #cf2e2e, 0 0 10px #cf2e2e, inset 0 0 5px rgba(207, 46, 46, 0.3);
        opacity: 0;
    }
}

@keyframes draw-border {
    0% {
        background-position: 100% 0;
    }

    100% {
        background-position: -100% 0;
    }
}

.login-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(207, 46, 46, 0.4);
}

.login-header {
    text-align: center;
    margin-bottom: var(--spacing-xl);
}

.logo-wrapper {
    margin-bottom: -80px;
}

.login-logo {
    height: 280px;
    position: relative;
    width: auto;
    animation: logo-glow 3s ease-in-out infinite;
}

@keyframes logo-glow {

    0%,
    100% {
        filter: drop-shadow(0 0 10px rgba(207, 46, 46, 0.3));
    }

    50% {
        filter: drop-shadow(0 0 20px rgba(207, 46, 46, 0.6));
    }
}

.login-title {
    font-family: var(--font-heading);
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: var(--spacing-xs);
}

.login-subtitle {
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: var(--color-text-muted);
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.form-group label {
    font-family: var(--font-heading);
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.form-group input {
    width: 100%;
    padding: 14px 16px;
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--color-text);
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(207, 46, 46, 0.3);
    border-radius: var(--border-radius);
    transition: all var(--transition-fast);
}

.form-group input::placeholder {
    color: var(--color-text-muted);
    opacity: 0.6;
}

.form-group input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(207, 46, 46, 0.15);
}

.form-group input.has-error {
    border-color: #ff4444;
    animation: shake 0.4s ease;
}

.form-group input.is-valid {
    border-color: #44ff44;
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    20%,
    60% {
        transform: translateX(-5px);
    }

    40%,
    80% {
        transform: translateX(5px);
    }
}

.error-message {
    font-family: var(--font-body);
    font-size: 0.8rem;
    color: #ff6b6b;
    animation: fade-in 0.3s ease;
}

.password-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.password-wrapper input {
    padding-right: 48px;
}

.toggle-password {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color var(--transition-fast);
}

.toggle-password:hover {
    color: var(--color-primary);
}

.toggle-password svg {
    width: 20px;
    height: 20px;
}

.login-btn {
    width: 100%;
    padding: 16px;
    font-size: 1rem;
    margin-top: var(--spacing-sm);
}

.login-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.login-btn.loading {
    pointer-events: none;
}

.loader {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.login-error {
    text-align: center;
    padding: var(--spacing-sm);
    background: rgba(255, 68, 68, 0.1);
    border: 1px solid rgba(255, 68, 68, 0.3);
    border-radius: var(--border-radius);
    color: #ff6b6b;
    font-family: var(--font-body);
    font-size: 0.9rem;
    animation: shake 0.4s ease, fade-in 0.3s ease;
}

.login-footer {
    margin-top: var(--spacing-lg);
    text-align: center;
    padding-top: var(--spacing-lg);
    border-top: 1px solid rgba(207, 46, 46, 0.15);
}

.forgot-link {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color var(--transition-fast);
}

.forgot-link:hover {
    color: var(--color-primary);
    text-decoration: underline;
}

@media (max-width: 480px) {
    .login-card {
        padding: var(--spacing-xl) var(--spacing-md);
    }

    .login-title {
        font-size: 1.5rem;
    }

    .sport-icon {
        font-size: 3rem;
    }
}
</style>