export function isAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
}
export function isUnauthenticated(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/profile');
}
