import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    headers: req.headers.set('Content-Type', 'application/json'),
  });
  let token: string | null = localStorage.getItem('accessToken');

  if (token != null) {
    req = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
  }
  return next(req);
};
