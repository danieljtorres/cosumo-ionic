import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MainService } from '../services/main.service';
import { Observable } from 'rxjs';
 
 
@Injectable()
export class NoauthGuard implements CanActivate {
    constructor(
      private mainService: MainService,
      public router: Router,
        ) {}
 
    canActivate(): boolean | Observable<boolean> | Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.mainService.isLoggedIn().subscribe((res) => {
          if(res) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    }
 
}