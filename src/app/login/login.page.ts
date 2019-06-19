import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private mainService: MainService, private  router:  Router) { }

  ngOnInit() {
  }

  login(form){
    this.mainService.login(form.value).subscribe((res) => {
      if (res) {
        form.reset();
        this.router.navigateByUrl('home');
      }
    });
  }

}
