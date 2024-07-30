export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/any-pathname-to-protect'],
}
