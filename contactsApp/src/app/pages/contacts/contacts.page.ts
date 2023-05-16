import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/home/services/storage.services';
import { NavController } from '@ionic/angular';
import { HomePage } from 'src/app/home/home.page';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  ngOnInit() {
  }

  person = {name:'', phone:''};
  name!: string;
  storageName!: string;
  phone!: string;


  constructor(
    private storage: StorageService,
    private navCtrl: NavController
  ) {}

  setStorage() {
    this.storage.setString('name',this.name);
    this.storage.setObject('person', {
      name: this.name,
      phone: this.phone
    });
  }

  gotoHome(){
    this.navCtrl.navigateForward(['home']);
  }

  getStorage() {
   
    this.storage.getString('name').then((data:any)=>{
      if (data.value){
        this.storageName = data.value;
      }
    });

    this.storage.getObject('person').then((data: any)=>{
      this.person = data;
    });
        
  }

    clearStorage() {
      this.storage.clear();
    } 
  }
