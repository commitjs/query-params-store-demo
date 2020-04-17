import { Component } from '@angular/core';
import { QueryParamsStore } from 'query-params-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'query-params-store-demo';
  constructor(queryParamsStore: QueryParamsStore) {
    queryParamsStore.store.subscribe(console.log);
  }
}
