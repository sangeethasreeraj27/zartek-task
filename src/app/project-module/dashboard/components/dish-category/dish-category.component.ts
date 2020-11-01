import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren } from '@angular/core';
import { GeneralService } from 'src/app/shared/service/general.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITableMenuList, IRestaurant } from 'src/app/shared/interface/restaurant';
import { MatTabGroup, MatTab } from '@angular/material/tabs';



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
  swipeCoord: [number, number];
  swipeTime: number;
  selectedTab: number;
  // selectedIndex: number = 1;
  tabLength: number;

  constructor(private general: GeneralService,
    private activatedRoute: ActivatedRoute,
  ) {
    // get all restaurant details and active restaurant id
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
    this.tabLength = this.categoryTabs.length;
    console.log("categorytabs=>", this.categoryTabs);
  }

  // Action triggered when user swipes

  swipeOld(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();
    if (when == 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;
      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 2)) { // Horizontal enough
        const swipe = direction[0] < 0 ? 'next' : 'previous';
        console.info(swipe);
        if (swipe === 'next') {
          const isFirst = this.selectedTab === 0;
          if (this.selectedTab <= this.tabLength - 2) {
            this.selectedTab = isFirst ? 1 : this.selectedTab + 1;
          }
          console.log("Swipe left - INDEX: " + this.selectedTab);
        } else if (swipe === 'previous') {
          const isLast = this.selectedTab === this.tabLength;
          if (this.selectedTab >= 1) {
            this.selectedTab = this.selectedTab - 1;
          }
          console.log("Swipe right — INDEX: " + this.selectedTab);
        }
      }
    }
  }

}
