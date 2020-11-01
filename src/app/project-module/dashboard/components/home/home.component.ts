import { IRestaurant } from './../../../../shared/interface/restaurant';
import { GeneralService } from './../../../../shared/service/general.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  restaurentDetails: IRestaurant[] = [];
  restaurantName: any;

  constructor(private general: GeneralService,
    private router: Router) {
    // get all restaurant details from api
    this.general.restaurentData.subscribe(data => {
      if (data && data.length) {
        this.restaurentDetails = data;
        console.log(this.restaurentDetails);
      }
    });
  }

  ngOnInit(): void {
  }

  // navigate to dish category of active restaurant
  navigateTo(restuarant) {
    this.router.navigate(['/dish-category', restuarant.restaurant_id]);
    this.general.setCurrentRestaurant(restuarant);
  }

}
