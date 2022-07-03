import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookListService } from './book-list.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  // styleUrls: ['./book-list.component.css']
  styles: [
    `

    .rating-list {
      display: inline-block;
      list-style: none;
    }
    .rating-list li {
      font-size: 20px;
      float: right;
      color: #ddd;
      padding: 10px 5px;
    }
    .rating-list li:hover {
      color: #ffd700;
    }
    .rating-list li:hover ~ li {
      color: #ffd700;
    }
    .rating-list li.selected {
      color: #ffd700;
    }

    `
  ]
})
export class BookListComponent implements OnInit {




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


  data_response: any = []
  user_login: string = ""
  user_rating: number = 0


  //==============RATING
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  isMouseover = true;
  //==============RATING


  ngOnInit() {


    if (this.var_service.user_login == "") {
      this.user_login = this.var_service.user_anonymous()
    } else {
      this.user_login = this.var_service.user_login
    }


    // this.get_data_func({
    //   book: "eki",
    //   limit: 10,
    //   skip: 1
    // })


    this.get_api_func(0, 1)

  }

  openNewTab(url) {
    window.open(url, '_blank');
  }

  // user_anonymous() {
  //   this.user_login = "user_" +
  //     + new Date().getFullYear() //+ "-"
  //     + ("0" + (new Date().getMonth() + 1)).slice(-2) //+ "-"
  //     + ("0" + new Date().getDate()).slice(-2) + "-"
  //     + Date.now();

  //   return this.user_login
  // }


  //==============RATING
  countStar(star: number, data_index: any = null) {
    this.isMouseover = false;
    this.selectedValue = star;
    // this.arr_data[data_index].rating = star

    let GenerateParams: any = {}
    GenerateParams.rating = star
    GenerateParams.title = this.arr_data[data_index].title
    GenerateParams.title = this.arr_data[data_index].volumeInfo.title
    GenerateParams.subtitle = this.arr_data[data_index].volumeInfo.subtitle
    GenerateParams.authorString = this.arr_data[data_index].volumeInfo.authorString
    GenerateParams.authors = this.arr_data[data_index].volumeInfo.authors
    GenerateParams.smallThumbnail = this.arr_data[data_index].volumeInfo.imageLinks.smallThumbnail
    GenerateParams.thumbnail = this.arr_data[data_index].volumeInfo.imageLinks.thumbnail
    GenerateParams.publishedDate = this.arr_data[data_index].volumeInfo.publishedDate
    GenerateParams.infoLink = this.arr_data[data_index].volumeInfo.infoLink
    GenerateParams.printType = this.arr_data[data_index].volumeInfo.printType


    this.var_service.createUpdateRating(GenerateParams).subscribe((response) => {
      this.arr_data[data_index].rating = response.rating
    })



  }

  addClass(star: number) {
    if (this.isMouseover) {
      this.selectedValue = star;
    }
  }

  removeClass() {
    if (this.isMouseover) {
      this.selectedValue = 0;
    }
  }
  //==============RATING


  create_wishlist(data_index: any = null) {

    let GenerateParams: any = {}
    GenerateParams.user_login = this.user_login
    GenerateParams.title = this.arr_data[data_index].volumeInfo.title
    GenerateParams.subtitle = this.arr_data[data_index].volumeInfo.subtitle
    GenerateParams.authorString = this.arr_data[data_index].volumeInfo.authorString
    GenerateParams.authors = this.arr_data[data_index].volumeInfo.authors
    GenerateParams.smallThumbnail = this.arr_data[data_index].volumeInfo.imageLinks.smallThumbnail
    GenerateParams.thumbnail = this.arr_data[data_index].volumeInfo.imageLinks.thumbnail
    GenerateParams.publishedDate = this.arr_data[data_index].volumeInfo.publishedDate
    GenerateParams.rating = this.arr_data[data_index].rating
    GenerateParams.infoLink = this.arr_data[data_index].volumeInfo.infoLink
    GenerateParams.printType = this.arr_data[data_index].volumeInfo.printType

    this.var_service.createWishlist(GenerateParams).subscribe(
      (response) => {
    //  console.log(response)
        this.arr_data[data_index].wishlist = 1
      },
      (error) => {
      // console.log(error)
        if (error.statusCode == 0 && error.message == 'already exist') {
          this.arr_data[data_index].wishlist = 1
        }
      }


    )


  }


  delete_wishlist(data_index: any = null) {

    let GenerateParams: any = {}
    GenerateParams.user_login = this.user_login
    GenerateParams.title = this.arr_data[data_index].volumeInfo.title

    this.var_service.deleteWishlist(GenerateParams).subscribe((response) => {

      this.arr_data[data_index].wishlist = 0
      // this.get_api_func(this.skip, this.var_halaman_aktif_number)

    })
  }


  get_api_func(skip = 0, halaman_aktif = 1) {

    console.log(" skip " + skip)
    console.log(" limit " + this.limit)
    console.log(" halaman aktif " + halaman_aktif)

    let Params = {
      user_login: this.user_login,
      book: this.var_search,
      limit: this.limit,
      skip: skip
    }

    this.var_service.getBook(Params).subscribe((response) => {


      this.data_response = response.data
      this.arr_data = response.data
      this.Jumlah_Data_Table = response.data.count
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
