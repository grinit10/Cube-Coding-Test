import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { TemperatureState } from 'src/app/store/temperature/state/temperature.state';

import { TemperatureComponent } from './temperature.component';

describe('TemperatureComponent', () => {
  let component: TemperatureComponent;
  let fixture: ComponentFixture<TemperatureComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxsModule.forRoot([TemperatureState]),
      ],
      declarations: [ TemperatureComponent ]
    })
    .compileComponents();
    store = TestBed.inject(Store);
    store.reset({
      ...store.snapshot(),
      temperature: {
        temperatureConvertedResult: {},
        units: [],
        temperatureConvertedResultIsLoading: false,
        unitsIsLoading: false
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update store on init', () => {
    component.ngOnInit();
    expect(store.selectSnapshot(state => state.temperature.unitsIsLoading)).toEqual(true);
  });

  it('should submit form successfully', () => {
    component.temperatureForm.setValue({
      unit: 1,
      temperature: 23
    });
    component.onSubmit();
    expect(store.selectSnapshot(state => state.temperature.temperatureConvertedResultIsLoading)).toEqual(true);
  });

});
