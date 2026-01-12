export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return

  const protectedRoutes = ['/appointment']

  const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route))
  
  if (isProtectedRoute) {
    const token = localStorage.getItem('auth_token')
    
    if (!token) {
      return navigateTo('/admin')
    }
  }

  if (to.path === '/admin') {
    const token = localStorage.getItem('auth_token')
    if (token) {
      return navigateTo('/appointment')
    }
  }
})
