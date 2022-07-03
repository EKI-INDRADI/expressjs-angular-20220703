
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ModalsComponent } from './modals/modals.component';

import { BookListComponent } from "./book-list/book-list.component";
import { BookListWhislistComponent } from "./book-list/book-list-whislist/book-list-whislist.component";



const routes: Routes = [

    {
        path: '', component: BookListComponent
    },

    {
        path: 'book-list-page',
        children: [{
            path: '', component: BookListComponent
        },
        {
            path: 'wishlist', component: BookListWhislistComponent
        }]
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {


}
