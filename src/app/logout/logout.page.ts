import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage {

  id
  endDate
  companyName

  getDataObs: Subscription

  constructor(private mainService: MainService, private router:  Router, private navCtrl: NavController) { }

  ionViewWillEnter() {
    this.getData()
  }

  getData () {
    this.getDataObs = this.mainService.getData().subscribe((data) => {
      this.id = data.internal_id 
      this.companyName = data.hire.company.name
      this.endDate = data.hire.end_pretty_date
    })
  }

  logout(form) {
    this.mainService.logout(form.value).subscribe((res) => {
      form.reset();
      this.navCtrl.navigateRoot('login')
    });
  }

  ionViewWillLeave() {
    this.getDataObs.unsubscribe()
  }
}
