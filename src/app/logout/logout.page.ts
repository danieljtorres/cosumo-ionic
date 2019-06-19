import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  id
  endDate
  companyName

  constructor(private mainService: MainService, private router:  Router) { }

  ngOnInit() {
    this.getData()
  }

  getData () {
    this.mainService.getData().subscribe((data) => {
      this.id = data.internal_id 
      this.companyName = data.hire.company.name
      this.endDate = data.hire.end_pretty_date
    })
  }

  logout(form) {
    this.mainService.logout(form.value).subscribe((res) => {
      form.reset();
      this.router.navigateByUrl('login');
    });
  }
}
