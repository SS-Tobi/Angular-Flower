import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConstantService } from "./constant.service";
import { map, catchError } from "rxjs/operators";
import { CommonHttpService } from "./common-http.service";

@Injectable({
  providedIn: "root",
})
export class OrderService extends CommonHttpService {
  constructor(private http: HttpClient, private cs: ConstantService) {
    super();
  }

  public getOrder() {
    return this.http.get(this.cs.getApiUrl(this.cs.getOrder)).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

}
