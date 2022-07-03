import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookListService {

  constructor(
    private var_http_client: HttpClient,
    private var_router: Router,
    private var_datePipe: DatePipe,
  ) {
    this.api_url = environment.api_url
  }
  api_url = ""
  // api_url = "http://localhost:3000"
  // api_url = "http://1.eki.my.id"

  user_login: string = ""


  user_anonymous() {
    this.user_login = "user_" +
      + new Date().getFullYear() //+ "-"
      + ("0" + (new Date().getMonth() + 1)).slice(-2) //+ "-"
      + ("0" + new Date().getDate()).slice(-2) + "-"
      + Date.now();

    return this.user_login
  }



  getBook(UserParams: any = {}) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //-------------------------ISSUE
      // 'Access-Control-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': '*',
      // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-Requested-With,content-type,responseType,x-access-token,new-access-token',
      // 'x-access-token': token_access,
      // 'Content-Type': 'application/json;charset=UTF-8',
      //-------------------------ISSUE
    });

    let options = { headers: headers };

    let params: any = { ...UserParams }

    if (params && params.limit >= 0 && params.skip >= 0) {

    } else {
      delete params.limit
      delete params.skip;
    }

    let url = `${this.api_url}/ekitesting/v1/test/get-list-book-pages`

    // console.log( "URL : " + url )
    return this.var_http_client.post<any>(url,
      params,
      options
    )

  }



  createUpdateRating(GenerateParams: any = {}) {


    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //-------------------------ISSUE
      // 'Access-Control-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': '*',
      // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-Requested-With,content-type,responseType,x-access-token,new-access-token',
      // 'x-access-token': token_access,
      // 'Content-Type': 'application/json;charset=UTF-8',
      //-------------------------ISSUE
    });

    let options = { headers: headers };

    let params: any = { ...GenerateParams }


    let url = `${this.api_url}/ekitesting/v1/test/create-update-rating`

    // console.log( "URL : " + url )
    return this.var_http_client.post<any>(url,
      params,
      options
    )

  }

  createWishlist(GenerateParams: any = {}) {


    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //-------------------------ISSUE
      // 'Access-Control-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': '*',
      // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-Requested-With,content-type,responseType,x-access-token,new-access-token',
      // 'x-access-token': token_access,
      // 'Content-Type': 'application/json;charset=UTF-8',
      //-------------------------ISSUE
    });

    let options = { headers: headers };

    let params: any = { ...GenerateParams }

    if (params && params.limit >= 0 && params.skip >= 0) {

    } else {
      delete params.limit
      delete params.skip;
    }

    let url = `${this.api_url}/ekitesting/v1/test/create-wishlist`

    // console.log( "URL : " + url )
    return this.var_http_client.post<any>(url,
      params,
      options
    )

  }

  getWishlist(GenerateParams: any = {}) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //-------------------------ISSUE
      // 'Access-Control-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': '*',
      // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-Requested-With,content-type,responseType,x-access-token,new-access-token',
      // 'x-access-token': token_access,
      // 'Content-Type': 'application/json;charset=UTF-8',
      //-------------------------ISSUE
    });

    let options = { headers: headers };

    let params: any = { ...GenerateParams }

    if (params && params.limit >= 0 && params.skip >= 0) {

    } else {
      delete params.limit
      delete params.skip;
    }

    let url = `${this.api_url}/ekitesting/v1/test/get-wishlist`

    // console.log( "URL : " + url )
    return this.var_http_client.post<any>(url,
      params,
      options
    )
  }


  deleteWishlist(GenerateParams: any = {}) {


    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //-------------------------ISSUE
      // 'Access-Control-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': '*',
      // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-Requested-With,content-type,responseType,x-access-token,new-access-token',
      // 'x-access-token': token_access,
      // 'Content-Type': 'application/json;charset=UTF-8',
      //-------------------------ISSUE
    });

    let options = { headers: headers };

    let params: any = { ...GenerateParams }

    let url = `${this.api_url}/ekitesting/v1/test/delete-wishlist`

    // console.log( "URL : " + url )
    return this.var_http_client.post<any>(url,
      params,
      options
    )

  }














}
