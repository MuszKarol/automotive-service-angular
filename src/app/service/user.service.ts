import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CarGroupDTO} from "../dto/CarGroupDTO";
import {CarDTO} from "../dto/CarDTO";
import {UserCreateDTO} from "../dto/UserCreateDTO";
import {UserGetDTO} from "../dto/UserGetDTO";
import {VisitDTO} from "../dto/VisitDTO";
import {TokenDTO} from "../dto/TokenDTO";
import {LoginDTO} from "../dto/LoginDTO";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  carApiURL = "http://localhost:9091";
  serviceApiURL = "http://localhost:8080";
  cars!: CarDTO[];
  carsInGroups!: CarGroupDTO[];

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  async getToken(loginData: LoginDTO) {
    return this.httpClient.post<TokenDTO>(this.serviceApiURL + "/users/auth", loginData)
      .toPromise()
      .catch(() => console.log("Invalid users data!"));
  }

  getHeaders() {
    let token = localStorage.getItem('token');

    if (token != undefined) {
      return {
        headers: new HttpHeaders({
          'Authorization': `Bearer ` + token,
          'Content-Type': 'application/json'
        })
      };
    } else {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    }
  }

  getRole() {
    return localStorage.getItem('role');
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  setTokenAndLoginData(tokenDTO: TokenDTO, loginDTO: LoginDTO) {
    localStorage.setItem('token', tokenDTO.token);
    localStorage.setItem('email', loginDTO.email);
    localStorage.setItem('password', loginDTO.password);
    localStorage.setItem('role', tokenDTO.role);
  }

  removeTokenAndLoginData() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('role');
  }

  renewToken() {
    const loginDTO = {
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password')
    } as LoginDTO;

    this.getToken(loginDTO).then(token => {
      if (token != undefined) {
        console.log(token);
        this.setTokenAndLoginData(token, loginDTO);
      }
    });
  }

  getGroupedCars() {
    return this.httpClient.get<CarGroupDTO[]>(this.carApiURL + "/cars/grouped")
      .subscribe(response => {
        this.carsInGroups = response;
      });
  }

  registerNewClient(user: UserCreateDTO) {
    this.httpClient.post(this.serviceApiURL + "/users/new/client", user)
      .subscribe(response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
    this.router.navigateByUrl('/').then(r => window.location.reload());
  }

  postNewCar(car: CarDTO) {
    this.httpClient.post(this.serviceApiURL + "/users/vehicle", car, this.getHeaders())
      .subscribe(response => {
          console.log(response);
        },
        error => {
          console.log(error);
          this.renewToken();
        });
  }

  postNewVisit(reservation: VisitDTO) {
    this.httpClient.post("http://localhost:8080/visits/new", reservation, this.getHeaders())
      .subscribe(response => {
          console.log(response);
        },
        error => {
          console.log(error);
          this.renewToken();
        });
  }

  getAllUserCars() {
    this.httpClient.get<UserGetDTO>(this.serviceApiURL + "/users", this.getHeaders())
      .subscribe(response => {
          console.log(response)
          // @ts-ignore
          this.cars = response.carDTOList;
        },
        error => {
          console.log(error);
          this.renewToken();
        });
  }

  deleteUserCar(vin: string) {
    this.httpClient.delete(this.serviceApiURL + "/users/vehicle/" + vin, this.getHeaders())
      .subscribe(response => {
          console.log(response);
        },
        error => {
          console.log(error);
          this.renewToken();
        });
  }

  reloadToHomepage() {
    this.router.navigateByUrl('').then(() => window.location.reload());
  }
}
