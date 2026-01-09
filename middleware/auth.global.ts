export default defineNuxtRouteMiddleware((to, from) => {
  // Only run on client side
  if (process.server) return

  // Routes that require authentication
  const protectedRoutes = ['/appointment']
  
  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route))
  
  if (isProtectedRoute) {
    // Check for token in localStorage
    const token = localStorage.getItem('auth_token')
    
    if (!token) {
      // No token found, redirect to login
      return navigateTo('/admin')
    }
  }
  
  // If on login page and already has token, redirect to appointment
  if (to.path === '/admin') {
    const token = localStorage.getItem('auth_token')
    if (token) {
      return navigateTo('/appointment')
    }
  }
})