import { DropDownModel } from 'src/app/shared/models/dropdown.model';
import { TemperatureViewModel } from 'src/app/shared/models/temperature-view.model';
import { TemperatureModel } from 'src/app/shared/models/temperature.model';

export class GetTemperatureConvertedResult {
    static readonly type = '[TemperatureConvertedResult] Get';

    constructor(public payload: TemperatureModel) { }
}

export class PopulateTemperatureConvertedResult {
    static readonly type = '[TemperatureConvertedResult] Populate';

    constructor(public payload: TemperatureViewModel) {
    }
}


export class GetTemperatureUnits {
    static readonly type = '[TemperatureUnits] Get';

    constructor() { }
}

export class AddTemperatureUnits {
    static readonly type = '[TemperatureUnits] Add';

    constructor(public payload: DropDownModel[]) {
    }
}
