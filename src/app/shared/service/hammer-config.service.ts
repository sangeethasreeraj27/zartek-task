import { HammerGestureConfig } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import * as Hammer from 'hammerjs';


@Injectable({
  providedIn: 'root'
})
export class HammerConfigService extends HammerGestureConfig {
  buildHammer(element: HTMLElement): HammerManager {
    return new Hammer.Manager(element, {
      touchAction: 'auto',
      inputClass: Hammer.TouchInput,
      recognizers: [
        [Hammer.Swipe, {
          direction: Hammer.DIRECTION_HORIZONTAL
        }]
      ]
    });
  }

}
