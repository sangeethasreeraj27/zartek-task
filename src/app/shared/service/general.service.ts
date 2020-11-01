import { ApiService, ApiConstants } from './api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HammerGestureConfig } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class GeneralService {
  myCart: any;

  constructor(private apiService: ApiService,
    private _snackBar: MatSnackBar) { }

  restaurentData = new BehaviorSubject(null);
  cartItem = new BehaviorSubject(0);
  activeRestaurant = new BehaviorSubject(null);


  // get all resturant details
  fetchData() {
    this.apiService
      .ExecuteGet(
        this.apiService.baseUrl + ApiConstants.getDishCategory
      )
      .subscribe(
        (response: any) => {
          this.handleResponse(response);
        },
        error => {
          this.handleError(error)
        }
      );
  }

  handleResponse(response: any): void {
    console.log("dish category list=>", response);
    this.restaurentData.next(response);
  }

  handleError(error: any): void {
    this.openSnackBar("Something went wrong !!!", '');
  }

  setCurrentRestaurant(res) {
    localStorage.setItem("restaurant", res.restaurant_name);
    this.activeRestaurant.next(res.restaurant_name);
  }

  get getCurrentRestaurant() {
    if (localStorage.getItem('restaurant')) {
      return (localStorage.getItem('restaurant'));
    }
    else {
      return (null);
    }
  }

  removeActiveRestaurant() {
    localStorage.removeItem('restaurant');
    this.activeRestaurant.next(null);
  }

  initRestaurant() {
    this.activeRestaurant.next(this.getCurrentRestaurant);
  }

  get getCartItem() {
    if (localStorage.getItem('myCart')) {
      return (JSON.parse(localStorage.getItem('myCart')));
    }
    else {
      return ([]);
    }
  }

  initCartCount() {
    this.myCart = this.getCartItem;
    this.cartItem.next(this.myCart.length);
  }

  addCartItem(item) {
    this.myCart = this.getCartItem;
    this.myCart.push(item.dish_id)
    localStorage.setItem('myCart', JSON.stringify(this.myCart))
    this.cartItem.next(this.myCart.length)
  }

  removeCartItem(item) {
    this.myCart = this.getCartItem;
    let index = this.myCart.findIndex(cart => cart == item.dish_id);
    if (index != -1) this.myCart.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(this.myCart))
    this.cartItem.next(this.myCart.length)
  }

  // open general snakbar
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
