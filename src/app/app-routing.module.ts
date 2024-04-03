import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShippingComponent} from "./shipping/shipping.component";

const routes: Routes = [
  { path: '', redirectTo: '/shipping', pathMatch: 'full' },
  { path: 'shipping', component: ShippingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
