import { Component, OnInit } from '@angular/core';
import { NavController, InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { CountriesService } from 'src/app/services/countries.service'; // to utilize the service for get countries from api
import { StorageService } from 'src/app/home/services/storage.services';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
})
export class CountriesPage implements OnInit {
  infoCountries: any[] = []; // json array list from api

  constructor(
     private navCtrl: NavController // navigation between pages
    , private countriesService : CountriesService // to get api rest
    , private loadingCtrl : LoadingController // to display loading message while page is not ready 
    , private storage: StorageService // to get student information
    ) {
    
   }

  ngOnInit() 
  {
    this.getCountries();
    this.getStudentInfo();
  }

  student = {name:'', email:''};
  name!: string;
  storageName!: string;
  email!: string;

 
  // navigate to the home page
  gotoHome()
  {
    this.navCtrl.navigateForward(['home']);
  }

  getStudentInfo(){
    this.storage.getString('name').then((data:any)=>{
      if (data.value){
        this.storageName = data.value;
      }
    });

    this.storage.getObject('student').then((data: any)=>{
      this.student = data;
    });

  }

  async getCountries(event?: InfiniteScrollCustomEvent )
  {
    const loadingIt = await this.loadingCtrl.create({
      message:'Loading ...',
      spinner: 'bubbles',
    });
    await loadingIt.present();

    this.countriesService.getCountries("subregion/Europe?fields=name,flags,capital").subscribe(
      (res)=> {
        loadingIt.dismiss();
        // was not working directly from api
        // I had to convert to stringify and return to json again weird situation
        let resJson =  JSON.parse(JSON.stringify(res));        
        this.infoCountries.push(...resJson); // adding to array
        //console.log(this.infoCountries); // testing
                       
        event?.target.complete(); 
        if(event){
          event.target.disabled = true;          
        }
      }
      /*,
      (err)=>{
        console.log(err);
        loadingIt.dismiss();
      }*/
    );        
     
  }

  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }
}