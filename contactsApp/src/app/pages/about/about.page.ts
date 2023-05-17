import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor( 
    private navCtrl: NavController // navigation between pages 
    ) { }

  ngOnInit() {
  }

  // navigate to the home page
  gotoHome()
  {
    this.navCtrl.navigateForward(['home']);
  }
}
