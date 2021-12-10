import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConstantService } from "./constant.service";
import { map, catchError } from "rxjs/operators";
import { CommonHttpService } from "./common-http.service";

@Injectable({
  providedIn: "root",
})
export class AddressService extends CommonHttpService {
  constructor(private http: HttpClient, private cs: ConstantService) {
    super();
  }

  public getAddress() {
    return this.http.get(this.cs.getApiUrl(this.cs.getAddress)).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public saveAddress(text, text_sw, latitude, longitude, working_hours, tell, website, email) {
    return this.http.post(this.cs.getApiUrl(this.cs.saveAddress), {text, text_sw, latitude, longitude, working_hours, tell, website, email}).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }
}
