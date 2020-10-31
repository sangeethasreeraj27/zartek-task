import { GeneralService } from 'src/app/shared/service/general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartCount: number;
  restaurantName: any;

  constructor(private general: GeneralService) {
    this.general.cartItem.subscribe(count => {
      this.cartCount = count
    }
    );
    this.general.activeRestaurant.subscribe(name => {
      this.restaurantName = name;
    })
  }

  ngOnInit(): void {
  }

}
