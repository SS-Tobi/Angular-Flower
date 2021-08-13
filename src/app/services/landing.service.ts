import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConstantService } from "./constant.service";
import { map, catchError } from "rxjs/operators";
import { CommonHttpService } from "./common-http.service";

@Injectable({
  providedIn: "root",
})
export class LandingService extends CommonHttpService {
  constructor(private http: HttpClient, private cs: ConstantService) {
    super();
  }

  public getLanding() {
    return this.http.get(this.cs.getApiUrl(this.cs.getLanding)).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public createLanding(title, description, type) {
    return this.http.post(this.cs.getApiUrl(this.cs.createLanding), {title, description, type}).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public updateLanding(_id, title, description, type) {
    return this.http.post(this.cs.getApiUrl(this.cs.updateLanding), {_id, title, description, type}).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public deleteLanding(_id) {
    return this.http.post(this.cs.getApiUrl(this.cs.deleteLanding), {_id}).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public upload(formData) {
    return this.http.post(this.cs.getApiUrl(this.cs.uploadLanding), formData).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }
}
