import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConstantService } from "./constant.service";
import { map, catchError } from "rxjs/operators";
import { CommonHttpService } from "./common-http.service";

@Injectable({
  providedIn: "root",
})
export class ColorService extends CommonHttpService {
  constructor(private http: HttpClient, private cs: ConstantService) {
    super();
  }

  public getColorText() {
    return this.http.get(this.cs.getApiUrl(this.cs.getColorText)).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public saveColorText(text, text_sw) {
    return this.http.post(this.cs.getApiUrl(this.cs.saveColorText), {text, text_sw}).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public getColor() {
    return this.http.get(this.cs.getApiUrl(this.cs.getColor)).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

//   public createColor(name, type) {
//     return this.http.post(this.cs.getApiUrl(this.cs.createColor), {name, type}).pipe(
//       map((Response) => {
//         return Response;
//       }),
//       catchError(this.handleError)
//     );
//   }

  public updateColor(_id, type) {
    return this.http.post(this.cs.getApiUrl(this.cs.updateColor), {_id, type}).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

//   public deleteStyle(_id) {
//     return this.http.post(this.cs.getApiUrl(this.cs.deleteStyle), {_id}).pipe(
//       map((Response) => {
//         return Response;
//       }),
//       catchError(this.handleError)
//     );
//   }

  public uploadColor(formData) {
    return this.http.post(this.cs.getApiUrl(this.cs.uploadColor), formData).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }
}
