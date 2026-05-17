import { computed, readonly, ref } from 'vue'

export type UserRole = 'super_admin' | 'admin' | 'inversionista' | 'talento'

export interface AuthUser {
  id?: number
  nombre?: string
  email?: string
  rol?: string
  tipo_usuario?: UserRole
  nombres?: string
  apellidos?: string
  telefono?: string
  pais?: string
  ciudad?: string
  fecha_nacimiento?: string
  genero?: string
  verificado?: boolean
  activo?: boolean
  ultimo_acceso?: string
  created_at?: string
  [key: string]: unknown
}

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  super_admin: [
    'panel-rwa',
    'sponsors',
    'inversionistas',
    'proyectos',
    'talentos',
    'talentos-listado',
    'talentos-panel',
    'noticias',
    'postulaciones',
    'perfil'
  ],
  admin: [
    'noticias',
    'postulaciones',
    'talentos-panel',
    'perfil'
  ],
  inversionista: [
    'panel-rwa',
    'sponsors',
    'inversionistas',
    'proyectos',
    'talentos',
    'talentos-listado',
    'perfil'
  ],
  talento: [
    'talentos',
    'perfil'
  ]
}

export const ROUTE_TO_PERMISSION: Record<string, string> = {
  DashboardOverview: 'panel-rwa',
  SponsorsDashboard: 'sponsors',
  InversionistasDashboard: 'inversionistas',
  ProyectosDashboard: 'proyectos',
  AtletasDashboard: 'talentos-listado',
  TalentPanel: 'talentos-panel',
  NoticiasBandeja: 'noticias',
  NoticiasEditor: 'noticias',
  NoticiasEditorEdit: 'noticias',
  NoticiasPublicados: 'noticias',
  PostulacionesDashboard: 'postulaciones',
  Perfil: 'perfil'
}

export const getStoredUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem('user')
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export const getUserRole = (): UserRole | null => {
  const user = getStoredUser()
  if (!user) return null
  const role = user.tipo_usuario || user.rol
  const validRoles: UserRole[] = ['super_admin', 'admin', 'inversionista', 'talento']
  return validRoles.includes(role as UserRole) ? (role as UserRole) : null
}

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token') && !!getStoredUser()
}

export const canViewPermission = (routeKey: string): boolean => {
  const role = getUserRole()
  if (!role) return false
  return ROLE_PERMISSIONS[role]?.includes(routeKey) ?? false
}

export const canAccessRoute = (routeName: string | symbol | null | undefined): boolean => {
  if (!routeName || typeof routeName !== 'string') return true
  const permission = ROUTE_TO_PERMISSION[routeName]
  if (!permission) return true
  return canViewPermission(permission)
}

/* Reactive store for Vue components */
const authUser = ref<AuthUser | null>(getStoredUser())

export const refreshUser = () => {
  authUser.value = getStoredUser()
}

export const setStoredUser = (user: AuthUser) => {
  localStorage.setItem('user', JSON.stringify(user))
  authUser.value = user
}

export const logoutAuth = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('pendingVerificationEmail')
  authUser.value = null
}

export const useAuth = () => {
  const userRole = computed((): UserRole | null => {
    if (!authUser.value) return null
    const role = authUser.value.tipo_usuario || authUser.value.rol
    const validRoles: UserRole[] = ['super_admin', 'admin', 'inversionista', 'talento']
    return validRoles.includes(role as UserRole) ? (role as UserRole) : null
  })

  const isAuth = computed(() => {
    return !!localStorage.getItem('token') && !!authUser.value
  })

  const userData = computed(() => readonly(authUser.value))

  const canView = (routeKey: string) => {
    const role = userRole.value
    if (!role) return false
    return ROLE_PERMISSIONS[role]?.includes(routeKey) ?? false
  }

  const canAccessRouteReactive = (routeName: string | symbol | null | undefined) => {
    if (!routeName || typeof routeName !== 'string') return true
    const permission = ROUTE_TO_PERMISSION[routeName]
    if (!permission) return true
    return canView(permission)
  }

  const logout = () => {
    logoutAuth()
  }

  const setUser = (user: AuthUser) => {
    setStoredUser(user)
  }

  return {
    userRole,
    isAuthenticated: isAuth,
    userData,
    canView,
    canAccessRoute: canAccessRouteReactive,
    refreshUser,
    logout,
    setUser
  }
}
