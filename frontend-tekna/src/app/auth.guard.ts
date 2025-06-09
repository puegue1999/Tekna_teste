import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  private isLoggedIn = false;

  constructor(private router: Router){}
  canActivate(): boolean{
      if(this.isLoggedIn){
        return true
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  toggleLogin(){
    this.isLoggedIn = !this.isLoggedIn;
  }
}