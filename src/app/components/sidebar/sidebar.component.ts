import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filters, Game, Genre } from 'src/app/models';
import { GlobalContextService } from 'src/app/services/global-context.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private http: HttpService,
    private globalContext: GlobalContextService
  ) {}
  genres: Genre[] = [];
  filters: Filters = {
    search: '',
    genre: '',
  };
  subscriptions: Subscription[] = [];
  isLoading: boolean = false;
  ngOnInit(): void {
    this.isLoading = true;
    this.subscriptions[0] = this.http.getAllGameGenres().subscribe((value) => {
      this.genres = value.results;
      this.isLoading = false;
    });
    this.subscriptions[1] = this.globalContext.filtersSubject.subscribe(
      (value) => {
        this.filters = value;
      }
    );
  }

  searchByGenre(genre: string) {
    this.globalContext.filtersSubject.next({
      ...this.filters,
      genre,
    });
  }
  clearGenre() {
    this.filters.genre = '';
    this.globalContext.filtersSubject.next({
      ...this.filters,
      genre: '',
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
