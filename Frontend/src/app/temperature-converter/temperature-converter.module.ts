import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { SharedModule } from '../shared/shared.module';
import { TemperatureConverterRoutingModule } from './temperature-converter.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TemperatureComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TemperatureConverterRoutingModule
  ]
})
export class TemperatureConverterModule { }
