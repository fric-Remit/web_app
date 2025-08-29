import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const data = localStorage.getItem('authTokenRemit'); 

  if (data) {
    return true; 
  }

  router.navigate(['/auth/login']);
  return false;
};