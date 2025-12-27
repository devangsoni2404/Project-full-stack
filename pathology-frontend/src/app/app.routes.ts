import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestMasterComponent } from './test-master/test-master';
import { TestOrderComponent } from './test-order/test-order';
import { ResultEntryComponent } from './result-entry/result-entry';

export const routes: Routes = [
  { path: 'tests', component: TestMasterComponent },
  { path: 'orders', component: TestOrderComponent },
  { path: 'results', component: ResultEntryComponent },
  { path: '', redirectTo: 'tests', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
