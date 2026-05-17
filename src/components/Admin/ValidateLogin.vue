<template>
    <ion-page>
        <ion-content :fullscreen="true" class="ion-no-padding">
            <section class="validate-page">
                <button @click="handleBack" class="btn-back-float">
                    <ion-icon :icon="arrowBackOutline"></ion-icon>
                    <span>Volver</span>
                </button>

                <div class="validate-bg">
                    <div class="video-background">
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/nWVvt7fzVGw?autoplay=1&mute=1&loop=1&playlist=nWVvt7fzVGw&controls=0&showinfo=0&modestbranding=1&rel=0"
                            frameborder="0" allow="autoplay; encrypted-media" allowfullscreen loading="lazy"
                            title="Background video"></iframe>
                    </div>
                    <div class="gradient-overlay"></div>
                </div>

                <div class="validate-container">
                    <div class="validate-card" v-reveal="'fade-up'">
                        <div class="validate-header">
                            <div class="logo-wrapper" v-reveal="'scale-in-spring'">
                                <img src="/assets/images/logo-alevo.webp" alt="Alevo Sports" class="validate-logo" />
                            </div>
                            <div class="icon-shield" v-reveal="'scale-in'">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <h1 class="validate-title" v-reveal="'fade-up'">Verificación en Dos Pasos</h1>
                            <p class="validate-subtitle" v-reveal="'fade-up'">
                                Ingresa el código de 6 dígitos que enviamos a<br/>
                                <span class="email-highlight">{{ maskedEmail }}</span>
                            </p>
                        </div>

                        <form class="validate-form" @submit.prevent="handleVerify" v-reveal="'fade-up'">
                            <div class="otp-container">
                                <input
                                    v-for="(digit, index) in otpDigits"
                                    :key="index"
                                    :ref="el => setInputRef(el, index)"
                                    type="text"
                                    inputmode="numeric"
                                    maxlength="1"
                                    class="otp-input"
                                    :class="{
                                        'has-value': digit,
                                        'is-error': hasError && !digit,
                                        'is-filled': digit && !hasError
                                    }"
                                    :value="digit"
                                    @input="handleInput($event, index)"
                                    @keydown="handleKeydown($event, index)"
                                    @paste="handlePaste($event)"
                                    autocomplete="off"
                                />
                            </div>

                            <div v-if="otpError" class="otp-error-message">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                </svg>
                                {{ otpError }}
                            </div>

                            <button
                                type="submit"
                                class="btn-verify"
                                :disabled="!isOtpComplete || isLoading"
                                :class="{ 'loading': isLoading }"
                            >
                                <span v-if="!isLoading">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                                        <path d="M5 12l5 5L20 7" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    Verificar Código
                                </span>
                                <span v-else class="loader"></span>
                            </button>

                            <div class="resend-section">
                                <p class="resend-text">
                                    ¿No recibiste el código?
                                </p>
                                <button
                                    type="button"
                                    class="btn-resend"
                                    :disabled="countdown > 0 || isResending"
                                    @click="handleResend"
                                >
                                    <span v-if="countdown > 0">
                                        Reenviar en {{ countdown }}s
                                    </span>
                                    <span v-else-if="isResending" class="resend-loader"></span>
                                    <span v-else>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                                            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        Reenviar Código
                                    </span>
                                </button>
                            </div>
                        </form>

                        <div class="validate-footer" v-reveal="'fade-up'">
                            <p class="security-note">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                                </svg>
                                Tu conexión es segura y encriptada
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { IonPage, IonContent, IonIcon } from '@ionic/vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { arrowBackOutline } from 'ionicons/icons'
import { setStoredUser, type UserRole } from '../../composables/useAuth'

const route = useRoute()
const router = useRouter()

const props = defineProps<{
    email?: string
}>()

const emit = defineEmits<{
    verified: []
    back: []
}>()

const otpDigits = ref<string[]>(['', '', '', '', '', ''])
const otpError = ref('')
const hasError = ref(false)
const isLoading = ref(false)
const isResending = ref(false)
const countdown = ref(60)
const inputRefs = ref<(HTMLInputElement | null)[]>([])

let countdownInterval: ReturnType<typeof setInterval> | null = null

const userEmail = computed(() => {
    if (props.email) return props.email
    return (route.query.email as string) || localStorage.getItem('pendingVerificationEmail') || ''
})

const maskedEmail = computed(() => {
    const email = userEmail.value
    if (!email) return ''
    const [local, domain] = email.split('@')
    const masked = local.length > 2
        ? local[0] + '*'.repeat(Math.min(local.length - 2, 4)) + local.slice(-1)
        : local
    return masked + '@' + domain
})

const isOtpComplete = computed(() => {
    return otpDigits.value.every(d => d.length === 1)
})

const setInputRef = (el: HTMLInputElement | null, index: number) => {
    inputRefs.value[index] = el
}

const handleInput = (event: Event, index: number) => {
    const input = event.target as HTMLInputElement
    const value = input.value.replace(/\D/g, '').slice(-1)
    otpDigits.value[index] = value
    otpError.value = ''
    hasError.value = false

    if (value && index < 5) {
        const nextInput = inputRefs.value[index + 1]
        if (nextInput) nextInput.focus()
    }

    if (otpDigits.value.every(d => d.length === 1)) {
        setTimeout(handleVerify, 100)
    }
}

const handleKeydown = (event: KeyboardEvent, index: number) => {
    const input = event.target as HTMLInputElement

    if (event.key === 'Backspace' && !input.value && index > 0) {
        const prevInput = inputRefs.value[index - 1]
        if (prevInput) {
            prevInput.focus()
            prevInput.value = ''
            otpDigits.value[index - 1] = ''
        }
        event.preventDefault()
    }

    if (event.key === 'ArrowLeft' && index > 0) {
        inputRefs.value[index - 1]?.focus()
    }

    if (event.key === 'ArrowRight' && index < 5) {
        inputRefs.value[index + 1]?.focus()
    }
}

const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault()
    const pastedData = event.clipboardData?.getData('text') || ''
    const digits = pastedData.replace(/\D/g, '').slice(0, 6).split('')

    digits.forEach((digit, index) => {
        if (index < 6) {
            otpDigits.value[index] = digit
        }
    })

    const nextEmptyIndex = otpDigits.value.findIndex(d => !d)
    if (nextEmptyIndex !== -1) {
        inputRefs.value[nextEmptyIndex]?.focus()
    } else if (inputRefs.value[5]) {
        inputRefs.value[5].focus()
        setTimeout(handleVerify, 100)
    }
}

const startCountdown = () => {
    countdown.value = 60
    if (countdownInterval) clearInterval(countdownInterval)

    countdownInterval = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
            if (countdownInterval) clearInterval(countdownInterval)
        }
    }, 1000)
}

const handleResend = () => {
    if (countdown.value > 0 || !userEmail.value) return
    
    startCountdown()
    otpDigits.value = ['', '', '', '', '', '']
    otpError.value = ''
    inputRefs.value[0]?.focus()
}

const API_BASE_URL = 'http://localhost:3005/api'

const handleVerify = async () => {
    if (!isOtpComplete.value || !userEmail.value) return

    isLoading.value = true
    otpError.value = ''
    hasError.value = false

    const code = otpDigits.value.join('')

    try {
        const token = localStorage.getItem('token')
        const userFromStorage = localStorage.getItem('user')
        
        if (!token || !userFromStorage) {
            otpError.value = 'Sesión expirada. Por favor, inicia sesión nuevamente.'
            isLoading.value = false
            router.push('/admin/login')
            return
        }

        const userData = JSON.parse(userFromStorage)
        let tipo_usuario: UserRole = userData.rol || userData.tipo_usuario || 'admin'

        localStorage.removeItem('pendingVerificationEmail')

        setStoredUser({
            id: userData.id,
            email: userData.email,
            rol: tipo_usuario,
            tipo_usuario: tipo_usuario,
            nombre: userData.nombre || userData.nombres || 'Usuario'
        })

        router.push('/admin/dashboard/perfil')
        
    } catch (err) {
        console.error('Error en verificación:', err)
        otpError.value = 'Error al procesar la verificación. Intenta de nuevo.'
        isLoading.value = false
    }
}

const handleBack = () => {
    router.push('/admin/login')
}

onMounted(() => {
    if (!userEmail.value) {
        router.push('/admin/login')
        return
    }
    setTimeout(() => {
        inputRefs.value[0]?.focus()
    }, 500)
    startCountdown()
})

onUnmounted(() => {
    if (countdownInterval) clearInterval(countdownInterval)
})
</script>

<style scoped>
.validate-page {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-bg);
    overflow: hidden;
}

.validate-bg {
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
            rgba(9, 16, 34, 0.95) 0%,
            rgba(0, 0, 0, 0.97) 50%,
            rgba(207, 46, 46, 0.1) 100%);
}

.validate-container {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 480px;
    padding: var(--spacing-lg);
}

.validate-card {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(25px);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-3xl) var(--spacing-2xl);
    position: relative;
    transition: all 0.3s ease;
}

.validate-card::before {
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
    animation: led-paseo 2.5s linear infinite;
    pointer-events: none;
    z-index: 10;
    opacity: 0;
}

.validate-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 50px rgba(207, 46, 46, 0.4);
}

@keyframes led-paseo {
    0% { background-position: 0% 50%; box-shadow: 0 0 5px #cf2e2e, 0 0 10px #cf2e2e; opacity: 0; }
    50% { box-shadow: 0 0 15px #cf2e2e, 0 0 30px #cf2e2e; opacity: 1; }
    100% { background-position: 200% 50%; box-shadow: 0 0 5px #cf2e2e, 0 0 10px #cf2e2e; opacity: 0; }
}

.validate-header {
    text-align: center;
    margin-bottom: var(--spacing-xl);
}

.logo-wrapper {
    margin-bottom: -80px;
}

.validate-logo {
    height: 260px;
    width: auto;
    animation: logo-glow 3s ease-in-out infinite;
}

@keyframes logo-glow {
    0%, 100% { filter: drop-shadow(0 0 10px rgba(207, 46, 46, 0.3)); }
    50% { filter: drop-shadow(0 0 20px rgba(207, 46, 46, 0.6)); }
}

.icon-shield {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    margin-bottom: var(--spacing-md);
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(207, 46, 46, 0.2), rgba(207, 46, 46, 0.05));
    border: 2px solid rgba(207, 46, 46, 0.4);
    color: var(--color-primary);
    animation: pulse-glow 2s ease-in-out infinite;
}

.icon-shield svg {
    width: 32px;
    height: 32px;
}

@keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(207, 46, 46, 0.4); }
    50% { box-shadow: 0 0 20px 5px rgba(207, 46, 46, 0.2); }
}

.validate-title {
    font-family: var(--font-heading);
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--color-text);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: var(--spacing-sm);
}

.validate-subtitle {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--color-text-muted);
    line-height: 1.6;
}

.email-highlight {
    color: var(--color-primary);
    font-weight: 600;
}

.validate-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.otp-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: var(--spacing-md) 0;
}

.otp-input {
    width: 52px;
    height: 64px;
    text-align: center;
    font-family: var(--font-heading);
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--color-text);
    background: rgba(0, 0, 0, 0.5);
    border: 2px solid rgba(207, 46, 46, 0.3);
    border-radius: var(--border-radius);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    caret-color: var(--color-primary);
}

.otp-input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px rgba(207, 46, 46, 0.2), 0 0 20px rgba(207, 46, 46, 0.15);
    transform: scale(1.05);
}

.otp-input.has-value {
    border-color: rgba(207, 46, 46, 0.6);
    background: rgba(207, 46, 46, 0.1);
}

.otp-input.is-filled {
    border-color: var(--color-primary);
    background: linear-gradient(135deg, rgba(207, 46, 46, 0.15), rgba(207, 46, 46, 0.05));
    box-shadow: 0 0 10px rgba(207, 46, 46, 0.2);
}

.otp-input.is-error {
    border-color: #ff4444;
    animation: shake 0.5s ease;
    background: rgba(255, 68, 68, 0.1);
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-8px); }
    40%, 80% { transform: translateX(8px); }
}

.otp-error-message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: var(--spacing-sm);
    background: rgba(255, 68, 68, 0.1);
    border: 1px solid rgba(255, 68, 68, 0.3);
    border-radius: var(--border-radius);
    color: #ff6b6b;
    font-family: var(--font-body);
    font-size: 0.85rem;
    animation: fade-in 0.3s ease;
}

@keyframes fade-in {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
}

.btn-verify {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 16px;
    font-family: var(--font-heading);
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #fff;
    background: linear-gradient(135deg, #cf2e2e 0%, #e63939 100%);
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(207, 46, 46, 0.3);
}

.btn-verify:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(207, 46, 46, 0.5);
}

.btn-verify:active:not(:disabled) {
    transform: translateY(0);
}

.btn-verify:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.btn-verify.loading {
    pointer-events: none;
}

.btn-verify span {
    display: flex;
    align-items: center;
    gap: 8px;
}

.loader {
    width: 22px;
    height: 22px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.resend-section {
    text-align: center;
    padding-top: var(--spacing-md);
}

.resend-text {
    font-family: var(--font-body);
    font-size: 0.85rem;
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-sm);
}

.btn-resend {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    font-family: var(--font-heading);
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--color-primary);
    background: transparent;
    border: 1px solid rgba(207, 46, 46, 0.4);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-resend:hover:not(:disabled) {
    background: rgba(207, 46, 46, 0.1);
    border-color: var(--color-primary);
}

.btn-resend:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.resend-loader {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(207, 46, 46, 0.3);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

.validate-footer {
    margin-top: var(--spacing-xl);
    padding-top: var(--spacing-lg);
    border-top: 1px solid rgba(207, 46, 46, 0.15);
    text-align: center;
}

.security-note {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-body);
    font-size: 0.75rem;
    color: var(--color-text-muted);
    opacity: 0.7;
}

.btn-back-float {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    color: var(--color-text);
    font-family: var(--font-heading);
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.2s ease;
    cursor: pointer;
}

.btn-back-float ion-icon {
    font-size: 1.1rem;
    color: var(--color-primary);
}

.btn-back-float:hover {
    background: rgba(207, 46, 46, 0.15);
    border-color: var(--color-primary);
    transform: translateY(-2px);
}

@media (max-width: 480px) {
    .validate-card {
        padding: var(--spacing-xl) var(--spacing-md);
    }

    .validate-title {
        font-size: 1.3rem;
    }

    .otp-container {
        gap: 8px;
    }

    .otp-input {
        width: 44px;
        height: 54px;
        font-size: 1.5rem;
    }

    .validate-logo {
        height: 200px;
    }

    .btn-back-float {
        top: 12px;
        left: 12px;
        padding: 10px 12px;
    }

    .btn-back-float span {
        display: none;
    }

    .btn-back-float ion-icon {
        font-size: 1.3rem;
    }
}
</style>