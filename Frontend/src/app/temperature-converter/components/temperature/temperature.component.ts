import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DropDownModel } from 'src/app/shared/models/dropdown.model';
import { TemperatureViewModel } from 'src/app/shared/models/temperature-view.model';
import { GetTemperatureConvertedResult, GetTemperatureUnits } from 'src/app/store/temperature/actions/temperature.actions';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {
  units: DropDownModel[] = [];
  temperatureForm: FormGroup;
  isUnitsLoading = true;
  temperatureConvertedResultIsLoading = false;
  temperatureConvertedResultIsLoaded = false;
  convertedTemperatureResult: TemperatureViewModel = {};


  constructor(public store: Store, private fb: FormBuilder) {
    this.store.select(state => state.temperature.units).subscribe((r: DropDownModel[]) => {
      this.units = r;
    });

    this.store.select(state => state.temperature.unitsIsLoading).subscribe((r: boolean) => {
      this.isUnitsLoading = r;
    });

    this.store.select(state => state.temperature.temperatureConvertedResult).subscribe((r: TemperatureViewModel) => {
      this.convertedTemperatureResult = r;
    });

    this.temperatureForm = this.fb.group({
      temperature: new FormControl(null, [Validators.required]),
      unit: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new GetTemperatureUnits());
  }

  onSubmit = () => {
    this.store.dispatch(new GetTemperatureConvertedResult(this.temperatureForm.value));
    this.store.select(state => state.temperature.temperatureConvertedResultIsLoading).subscribe((r: boolean) => {
      this.temperatureConvertedResultIsLoading = r;
      this.temperatureConvertedResultIsLoaded = !r;
    });
  }

}
