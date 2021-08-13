import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ConstantService {

  public getLanding = "landing";
  public createLanding = "landing/create";
  public updateLanding = "landing/update";
  public deleteLanding = "landing/delete";
  public uploadLanding = "landing/upload";

  public getStyleText = "style/text";
  public saveStyleText = "style/save-text";
  public getStyle = "style";
  public createStyle = "style/create";
  public updateStyle = "style/update";
  public deleteStyle = "style/delete";
  public uploadStyle = "style/upload";

  public getColorText = "color/text";
  public saveColorText = "color/save-text";
  public getColor = "color";
  public updateColor = "color/update";
  public uploadColor = "color/upload";

  public getSizeText = "size/text";
  public saveSizeText = "size/save-text";
  public getSize = "size";
  public createSize = "size/create";
  public updateSize = "size/update";
  public deleteSize = "size/delete";

  public getOrder = "order";

  public getAddress = "address/";
  public saveAddress = "address/save";

  constructor() {}
  /**
   * @description get api endpoint from base url
   * @param path
   */
  public getApiUrl(path: string) {
    return environment.baseUrl + path;
  }
}
