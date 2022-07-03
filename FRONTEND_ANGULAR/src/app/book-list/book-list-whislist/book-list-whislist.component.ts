import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookListService } from '../book-list.service';

@Component({
  selector: 'app-book-list-whislist',
  templateUrl: './book-list-whislist.component.html',
  // styleUrls: ['./book-list-whislist.component.css']
  styles: [
    `


    `
  ]
})
export class BookListWhislistComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private var_router: Router,
    private var_service: BookListService
  ) { }




  arr_data: any = []
  var_jumlah_halaman_arr_loop;
  var_halaman_aktif
  var_halaman_aktif_number
  Jumlah_Halaman
  Jumlah_Data_Table
  limit = 6;
  skip;
  var_search = 'eki'
  temp_page_cookie_boongan: number = 1



  user_login: string = ""
  user_rating: number = 0


  //==============RATING
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  isMouseover = true;
  //==============RATING


  ngOnInit() {

    this.user_login = this.var_service.user_login

    this.get_api_func(0, 1)

  }


  delete_wishlist( data_index: any = null) {
    
    let GenerateParams: any = {}
    GenerateParams.user_login = this.user_login
    GenerateParams.title = this.arr_data[data_index].title

    this.var_service.deleteWishlist(GenerateParams).subscribe((response) => {
      console.log(response)
      this.arr_data.splice(data_index, 1);
      // this.get_api_func(this.skip, this.var_halaman_aktif_number)

    })
  }


  openNewTab(url) {
    window.open(url, '_blank');
  }


  get_api_func(skip = 0, halaman_aktif = 1) {

    console.log(" skip " + skip)
    console.log(" limit " + this.limit)
    console.log(" halaman aktif " + halaman_aktif)

    let Params = {
      user_login: this.user_login,
      limit: this.limit,
      skip: skip
    }

    this.var_service.getWishlist(Params).subscribe((response) => {


      this.arr_data = response.data
      this.Jumlah_Data_Table = response.count

      this.Jumlah_Halaman = Math.ceil(this.Jumlah_Data_Table / this.limit);

      this.var_jumlah_halaman_arr_loop = [];
      for (let x_array = 1; x_array <= this.Jumlah_Halaman; x_array++) {
        this.var_jumlah_halaman_arr_loop.push(x_array)
      }

      if (this.var_halaman_aktif > 1 && response.data.length == 0) {
        this.temp_page_cookie_boongan = 1
        this.var_halaman_aktif = "1"
        this.var_halaman_aktif_number = Number(halaman_aktif)
      } else {
        this.temp_page_cookie_boongan = halaman_aktif
        this.var_halaman_aktif = halaman_aktif
        this.var_halaman_aktif_number = Number(halaman_aktif)
      }


    })


  }







  // MANUAL PAGENATION


  page_next() {
    let var_page_next = this.temp_page_cookie_boongan
    if (this.Jumlah_Halaman == var_page_next) {
      this.temp_page_cookie_boongan = this.Jumlah_Halaman
      var_page_next = this.Jumlah_Halaman
      this.get_api_func((var_page_next * this.limit) - this.limit, var_page_next)
      this.var_halaman_aktif_number = this.temp_page_cookie_boongan
    } else {
      var_page_next = var_page_next + 1
      this.temp_page_cookie_boongan = var_page_next
      this.get_api_func((var_page_next * this.limit) - this.limit, var_page_next)
      this.var_halaman_aktif_number = this.temp_page_cookie_boongan
    }

  }

  page_prev() {
    let var_page_prev = this.temp_page_cookie_boongan
    if (var_page_prev == 1) {
      this.temp_page_cookie_boongan = 1
      var_page_prev = 1
      this.get_api_func((var_page_prev * this.limit) - this.limit, var_page_prev)
      this.var_halaman_aktif_number = this.temp_page_cookie_boongan
    } else {
      var_page_prev = var_page_prev - 1
      this.temp_page_cookie_boongan = var_page_prev
      this.get_api_func((var_page_prev * this.limit) - this.limit, var_page_prev)
      this.var_halaman_aktif_number = this.temp_page_cookie_boongan
    }
  }

  page_plus2() {
    let var_page = this.temp_page_cookie_boongan + 2
    if (var_page <= 0) {
    } else {
      let var_data_skip = (var_page * this.limit) - this.limit
      this.get_api_func(var_data_skip, var_page)
      this.temp_page_cookie_boongan = var_page
      this.var_halaman_aktif_number = this.temp_page_cookie_boongan
    }
  }


  page_plus1() {
    let var_page = this.temp_page_cookie_boongan + 1
    if (var_page <= 0) {
    } else {
      let var_data_skip = (var_page * this.limit) - this.limit
      this.get_api_func(var_data_skip, var_page)
      this.temp_page_cookie_boongan = var_page
      this.var_halaman_aktif_number = this.temp_page_cookie_boongan
    }
  }



  page_aktif() {
    let var_page = this.temp_page_cookie_boongan
    let var_data_skip = (var_page * this.limit) - 10
    this.get_api_func(var_data_skip, var_page)
    this.temp_page_cookie_boongan = var_page
    this.var_halaman_aktif_number = this.temp_page_cookie_boongan

  }

  page_min1() {

    let var_page = this.temp_page_cookie_boongan - 1
    if (var_page <= 0) {

    } else {

      let var_data_skip = (var_page * this.limit) - this.limit
      this.get_api_func(var_data_skip, var_page)
      this.temp_page_cookie_boongan = var_page
      this.var_halaman_aktif_number = this.temp_page_cookie_boongan
    }



  }

  page_min2() {

    let var_page = this.temp_page_cookie_boongan - 2
    if (var_page <= 0) {

    } else {

      let var_data_skip = (var_page * this.limit) - this.limit
      this.get_api_func(var_data_skip, var_page)
      this.temp_page_cookie_boongan = var_page
      this.var_halaman_aktif_number = this.temp_page_cookie_boongan
    }

  }

  page_first() {
    this.get_api_func(0, 1)
    this.var_halaman_aktif_number = 1
    //  this.temp_page_cookie_boongan
  }

  page_last() {
    this.get_api_func((this.Jumlah_Halaman * this.limit) - this.limit, this.Jumlah_Halaman)
    this.var_halaman_aktif_number = this.temp_page_cookie_boongan
  }

















}
