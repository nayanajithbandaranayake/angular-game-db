import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filters, Game } from 'src/app/models';
import { GlobalContextService } from 'src/app/services/global-context.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private globalContext: GlobalContextService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  search: string = '';

  games: Game[] = [];
  filters: Filters = {
    search: '',
    genre: '',
  };

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions[0] = this.globalContext.gamesSubject.subscribe(
      (value) => (this.games = value)
    );
    this.subscriptions[1] = this.globalContext.filtersSubject.subscribe(
      (value) => (this.filters = value)
    );
  }

  searchGames() {
    this.globalContext.filtersSubject.next({
      ...this.filters,
      search: this.search,
    });
  }

  clearSearch() {
    this.search = '';
    this.filters.search = '';
    this.globalContext.filtersSubject.next({
      ...this.filters,
      search: '',
      genre: '',
      page: 1,
    });
    console.log(this.filters);
    this.router.navigate(['/']);
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
