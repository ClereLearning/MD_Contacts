import { Component, OnInit } from '@angular/core';
import { StudentStorage } from 'src/app/home/services/studentstorage.services'; // to utilize the local Storage
import { NavController } from '@ionic/angular'; // to navigate between pages

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  ngOnInit() {
  }

  student = {name:'', email:''}; // student obj
  name!: string; // student name
  email!: string; // student email


  constructor(
    private storage: StudentStorage,
    private navCtrl: NavController
  ) {}
  
  // saving and serializing student object 
  setStorage() {
    this.storage.setString('name',this.name);
    this.storage.setObject('student', {
      name: this.name,
      email: this.email
    });    
    
    this.getStorage();
    this.clearForm();
  }

  //to clear the form elements
  clearForm()
  {
    this.name = "";
    this.email = "";
  }
 
  // return to the home page
  gotoHome(){
    this.navCtrl.navigateForward(['home']);
  }

  // to get student information from the storage
  getStorage() {
   
    this.clearForm();

    this.storage.getObject('student').then((data: any)=>{
      if(data==null){
        this.student = {name:'', email:''};
      }else{
        this.student = data;
      }
    });        

    
  }

  // to clear all saved information from student
    clearStorage() {
      this.storage.clearStorage();      
    } 
  }