import { Component, OnInit } from '@angular/core';
import { NavController, InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { CountriesService } from 'src/app/services/countries.service'; // to utilize the service for get countries from api
import { StudentStorage } from 'src/app/home/services/studentstorage.services'; // to get student info from storage

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
    , private storage: StudentStorage // to get student information
    ) {
    
   }
   // starting the page with some infomration
  ngOnInit() 
  {
    this.getCountries(); // getting 
    this.getStudentInfo();
  }

  //Student information
  student = {name:'', email:''}; // student obj
  name!: string; // student name
  email!: string; // student email

 
  // navigate to the home page
  gotoHome()
  {
    this.navCtrl.navigateForward(['home']);
  }

  //getting Student information
  getStudentInfo(){
      this.storage.getObject('student').then((data: any)=>{
        if(data==null){
          this.student = {name:'', email:''};
        }else{
          this.student = data;
        }
    });

  }

  // it is an animation
  async getCountries(event?: InfiniteScrollCustomEvent )
  {
    const loadingIt = await this.loadingCtrl.create({
      message:'Loading ...',
      spinner: 'bubbles',
    });
    await loadingIt.present();

    //to get the json from the api - restfull
    this.countriesService.getCountries("subregion/Europe?fields=name,flags,capital").subscribe(
      (res)=> {
        loadingIt.dismiss(); // stoping animagion
        
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
  // not used, works as a index guide inside in a for loop
  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }
}