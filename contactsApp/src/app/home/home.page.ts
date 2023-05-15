import { Component } from '@angular/core';
import { StorageService } from './services/storage.services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  person = {name:'', phone:''};
  name!: string;
  storageName!: string;
  phone!: string;


  constructor(
    private storage: StorageService
  ) {}

  setStorage() {
    this.storage.setString('name',this.name);
    this.storage.setObject('person', {
      name: this.name,
      phone: this.phone
    });
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