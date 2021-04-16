import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { SharedModule } from '../shared/shared.module';
import { TemperatureConverterRoutingModule } from './temperature-converter.routing.module';



@NgModule({
  declarations: [
    TemperatureComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TemperatureConverterRoutingModule
  ]
})
export class TemperatureConverterModule { }
