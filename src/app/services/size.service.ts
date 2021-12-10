import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConstantService } from "./constant.service";
import { map, catchError } from "rxjs/operators";
import { CommonHttpService } from "./common-http.service";

@Injectable({
  providedIn: "root",
})
export class SizeService extends CommonHttpService {
  constructor(private http: HttpClient, private cs: ConstantService) {
    super();
  }

  public getSizeText() {
    return this.http.get(this.cs.getApiUrl(this.cs.getSizeText)).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public saveSizeText(text, text_sw) {
    return this.http.post(this.cs.getApiUrl(this.cs.saveSizeText), {text, text_sw}).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public getSize() {
    return this.http.get(this.cs.getApiUrl(this.cs.getSize)).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public createSize(name, amount) {
    return this.http.post(this.cs.getApiUrl(this.cs.createSize), {name, amount}).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public updateSize(_id, name, amount) {
    return this.http.post(this.cs.getApiUrl(this.cs.updateSize), {_id, name, amount}).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }

  public deleteSize(_id) {
    return this.http.post(this.cs.getApiUrl(this.cs.deleteSize), {_id}).pipe(
      map((Response) => {
        return Response;
      }),
      catchError(this.handleError)
    );
  }
}
