import { Component } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOptions = {
    initialSlide: 1,
    speed: 400,
  };

  constructor(private menu: MenuController) {
   this.menu.enable(true); 
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }
}
