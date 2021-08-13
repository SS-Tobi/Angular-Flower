import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConstantService } from "./constant.service";
import { map, catchError } from "rxjs/operators";
import { CommonHttpService } from "./common-http.service";

@Injectable({
  providedIn: "root",
})
export class StyleService extends CommonHttpService {
  constructor(private http: HttpClient, private cs: ConstantService) {
    super();
  }

  public getStyleText() {
    return this.http.get(this.cs.getApiUrl(this.cs.getStyleText)).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public saveStyleText(text) {
    return this.http.post(this.cs.getApiUrl(this.cs.saveStyleText), {text}).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public getStyle() {
    return this.http.get(this.cs.getApiUrl(this.cs.getStyle)).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public createStyle(name, type) {
    return this.http.post(this.cs.getApiUrl(this.cs.createStyle), {name, type}).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public updateStyle(_id, name, type) {
    return this.http.post(this.cs.getApiUrl(this.cs.updateStyle), {_id, name, type}).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public deleteStyle(_id) {
    return this.http.post(this.cs.getApiUrl(this.cs.deleteStyle), {_id}).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public uploadStyle(formData) {
    return this.http.post(this.cs.getApiUrl(this.cs.uploadStyle), formData).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }
}
