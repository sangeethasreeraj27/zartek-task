import { GeneralService } from './../../shared/service/general.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  subscription: any;

  constructor(private general: GeneralService,
    public router: Router) {
    this.subscription = router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url.includes("home")) {
          this.general.removeActiveRestaurant();
        }
      }
    })
  }

  ngOnInit(): void {
    console.log("dashborad");
    this.general.fetchData();
    this.general.initCartCount();
    this.general.initRestaurant();
  }

}
