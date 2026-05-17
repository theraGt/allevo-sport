<template>
    <ion-page>
        <ion-content :fullscreen="true" class="ion-padding">
            <section class="profile-page">
                <header class="profile-header" v-reveal="'fade-up'">
                    <button @click="goBack" class="btn-back">
                        <ion-icon :icon="arrowBackOutline"></ion-icon>
                        <span>Volver</span>
                    </button>
                    <div class="page-title">
                        <ion-icon :icon="personCircleOutline"></ion-icon>
                        <h1>Mi Perfil</h1>
                    </div>
                </header>

                <div class="profile-content">
                    <div class="profile-avatar-section" v-reveal="'scale-in'">
                        <div class="avatar-wrapper">
                            <div class="avatar">{{ userData.avatar }}</div>
                            <button class="avatar-edit-btn" title="Cambiar foto">
                                <ion-icon :icon="cameraOutline"></ion-icon>
                            </button>
                        </div>
                        <div class="avatar-info">
                            <h2 class="user-name">{{ userData.nombre }}</h2>
                            <div class="user-meta">
                                <span class="user-role">
                                    <ion-icon :icon="shieldOutline"></ion-icon>
                                    {{ userData.rol }}
                                </span>
                                <span class="user-email">
                                    <ion-icon :icon="mailOutline"></ion-icon>
                                    {{ userData.email }}
                                </span>
                                <span class="user-since">
                                    <ion-icon :icon="calendarOutline"></ion-icon>
                                    Miembro desde {{ userData.fechaRegistro }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="sections-container">
                        <div class="section-card" v-reveal="'fade-up'">
                            <div class="section-header">
                                <ion-icon :icon="personOutline" class="section-icon"></ion-icon>
                                <h3>Datos Personales</h3>
                            </div>
                            <div class="section-body">
                                <div class="data-grid">
                                    <div class="data-item">
                                        <label>Nombre Completo</label>
                                        <div class="data-value">
                                            <ion-icon :icon="personOutline"></ion-icon>
                                            <span>{{ userData.nombre }}</span>
                                        </div>
                                    </div>
                                    <div class="data-item">
                                        <label>Correo Electrónico</label>
                                        <div class="data-value">
                                            <ion-icon :icon="mailOutline"></ion-icon>
                                            <span>{{ userData.email }}</span>
                                        </div>
                                    </div>
                                    <div class="data-item">
                                        <label>Teléfono</label>
                                        <div class="data-value">
                                            <ion-icon :icon="callOutline"></ion-icon>
                                            <span>{{ userData.telefono }}</span>
                                        </div>
                                    </div>
                                    <div class="data-item">
                                        <label>Fecha de Nacimiento</label>
                                        <div class="data-value">
                                            <ion-icon :icon="calendarOutline"></ion-icon>
                                            <span>{{ userData.fechaNacimiento }}</span>
                                        </div>
                                    </div>
                                    <div class="data-item">
                                        <label>Ciudad</label>
                                        <div class="data-value">
                                            <ion-icon :icon="locationOutline"></ion-icon>
                                            <span>{{ userData.ciudad }}, {{ userData.departamento }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="section-card" v-reveal="'fade-up'">
                            <div class="section-header">
                                <ion-icon :icon="keyOutline" class="section-icon"></ion-icon>
                                <h3>Cambiar Contraseña</h3>
                            </div>
                            <div class="section-body">
                                <form @submit.prevent="handlePasswordChange" class="password-form">
                                    <div class="form-field" :class="{ focused: focusedField === 'currentPassword', error: passwordErrors.currentPassword }">
                                        <label>Contraseña Actual</label>
                                        <div class="input-wrap">
                                            <ion-icon :icon="lockClosedOutline" class="field-icon"></ion-icon>
                                            <input
                                                :type="showCurrentPassword ? 'text' : 'password'"
                                                v-model="passwordForm.currentPassword"
                                                placeholder="Ingresa tu contraseña actual"
                                                @focus="focusedField = 'currentPassword'"
                                                @blur="focusedField = null"
                                            />
                                            <button type="button" class="toggle-visibility" @click="showCurrentPassword = !showCurrentPassword">
                                                <ion-icon :icon="showCurrentPassword ? eyeOffOutline : eyeOutline"></ion-icon>
                                            </button>
                                        </div>
                                        <span v-if="passwordErrors.currentPassword" class="field-error">{{ passwordErrors.currentPassword }}</span>
                                    </div>

                                    <div class="form-field" :class="{ focused: focusedField === 'newPassword', error: passwordErrors.newPassword }">
                                        <label>Nueva Contraseña</label>
                                        <div class="input-wrap">
                                            <ion-icon :icon="keyOutline" class="field-icon"></ion-icon>
                                            <input
                                                :type="showNewPassword ? 'text' : 'password'"
                                                v-model="passwordForm.newPassword"
                                                placeholder="Mínimo 8 caracteres"
                                                @focus="focusedField = 'newPassword'"
                                                @blur="focusedField = null"
                                            />
                                            <button type="button" class="toggle-visibility" @click="showNewPassword = !showNewPassword">
                                                <ion-icon :icon="showNewPassword ? eyeOffOutline : eyeOutline"></ion-icon>
                                            </button>
                                        </div>
                                        <div v-if="passwordForm.newPassword" class="password-strength">
                                            <div class="strength-bar">
                                                <div class="strength-fill" :class="passwordStrength.class" :style="{ width: passwordStrength.width }"></div>
                                            </div>
                                            <span class="strength-label" :class="passwordStrength.class">{{ passwordStrength.label }}</span>
                                        </div>
                                        <span v-if="passwordErrors.newPassword" class="field-error">{{ passwordErrors.newPassword }}</span>
                                    </div>

                                    <div class="form-field" :class="{ focused: focusedField === 'confirmPassword', error: passwordErrors.confirmPassword }">
                                        <label>Confirmar Nueva Contraseña</label>
                                        <div class="input-wrap">
                                            <ion-icon :icon="keyOutline" class="field-icon"></ion-icon>
                                            <input
                                                :type="showConfirmPassword ? 'text' : 'password'"
                                                v-model="passwordForm.confirmPassword"
                                                placeholder="Repite la nueva contraseña"
                                                @focus="focusedField = 'confirmPassword'"
                                                @blur="focusedField = null"
                                            />
                                            <button type="button" class="toggle-visibility" @click="showConfirmPassword = !showConfirmPassword">
                                                <ion-icon :icon="showConfirmPassword ? eyeOffOutline : eyeOutline"></ion-icon>
                                            </button>
                                        </div>
                                        <span v-if="passwordErrors.confirmPassword" class="field-error">{{ passwordErrors.confirmPassword }}</span>
                                    </div>

                                    <div class="password-requirements">
                                        <p class="requirements-title">La contraseña debe incluir:</p>
                                        <ul class="requirements-list">
                                            <li :class="{ met: hasMinLength }">
                                                <ion-icon :icon="hasMinLength ? checkmarkCircleOutline : ellipseOutline"></ion-icon>
                                                Al menos 8 caracteres
                                            </li>
                                            <li :class="{ met: hasUppercase }">
                                                <ion-icon :icon="hasUppercase ? checkmarkCircleOutline : ellipseOutline"></ion-icon>
                                                Una letra mayúscula
                                            </li>
                                            <li :class="{ met: hasLowercase }">
                                                <ion-icon :icon="hasLowercase ? checkmarkCircleOutline : ellipseOutline"></ion-icon>
                                                Una letra minúscula
                                            </li>
                                            <li :class="{ met: hasNumber }">
                                                <ion-icon :icon="hasNumber ? checkmarkCircleOutline : ellipseOutline"></ion-icon>
                                                Un número
                                            </li>
                                        </ul>
                                    </div>

                                    <button
                                        type="submit"
                                        class="btn-submit"
                                        :disabled="isChangingPassword || !isPasswordFormValid"
                                        :class="{ loading: isChangingPassword }"
                                    >
                                        <span v-if="!isChangingPassword">
                                            <ion-icon :icon="saveOutline"></ion-icon>
                                            Cambiar Contraseña
                                        </span>
                                        <span v-else class="loader"></span>
                                    </button>

                                    <div v-if="passwordSuccess" class="success-message">
                                        <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
                                        ¡Contraseña actualizada correctamente!
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="section-card" v-reveal="'fade-up'">
                            <div class="section-header">
                                <ion-icon :icon="cardOutline" class="section-icon"></ion-icon>
                                <h3>Datos Bancarios</h3>
                                <button class="btn-edit-section" @click="toggleBankEdit">
                                    <ion-icon :icon="pencilOutline"></ion-icon>
                                    <span>{{ isEditingBank ? 'Cancelar' : 'Editar' }}</span>
                                </button>
                            </div>
                            <div class="section-body">
                                <div class="data-grid">
                                    <div class="data-item">
                                        <label>Banco</label>
                                        <div class="data-value" v-if="!isEditingBank">
                                            <ion-icon :icon="businessOutline"></ion-icon>
                                            <span>{{ bankData.banco }}</span>
                                        </div>
                                        <div v-else class="input-wrap">
                                            <ion-icon :icon="businessOutline" class="field-icon"></ion-icon>
                                            <select v-model="bankData.banco">
                                                <option value="Industrial">Banco Industrial</option>
                                                <option value="GyT">Banco G&T Continental</option>
                                                <option value="Banrural">Banrural</option>
                                                <option value="Agromercantil">BAM</option>
                                                <option value="Promerica">Promerica</option>
                                                <option value="Ficohsa">Ficohsa</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="data-item">
                                        <label>Tipo de Cuenta</label>
                                        <div class="data-value" v-if="!isEditingBank">
                                            <ion-icon :icon="walletOutline"></ion-icon>
                                            <span>{{ bankData.tipoCuenta }}</span>
                                        </div>
                                        <div v-else class="input-wrap">
                                            <ion-icon :icon="walletOutline" class="field-icon"></ion-icon>
                                            <select v-model="bankData.tipoCuenta">
                                                <option value="Monetaria">Monetaria</option>
                                                <option value="Ahorro">Ahorro</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="data-item wide">
                                        <label>Número de Cuenta</label>
                                        <div class="data-value">
                                            <ion-icon :icon="cardOutline"></ion-icon>
                                            <span>{{ bankData.numeroCuenta }}</span>
                                        </div>
                                    </div>
                                </div>
                                <button v-if="isEditingBank" class="btn-submit btn-save" @click="saveBankData">
                                    <ion-icon :icon="saveOutline"></ion-icon>
                                    Guardar Datos Bancarios
                                </button>
                            </div>
                        </div>

                        <div class="section-card" v-reveal="'fade-up'">
                            <div class="section-header">
                                <ion-icon :icon="receiptOutline" class="section-icon"></ion-icon>
                                <h3>Datos Fiscales</h3>
                                <button class="btn-edit-section" @click="toggleFiscalEdit">
                                    <ion-icon :icon="pencilOutline"></ion-icon>
                                    <span>{{ isEditingFiscal ? 'Cancelar' : 'Editar' }}</span>
                                </button>
                            </div>
                            <div class="section-body">
                                <div class="data-grid">
                                    <div class="data-item">
                                        <label>Empresa / Razón Social</label>
                                        <div class="data-value" v-if="!isEditingFiscal">
                                            <ion-icon :icon="businessOutline"></ion-icon>
                                            <span>{{ fiscalData.empresa }}</span>
                                        </div>
                                        <div v-else class="input-wrap">
                                            <ion-icon :icon="businessOutline" class="field-icon"></ion-icon>
                                            <input type="text" v-model="fiscalData.empresa" />
                                        </div>
                                    </div>
                                    <div class="data-item">
                                        <label>NIT</label>
                                        <div class="data-value" v-if="!isEditingFiscal">
                                            <ion-icon :icon="documentTextOutline"></ion-icon>
                                            <span>{{ fiscalData.nit }}</span>
                                        </div>
                                        <div v-else class="input-wrap">
                                            <ion-icon :icon="documentTextOutline" class="field-icon"></ion-icon>
                                            <input type="text" v-model="fiscalData.nit" placeholder="12345678-9" />
                                        </div>
                                    </div>
                                    <div class="data-item wide">
                                        <label>Información de Facturación</label>
                                        <div class="data-value" v-if="!isEditingFiscal">
                                            <ion-icon :icon="locationOutline"></ion-icon>
                                            <span>{{ fiscalData.infoFacturacion }}</span>
                                        </div>
                                        <div v-else class="input-wrap textarea-wrap">
                                            <textarea v-model="fiscalData.infoFacturacion" rows="2"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <button v-if="isEditingFiscal" class="btn-submit btn-save" @click="saveFiscalData">
                                    <ion-icon :icon="saveOutline"></ion-icon>
                                    Guardar Datos Fiscales
                                </button>
                            </div>
                        </div>

                        <div class="section-card danger-zone" v-reveal="'fade-up'">
                            <div class="section-header">
                                <ion-icon :icon="settingsOutline" class="section-icon"></ion-icon>
                                <h3>Configuración de Cuenta</h3>
                            </div>
                            <div class="section-body">
                                <div class="danger-actions">
                                    <button class="btn-danger" @click="handleLogout">
                                        <ion-icon :icon="logOutOutline"></ion-icon>
                                        <span>Cerrar Sesión</span>
                                    </button>
                                    <button class="btn-danger btn-delete" @click="confirmDeleteAccount">
                                        <ion-icon :icon="trashOutline"></ion-icon>
                                        <span>Eliminar Cuenta</span>
                                    </button>
                                </div>
                                <p class="danger-warning">
                                    <ion-icon :icon="warningOutline"></ion-icon>
                                    La eliminación de cuenta es irreversible. Perderás acceso a todos tus datos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { IonPage, IonContent, IonIcon } from '@ionic/vue'
import { useRouter } from 'vue-router'
import { getUserRole, getStoredUser } from '../../composables/useAuth'
import type { UserRole } from '../../composables/useAuth'
import {
    arrowBackOutline,
    personCircleOutline,
    personOutline,
    mailOutline,
    callOutline,
    calendarOutline,
    locationOutline,
    shieldOutline,
    keyOutline,
    lockClosedOutline,
    eyeOutline,
    eyeOffOutline,
    cameraOutline,
    createOutline,
    pencilOutline,
    saveOutline,
    
    checkmarkCircleOutline,
    ellipseOutline,
    businessOutline,
    walletOutline,
    cardOutline,
    receiptOutline,
    documentTextOutline,
    logOutOutline,
    trashOutline,
    settingsOutline,
    warningOutline,
    constructOutline
} from 'ionicons/icons'

const router = useRouter()

const getDashboardHome = (role: UserRole | null): string => {
    switch (role) {
        case 'super_admin':
        case 'inversionista':
            return '/admin/dashboard/overview'
        case 'admin':
            return '/admin/dashboard/noticias'
        case 'talento':
            return '/admin/dashboard/perfil'
        default:
            return '/admin/dashboard/overview'
    }
}

const goBack = () => {
    const role = getUserRole()
    router.push(getDashboardHome(role))
}

const focusedField = ref<string | null>(null)

const API_BASE_URL = 'http://localhost:3005/api'

const storedUser = getStoredUser()

const userData = ref({
    nombre: storedUser?.nombres && storedUser?.apellidos 
        ? `${storedUser.nombres} ${storedUser.apellidos}` 
        : storedUser?.nombre || storedUser?.email || 'Usuario',
    email: storedUser?.email || '',
    telefono: storedUser?.telefono || 'No registrado',
    fechaNacimiento: storedUser?.fecha_nacimiento || 'No registrado',
    ciudad: storedUser?.ciudad || 'No registrado',
    departamento: storedUser?.pais || 'No registrado',
    rol: storedUser?.tipo_usuario === 'super_admin' ? 'Super Administrador' : 
        storedUser?.tipo_usuario === 'admin' ? 'Administrador' : 
        storedUser?.tipo_usuario || 'Usuario',
    fechaRegistro: storedUser?.created_at ? new Date(storedUser.created_at).toLocaleDateString('es-GT') : 'No disponible',
    avatar: storedUser?.nombres ? storedUser.nombres.split(' ').map(n => n[0]).join('').toUpperCase().substring(0,2) : 
           storedUser?.email ? storedUser.email[0].toUpperCase() : 'US'
})

onMounted(async () => {
    const token = localStorage.getItem('token')
    if (token && storedUser?.email) {
        try {
            const response = await fetch(`${API_BASE_URL}/usuarios/by-email?email=${encodeURIComponent(storedUser.email)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const data = await response.json()
                if (data && data.nombres) {
                    userData.value = {
                        nombre: `${data.nombres} ${data.apellidos || ''}`.trim(),
                        email: data.email || '',
                        telefono: data.telefono || 'No registrado',
                        fechaNacimiento: data.fecha_nacimiento || 'No registrado',
                        ciudad: data.ciudad || 'No registrado',
                        departamento: data.pais || 'No registrado',
                        rol: data.tipo_usuario === 'super_admin' ? 'Super Administrador' : 
                            data.tipo_usuario === 'admin' ? 'Administrador' : 
                            data.tipo_usuario || 'Usuario',
                        fechaRegistro: data.created_at ? new Date(data.created_at).toLocaleDateString('es-GT') : 'No disponible',
                        avatar: data.nombres ? data.nombres.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0,2) : 
                               data.email ? data.email[0].toUpperCase() : 'US'
                    }
                }
            }
        } catch (err) {
            console.error('Error al obtener datos del usuario:', err)
        }
    }
})

const passwordForm = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const passwordErrors = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const isChangingPassword = ref(false)
const passwordSuccess = ref(false)

const hasMinLength = computed(() => passwordForm.newPassword.length >= 8)
const hasUppercase = computed(() => /[A-Z]/.test(passwordForm.newPassword))
const hasLowercase = computed(() => /[a-z]/.test(passwordForm.newPassword))
const hasNumber = computed(() => /\d/.test(passwordForm.newPassword))

const passwordStrength = computed(() => {
    const requirements = [hasMinLength.value, hasUppercase.value, hasLowercase.value, hasNumber.value]
    const count = requirements.filter(Boolean).length
    
    if (count <= 1) return { class: 'weak', label: 'Débil', width: '25%' }
    if (count <= 2) return { class: 'fair', label: 'Regular', width: '50%' }
    if (count <= 3) return { class: 'good', label: 'Buena', width: '75%' }
    return { class: 'strong', label: 'Fuerte', width: '100%' }
})

const isPasswordFormValid = computed(() => {
    return hasMinLength.value && hasUppercase.value && hasLowercase.value && hasNumber.value &&
        passwordForm.currentPassword.length > 0 &&
        passwordForm.newPassword === passwordForm.confirmPassword
})

const validatePasswordForm = () => {
    passwordErrors.currentPassword = ''
    passwordErrors.newPassword = ''
    passwordErrors.confirmPassword = ''

    let isValid = true

    if (!passwordForm.currentPassword) {
        passwordErrors.currentPassword = 'Ingresa tu contraseña actual'
        isValid = false
    }

    if (!passwordForm.newPassword) {
        passwordErrors.newPassword = 'Ingresa una nueva contraseña'
        isValid = false
    } else if (!hasMinLength.value || !hasUppercase.value || !hasLowercase.value || !hasNumber.value) {
        passwordErrors.newPassword = 'La contraseña no cumple los requisitos'
        isValid = false
    }

    if (!passwordForm.confirmPassword) {
        passwordErrors.confirmPassword = 'Confirma la nueva contraseña'
        isValid = false
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        passwordErrors.confirmPassword = 'Las contraseñas no coinciden'
        isValid = false
    }

    return isValid
}

const handlePasswordChange = async () => {
    if (!validatePasswordForm()) return

    isChangingPassword.value = true
    passwordSuccess.value = false

    await new Promise(resolve => setTimeout(resolve, 2000))

    isChangingPassword.value = false
    passwordSuccess.value = true
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''

    setTimeout(() => {
        passwordSuccess.value = false
    }, 5000)
}

const bankData = reactive({
    banco: 'Banco Industrial',
    tipoCuenta: 'Monetaria',
    numeroCuenta: '**** **** **** 1234'
})

const isEditingBank = ref(false)

const toggleBankEdit = () => {
    isEditingBank.value = !isEditingBank.value
}

const saveBankData = () => {
    isEditingBank.value = false
}

const fiscalData = reactive({
    empresa: 'Allevo Sports',
    nit: '12345678-9',
    infoFacturacion: 'Ciudad de Guatemala, Zona 10'
})

const isEditingFiscal = ref(false)

const toggleFiscalEdit = () => {
    isEditingFiscal.value = !isEditingFiscal.value
}

const saveFiscalData = () => {
    isEditingFiscal.value = false
}

const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('pendingVerificationEmail')
    router.push('/admin/login')
}

const confirmDeleteAccount = () => {
    if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción es irreversible.')) {
        localStorage.clear()
        router.push('/admin/login')
    }
}
</script>

<style scoped>
.profile-page {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--spacing-lg);
}

.profile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-xl);
    gap: var(--spacing-md);
}

.btn-back {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    color: var(--color-text);
    font-family: var(--font-heading);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-back:hover {
    background: rgba(207, 46, 46, 0.15);
    border-color: var(--color-primary);
}

.btn-back ion-icon {
    font-size: 1.1rem;
    color: var(--color-primary);
}

.page-title {
    display: flex;
    align-items: center;
    gap: 12px;
}

.page-title ion-icon {
    font-size: 1.8rem;
    color: var(--color-primary);
}

.page-title h1 {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    color: var(--color-text);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
}

.profile-avatar-section {
    display: flex;
    align-items: center;
    gap: var(--spacing-xl);
    padding: var(--spacing-xl);
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg);
    margin-bottom: var(--spacing-xl);
}

.avatar-wrapper {
    position: relative;
    flex-shrink: 0;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-primary) 0%, #8b1e1e 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-heading);
    font-size: 2.5rem;
    font-weight: 700;
    color: #fff;
    box-shadow: 0 8px 24px rgba(207, 46, 46, 0.4);
}

.avatar-edit-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--color-primary);
    border: 2px solid var(--color-bg);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.avatar-edit-btn:hover {
    transform: scale(1.1);
}

.avatar-info {
    flex: 1;
}

.user-name {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    color: var(--color-text);
    margin: 0 0 var(--spacing-sm);
}

.user-meta {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.user-meta span {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--color-text-muted);
}

.user-meta span ion-icon {
    font-size: 1rem;
    color: var(--color-primary);
}

.user-role {
    color: var(--color-primary) !important;
    font-weight: 600;
}

.sections-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.section-card {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg);
    overflow: hidden;
}

.section-card::before {
    content: '';
    display: block;
    height: 3px;
    background: linear-gradient(90deg, var(--color-primary), #ff5a5a);
}

.section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);
}

.section-icon {
    font-size: 1.4rem;
    color: var(--color-primary);
}

.section-header h3 {
    flex: 1;
    font-family: var(--font-heading);
    font-size: 1rem;
    color: var(--color-text);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
}

.btn-edit-section {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    background: transparent;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    color: var(--color-text-muted);
    font-family: var(--font-heading);
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-edit-section:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
    background: rgba(207, 46, 46, 0.1);
}

.section-body {
    padding: var(--spacing-lg);
}

.data-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
}

.data-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.data-item.wide {
    grid-column: 1 / -1;
}

.data-item label {
    font-family: var(--font-heading);
    font-size: 0.7rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.data-value {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
}

.data-value ion-icon {
    font-size: 1.1rem;
    color: var(--color-primary);
}

.data-value span {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--color-text);
}

.input-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(0, 0, 0, 0.35);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    padding: 0 14px;
    transition: all 0.2s ease;
}

.input-wrap:focus-within,
.input-wrap.focused {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(207, 46, 46, 0.12);
}

.input-wrap.textarea-wrap {
    align-items: flex-start;
    padding: 12px 14px;
}

.input-wrap .field-icon {
    font-size: 1.05rem;
    color: var(--color-text-muted);
    flex-shrink: 0;
}

.input-wrap:focus-within .field-icon {
    color: var(--color-primary);
}

.input-wrap input,
.input-wrap select,
.input-wrap textarea {
    flex: 1;
    background: transparent;
    border: none;
    padding: 12px 0;
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 0.9rem;
    outline: none;
}

.input-wrap textarea {
    resize: vertical;
    min-height: 60px;
}

.input-wrap input::placeholder,
.input-wrap textarea::placeholder {
    color: rgba(255, 255, 255, 0.2);
}

.input-wrap select {
    cursor: pointer;
    appearance: none;
}

.input-wrap select option {
    background: #151515;
    color: var(--color-text);
}

.toggle-visibility {
    background: none;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
}

.toggle-visibility:hover {
    color: var(--color-primary);
}

.password-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.form-field label {
    font-family: var(--font-heading);
    font-size: 0.75rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.field-error {
    font-size: 0.75rem;
    color: #ff6b6b;
}

.password-strength {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 4px;
}

.strength-bar {
    flex: 1;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
}

.strength-fill {
    height: 100%;
    border-radius: 2px;
    transition: all 0.3s ease;
}

.strength-fill.weak { background: #ff4444; }
.strength-fill.fair { background: #ffaa44; }
.strength-fill.good { background: #88cc44; }
.strength-fill.strong { background: #44ff44; }

.strength-label {
    font-size: 0.75rem;
    font-family: var(--font-heading);
    min-width: 60px;
}

.strength-label.weak { color: #ff4444; }
.strength-label.fair { color: #ffaa44; }
.strength-label.good { color: #88cc44; }
.strength-label.strong { color: #44ff44; }

.password-requirements {
    padding: var(--spacing-md);
    background: rgba(0, 0, 0, 0.2);
    border-radius: var(--border-radius);
}

.requirements-title {
    font-family: var(--font-heading);
    font-size: 0.75rem;
    color: var(--color-text-muted);
    margin: 0 0 var(--spacing-sm);
}

.requirements-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}

.requirements-list li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-body);
    font-size: 0.8rem;
    color: var(--color-text-muted);
}

.requirements-list li met {
    color: #44ff44;
}

.requirements-list li ion-icon {
    font-size: 1rem;
}

.requirements-list li.met {
    color: #44ff44;
}

.requirements-list li.met ion-icon {
    color: #44ff44;
}

.btn-submit {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 24px;
    font-family: var(--font-heading);
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #fff;
    background: linear-gradient(135deg, var(--color-primary) 0%, #8b1e1e 100%);
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 15px rgba(207, 46, 46, 0.3);
}

.btn-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(207, 46, 46, 0.5);
}

.btn-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.btn-submit.btn-save {
    margin-top: var(--spacing-md);
    width: 100%;
}

.success-message {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: var(--spacing-md);
    background: rgba(0, 224, 144, 0.1);
    border: 1px solid rgba(0, 224, 144, 0.3);
    border-radius: var(--border-radius);
    color: #00e090;
    font-family: var(--font-body);
    font-size: 0.9rem;
    animation: fade-in 0.3s ease;
}

.success-message ion-icon {
    font-size: 1.2rem;
}

@keyframes fade-in {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
}

.loader {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.danger-zone::before {
    background: linear-gradient(90deg, #ff4444, #ff6666) !important;
}

.danger-actions {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
}

.btn-danger {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px 20px;
    font-family: var(--font-heading);
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--color-text);
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-danger:hover {
    background: rgba(207, 46, 46, 0.15);
    border-color: var(--color-primary);
    color: var(--color-primary);
}

.btn-danger.btn-delete {
    background: rgba(255, 68, 68, 0.1);
    border-color: rgba(255, 68, 68, 0.3);
}

.btn-danger.btn-delete:hover {
    background: rgba(255, 68, 68, 0.2);
    border-color: #ff4444;
    color: #ff4444;
}

.btn-danger ion-icon {
    font-size: 1.1rem;
}

.danger-warning {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-body);
    font-size: 0.8rem;
    color: var(--color-text-muted);
    margin: 0;
}

.danger-warning ion-icon {
    font-size: 1.1rem;
    color: #ffaa44;
}

@media (max-width: 600px) {
    .profile-page {
        padding: var(--spacing-md);
    }

    .profile-avatar-section {
        flex-direction: column;
        text-align: center;
    }

    .user-meta {
        align-items: center;
    }

    .data-grid {
        grid-template-columns: 1fr;
    }

    .requirements-list {
        grid-template-columns: 1fr;
    }

    .danger-actions {
        flex-direction: column;
    }
}
</style>