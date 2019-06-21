import { Injectable } from  '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { tap, map } from  'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from  'rxjs';

import { ToastController } from '@ionic/angular';

import { Storage } from  '@ionic/storage';

import { environment } from '../../environments/environment';
import { Platform } from '@ionic/angular';
import { async } from 'q';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  SERVER_ADDRESS:  string  =  environment.SERVER_ADDRESS;
  authSubject  =  new  BehaviorSubject(false);
  private TOKEN = null

  constructor(private  httpClient:  HttpClient, private  storage:  Storage, private plt: Platform, public toastController: ToastController) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  login(device: any): Observable<any> {
    let subject = new Subject<any>();
    this.httpClient.post(`${this.SERVER_ADDRESS}/device/login`, device).subscribe(async (res: any) => {
      if (res.token) {
        await this.storage.set("ACCESS_TOKEN", res.token);
        this.authSubject.next(true);
        this.TOKEN = res.token
      }

      subject.next(res)
    }, async (error) => {
      const toast = await this.toastController.create({
        message: 'Los datos son incorrectos',
        duration: 2000,
        color: 'danger',
        position: 'top',
        header: 'ERROR'
      });
      toast.present();
    })

    return subject.asObservable()
  }

  checkToken() {
    this.storage.get("ACCESS_TOKEN").then(res => {
      if (res) {
        console.log('Token ready')
        this.authSubject.next(true);
        this.TOKEN = res
      }
    })
  }

  logout(device: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.TOKEN);
    return this.httpClient.post(`${this.SERVER_ADDRESS}/device/logout`, device, { headers: headers }).pipe(
      tap(async (res: any) => {
        if (res.logout) {
          this.storage.remove("ACCESS_TOKEN");
          this.authSubject.next(false);
        }
      }, async (error) => {
        const toast = await this.toastController.create({
          message: 'Los datos son incorrectos',
          duration: 2000,
          color: 'danger',
          position: 'top',
          header: 'ERROR'
        });
        toast.present();
      })
    );
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }

  getData(): Observable<any> {
    console.log(this.TOKEN)
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.TOKEN);
    return this.httpClient.get(`${this.SERVER_ADDRESS}/device`, { headers: headers })
  }
}
