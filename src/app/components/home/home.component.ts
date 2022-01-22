import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Filters, Game, initialFilters } from 'src/app/models';
import { GlobalContextService } from 'src/app/services/global-context.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private http: HttpService,
    private globalContext: GlobalContextService
  ) {}
  games: Game[] = [];
  isLoading: boolean = false;
  totalGames: number = 0;
  pageSize: number = 20;
  showFirstLastButtons: boolean = true;
  subscriptions: Subscription[] = [];
  filters: Filters = initialFilters;
  ngOnInit(): void {
    this.subscriptions[0] = this.globalContext.gamesSubject.subscribe(
      (value) => (this.games = value)
    );

    this.subscriptions[1] = this.globalContext.filtersSubject.subscribe((f) => {
      this.filters = f;

      this.fetchGames(f.search, f.genre, f.page);
    });
  }

  async fetchGames(search?: string, genre?: string, page?: number) {
    this.isLoading = true;
    const data = await this.http.getAllGames(search, genre, page).toPromise();
    this.games = data.results;
    this.totalGames = data.count;
    if (search && genre) this.globalContext.games = data.results;
    this.globalContext.gamesSubject.next(this.games);
    this.isLoading = false;
  }
  handlePageEvent(pageEvent: PageEvent) {
    this.globalContext.filtersSubject.next({
      ...this.filters,
      page: pageEvent.pageIndex + 1,
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
