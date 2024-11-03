import {inject, Injectable} from "@angular/core";
import HTTPMethod from "http-method-enum";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "@environment";

@Injectable({
  providedIn: "root",
})
export class DataService {
  httpClient = inject(HttpClient);

  apiBaseURL = environment.base_url;
  apiQueryStringV1 = "v1/";

  constructor() {
  }

  postDataWithoutToken(jsonData: unknown, endURL: string): Observable<HttpResponse<object>> {
    const apiURL = this.apiBaseURL + this.apiQueryStringV1 + endURL;
    return this.httpClient.request(HTTPMethod.POST, apiURL, {
      body: jsonData,
      observe: "response",
      headers: {withCredentials: "true", "Content-Type": "application/json"},
    });
  }

  getData(endURL: string, searchParams?: Map<string, any>): Observable<HttpResponse<object>> {
    const token = "Bearer " + localStorage.getItem("authToken");
    const apiURL = new URL(this.apiBaseURL + this.apiQueryStringV1 + endURL);
    searchParams?.forEach((value: string, key: string) => {
      apiURL.searchParams.append(key, value);
    });

    return this.httpClient.request(HTTPMethod.GET, apiURL.toString(), {
      headers: new HttpHeaders().set("Authorization", token).set("withCredentials", "true"),
      observe: "response",
    });
  }

  postData(jsonData: unknown, endURL: string): Observable<HttpResponse<object>> {
    const token = "Bearer " + localStorage.getItem("authToken");
    const apiURL = this.apiBaseURL + this.apiQueryStringV1 + endURL;
    return this.httpClient.request(HTTPMethod.POST, apiURL, {
      body: jsonData,
      headers: new HttpHeaders().set("Authorization", token),
      observe: "response",
    });
  }

  deleteData(endURL: string): Observable<HttpResponse<object>> {
    const token = "Bearer " + localStorage.getItem("authToken");
    const apiURL = this.apiBaseURL + this.apiQueryStringV1 + endURL;
    return this.httpClient.request(HTTPMethod.DELETE, apiURL, {
      headers: new HttpHeaders().set("Authorization", token),
      observe: "response",
    });
  }
}
