import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MainService } from '../services/main.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  daysForExpiration = 0
  current = 0
  startDate
  endDate

  COLORAT75 = '#ffc107'
  COLORAT90 = '#ff5722'

  color = '#1077BE'
  background = '#9FC9E3'

  getDataObs: Subscription

  constructor(public loadingController: LoadingController, private mainService: MainService) {}

  ionViewWillEnter () {
    this.getData()
  }

  getData () {
    this.getDataObs = this.mainService.getData().subscribe((data) => {
      this.daysForExpiration = data.hire.days_for_expiration 
      this.current = data.hire.percentage

      if (this.current >= 75 && this.current <= 89.99) {
        this.color = this.COLORAT75
      } else if (this.current >= 90) {
        this.color = this.COLORAT90
      }

      this.startDate = data.hire.start_pretty_date
      this.endDate = data.hire.end_pretty_date
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: `<div class="custom-spinner-container">
      <div class="custom-spinner-box">
         <img src="assets/logo.png" />
      </div>
    </div>`,
      spinner: null,
      duration: 2000,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  ionViewWillLeave() {
    this.getDataObs.unsubscribe()
  }
}
