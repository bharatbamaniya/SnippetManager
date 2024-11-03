import {inject, Injectable} from '@angular/core';
import {Snippet} from "./single-snippet/single-snippet.component";
import {DataService} from "../../shared/services/data.service";

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  dataService = inject(DataService);

  constructor() {
  }

  addSnippet(snippet: Snippet) {
    return this.dataService.postData(snippet, 'snippets');
  }

  getSnippets() {
    return this.dataService.getData('snippets');
  }
}
