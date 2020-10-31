import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { GeneralService } from './shared/service/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zartek';
}
