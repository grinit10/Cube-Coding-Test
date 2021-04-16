import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TemperatureViewModel } from 'src/app/shared/models/temperature-view.model';
import { TemperatureModel } from 'src/app/shared/models/temperature.model';
import { DataService } from 'src/app/shared/services/data.service';
import { ReadService } from 'src/app/shared/services/read.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TemperatureService extends DataService {

    constructor(public readService: ReadService,
                public http: HttpClient) {
        super(readService, `${environment.apiBaseUri}/Temperature`);
    }

    getConvertedTemperature = (temperatureModel: TemperatureModel): Observable<TemperatureViewModel> =>
        this.readService.readAll<TemperatureViewModel>(temperatureModel, this.url)

    getTemperatureUnits = (): Observable<TemperatureViewModel> =>
        this.readService.readAll<TemperatureViewModel>(null, `${this.url}/units`)
}
