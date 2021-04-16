import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { DropDownModel } from 'src/app/shared/models/dropdown.model';
import { TemperatureViewModel } from 'src/app/shared/models/temperature-view.model';
import { TemperatureService } from 'src/app/temperature-converter/services/temperature-converter.service';
import { AddTemperatureUnits, GetTemperatureConvertedResult, GetTemperatureUnits, PopulateTemperatureConvertedResult } from '../actions/temperature.actions';
import { TemperatureModel } from 'src/app/shared/models/temperature.model';

export class TemperatureStateModel {
    temperatureConvertedResult: TemperatureViewModel = {};
    units: DropDownModel[] = [];
    temperatureConvertedResultIsLoading = false;
    unitsIsLoading = false;
}

@State<TemperatureStateModel>({
    name: 'temperature',
    defaults: {
        temperatureConvertedResult: {},
        units: [],
        temperatureConvertedResultIsLoading: false,
        unitsIsLoading: false
    }
})

@Injectable()
export class TemperatureState {

    constructor(private temperatureService: TemperatureService, private store: Store) {
    }

    @Selector()
    static getUnits(state: TemperatureStateModel): DropDownModel[] {
        return state.units;
    }

    @Selector()
    static getTemperatureConvertedResult(state: TemperatureStateModel): TemperatureViewModel {
        return state.temperatureConvertedResult;
    }

    @Action(GetTemperatureConvertedResult)
    GetTemperatureConvertedResult({ getState, setState }: StateContext<TemperatureStateModel>,
                                  { payload }: GetTemperatureConvertedResult): void {
        const state = getState();
        setState({
            ...state,
            temperatureConvertedResultIsLoading: true,
        });
        this.temperatureService.getConvertedTemperature(payload).pipe(tap((result: TemperatureViewModel) => {
            this.store.dispatch(new PopulateTemperatureConvertedResult(result));
        })).subscribe();
    }

    @Action(PopulateTemperatureConvertedResult)
    PopulateTemperatureConvertedResult({ getState, patchState }: StateContext<TemperatureStateModel>,
                                       { payload }: PopulateTemperatureConvertedResult): void {
        const state = getState();
        patchState({
            ...state,
            temperatureConvertedResult: { ...payload },
            temperatureConvertedResultIsLoading: false,
        });
    }

    @Action(GetTemperatureUnits)
    GetTemperatureTypes({ getState, setState }: StateContext<TemperatureStateModel>): void {
        const state = getState();
        setState({
            ...state,
            unitsIsLoading: true,
        });
        this.temperatureService.getTemperatureUnits().pipe(tap((result: DropDownModel[]) => {
            this.store.dispatch(new AddTemperatureUnits(result));
        })).subscribe();
    }

    @Action(AddTemperatureUnits)
    AddTemperatureUnits({ getState, patchState }: StateContext<TemperatureStateModel>,
                        { payload }: AddTemperatureUnits): void {
        const state = getState();
        patchState({
            ...state,
            units: [...state.units, ...payload],
            unitsIsLoading: false,
        });
    }

}

