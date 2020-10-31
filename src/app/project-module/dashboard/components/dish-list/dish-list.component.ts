import { GeneralService } from 'src/app/shared/service/general.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ICategoryDish } from 'src/app/shared/interface/restaurant';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.scss']
})
export class DishListComponent implements OnInit, OnChanges {

  @Input() dishList: ICategoryDish[];
  activeDishList: ICategoryDish[] = [];
  myCart: any;
  constructor(public general: GeneralService) {
    this.myCart = this.general.getCartItem;
  }

  ngOnChanges() {
    console.log("current dish list=>", this.dishList);
    this.activeDishList = this.dishList;
    let tempArray = [];
    this.activeDishList.forEach(dish => {
      tempArray = this.myCart.filter(cart => cart == dish.dish_id);
      dish.count = tempArray.length;
    })
  }

  ngOnInit(): void {
  }

  addItem(item) {
    item.count++;
    this.general.addCartItem(item);
  }

  removeItem(item) {
    if (item.count) {
      item.count--;
      this.general.removeCartItem(item);
    }
  }

}
