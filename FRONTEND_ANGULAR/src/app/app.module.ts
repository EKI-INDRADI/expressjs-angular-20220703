import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';   // ReactiveFormsModule == untuk keperluan array form  ,

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // keperluan chart

import { ModalsComponent } from './modals/modals.component'; //ini component
import { ModalModule } from './_eki_modal_service';
// ini service





import { BookListComponent } from './book-list/book-list.component';
import { BookListWhislistComponent } from './book-list/book-list-whislist/book-list-whislist.component';
import { DatePipe } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,

    ModalsComponent,


    BookListComponent,
    BookListWhislistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // keperluan charts
    ModalModule, // Modals service
    ReactiveFormsModule, // keperluan array form     dan dynamic form

  ],

  providers: [DatePipe, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
