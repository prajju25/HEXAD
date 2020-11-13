import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BorrowedCartComponent } from './borrowed-cart/borrowed-cart.component';
import { LibraryComponent } from './library/library.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
  path:'',
  redirectTo:'login',
  pathMatch: 'full'
},{
  path:'login',
  component: LoginComponent
},{
  path:'library',
  component: LibraryComponent
},{
  path: 'cart',
  component: BorrowedCartComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
