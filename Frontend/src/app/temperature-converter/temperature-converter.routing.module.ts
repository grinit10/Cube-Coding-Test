import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemperatureComponent } from './components/temperature/temperature.component';

const routes: Routes = [
  {
    path: '',
    component: TemperatureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemperatureConverterRoutingModule { }
