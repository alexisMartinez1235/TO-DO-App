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
// region deprecated!
// export function isAuthenticatedJSON(req: any, res: any, next: any) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   return res.send({
//     data: 'User has not authenticated',
//     success: false,
//   });
// }

// export function isUnauthenticatedJSON(req: any, res: any, next: any) {
//   if (!req.isAuthenticated()) {
//     return next();
//   }
//   return res.send({
//     data: 'User has already authenticated',
//     success: false,
//   });
// }
// endregion
