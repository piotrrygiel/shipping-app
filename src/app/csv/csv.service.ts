import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import * as Papa from 'papaparse';

@Injectable({
  providedIn: "root"
})
export class CsvService {
  parseCsv(file: File): Observable<any> {
    return new Observable<any>((observer) => {
      Papa.parse(file, {
        header: false,
        complete: (result) => {
          const data = result.data;
          const zoneMap = {};
          data.forEach(row => {
            const zone = parseInt(row[0]);
            const shippingCost = parseInt(row[1]);
            zoneMap[zone] = shippingCost;
          })
          localStorage.setItem('zoneMap', JSON.stringify(zoneMap));
          observer.next(zoneMap);
          observer.complete();
        }
      })
    });
  }
}
