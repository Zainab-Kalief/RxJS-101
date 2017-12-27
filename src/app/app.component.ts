import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinct';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Instant Search';
  searchTerm: string;
  results;
  latestSearch = new Subject<string>();

  constructor(public http: Http) {
    this.results = this.latestSearch
    .debounceTime(500) // this will only emit a new value after a certian amount of time [500m] is passed since the last new value typed.
    .distinct() // this will only emit a new value if the new value typed has changed from the last value
    .filter(term => !!term) // this checks if the value is truthy / not an empty string
    .switchMap(term =>
      // we use switchMap when the func that we are passing in is returning an observable & the outter call is also an observable
      // so it flattens out the nested func call so you just have one observable
      this.http.get(`https://api.github.com/search/repositories?q=${term}:assembly&sort=stars&order=desc`)
      .map(response => response.json().items.map(item => item.name))
    );
  }

  newSearch(term) {
    this.latestSearch.next(term);
  }
}
