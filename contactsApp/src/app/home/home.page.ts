import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'; // to navigate between pages

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  
      constructor(   
        private navCtrl : NavController
      ) {}  

      // to navigate to student contact page
      gotoContacts()
      {
        this.navCtrl.navigateForward(['contacts']);
      }

      // to navigate to countries page
      gotoCountries()
      {
        this.navCtrl.navigateForward(['countries']);
      }

      //to navigate to about page
      gotoAbout()
      {
        this.navCtrl.navigateForward(['about']);
      }

  }