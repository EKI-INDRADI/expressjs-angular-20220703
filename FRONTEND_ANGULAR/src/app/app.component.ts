import { Component, OnInit } from '@angular/core';
import { environment } from './../environments/environment';
// import * as $ from 'jquery';
//  import 'jquery' 
//  declare var $ : any;  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// 0  https://datatables.net/examples/styling/bootstrap4
// 1 https://www.geeksforgeeks.org/how-to-use-jquery-in-angular/
// semantik https://stackoverflow.com/questions/48459564/jquery-not-working-in-angular-4-while-using-semanti-ui

// SOLVED 
// 2 https://stackoverflow.com/questions/44938471/angular-cli-webpack-imported-module-1-jquery-collapse-is-not-a-functio
export class AppComponent implements OnInit  {
  title = 'rnd-appv2';
      ngOnInit() {
          // $(document).ready(function() {
          //   $('#dataTable').DataTable();
          // });
      }
}
