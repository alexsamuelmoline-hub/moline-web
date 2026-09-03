// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANTE: no ejecutar lógica entre createServerClient y getUser().
  // Un error simple aquí puede hacer muy difícil depurar problemas de
  // usuarios deslogueados aleatoriamente. Ver docs oficiales de Supabase SSR.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginRoute = pathname === '/admin/login'

  // Caso 1: ruta /admin protegida, sin sesión -> redirigir a login
  if (isAdminRoute && !isLoginRoute && !user) {
    const redirectUrl = new URL('/admin/login', request.url)
    // Opcional: preservar la ruta original para redirigir después del login
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Caso 2: usuario autenticado intentando acceder a /admin/login -> dashboard
  if (isLoginRoute && user) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // IMPORTANTE: siempre devolver supabaseResponse (o una copia con sus cookies)
  // para no romper la sincronización de sesión entre cliente y servidor.
  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Aplica el middleware a rutas /admin y excluye assets estáticos.
     * Ajustá el patrón si tenés otras rutas que necesiten protección.
     */
    '/admin/:path*',
  ],
}
