import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'; // to get the variable from environment settings
import { HttpClient } from '@angular/common/http'; // to get the rest
import { Observable } from 'rxjs'; // to utilize and transform the json array


const API_URL = environment.API_URL; // the api url from environment settings

//to utilize and transform the json array received from the api
export interface ApiCountriesResult{
  results: any[] ;
}

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http : HttpClient) { }
  
  //to get json from api - was necessary to wrap it and convert json result in object array
  // sometimes for others api it is not necessary, but I choose an api which the
   // the result format was not easy to work with
  getCountries(infoUrl): Observable<ApiCountriesResult> {
    return this.http.get<ApiCountriesResult>(`${API_URL}/${infoUrl}`);
  }
}
