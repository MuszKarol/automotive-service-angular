import {Injectable} from '@angular/core';
import {CompanyDetailsDTO} from "../dto/CompanyDetailsDTO";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailsService {

  constructor(private httpClient: HttpClient) {}

  getCompanyDetails(): Observable<CompanyDetailsDTO> {
    return this.httpClient.get<CompanyDetailsDTO>("http://localhost:8080/about");
  }

}
