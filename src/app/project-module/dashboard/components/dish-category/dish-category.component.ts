import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/shared/service/general.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITableMenuList, IRestaurant } from 'src/app/shared/interface/restaurant';



@Component({
  selector: 'app-dish-category',
  templateUrl: './dish-category.component.html',
  styleUrls: ['./dish-category.component.scss']
})
export class DishCategoryComponent implements OnInit {

  categoryTabs: ITableMenuList[] = [];
  restaurentDetails: IRestaurant[] = [];
  id: any;
  currentRestaurant: IRestaurant;


  constructor(private general: GeneralService,
    private activatedRoute: ActivatedRoute,
  ) {
    Promise.all([
      this.fetchRestaurantData(),
      this.fetchParams()
    ])
      .then(value => {
        this.fetchCategoryData();
      })
      .catch(error => {
        console.log(error);
        this.general.openSnackBar("Something went wrong !!!", '')
      });

  }

  ngOnInit(): void {

  }

  // get all restaurant details
  fetchRestaurantData() {
    return new Promise((resolve, reject) => {
      this.general.restaurentData
        .subscribe(data => {
          if (data && data.length) {
            this.restaurentDetails = data;
            resolve();
          }
        },
          error => {
            console.log(error);
            reject();

          });
    })
  }

  // get the url params
  fetchParams() {
    return new Promise((resolve, reject) => {
      this.activatedRoute.params.subscribe(params => {
        console.log("params=>", params);
        if (params.id) {
          this.id = params.id;
          resolve();
        }
      },
        error => {
          console.log(error);
          reject();
        }
      )
    })
  }

  // get the current active restaurant
  fetchCategoryData() {
    this.currentRestaurant = this.restaurentDetails.find(detail => detail.restaurant_id == this.id);
    this.categoryTabs = this.currentRestaurant.table_menu_list;
    console.log("categorytabs=>", this.categoryTabs);
  }

}
