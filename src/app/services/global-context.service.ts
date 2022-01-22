import { Injectable } from '@angular/core';
import { Filters, Game, initialFilters, initialGame } from '../models';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalContextService {
  constructor() {}
  games: Game[] = [];
  gamesSubject: BehaviorSubject<Game[]> = new BehaviorSubject(this.games);
  filtersSubject: BehaviorSubject<Filters> = new BehaviorSubject(
    initialFilters
  );

  setGamesToDefault() {
    this.gamesSubject.next(this.games);
  }
}
