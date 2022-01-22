import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {} from 'rxjs';
import { environment as env } from '../../environments/environment';
import { Game, GamesResponse, Genres, ScreenShots } from '../models';
import { map, tap } from 'rxjs/operators';

let params = new HttpParams().append('key', env.api_key);

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getAllGames(
    search?: string,
    genre?: string,
    page?: number
  ): Observable<GamesResponse> {
    let localParams = params;
    if (search) localParams = localParams.set('search', search);
    if (genre) localParams = localParams.set('genres', genre);
    if (page) localParams = localParams.set('page', page);
    console.log(genre);

    return this.http.get<GamesResponse>(`${env.base_url}/games`, {
      params: localParams,
    });
  }
  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${env.base_url}/games/${id}`, {
      params,
    });
  }
  getAllGameGenres(): Observable<Genres> {
    return this.http.get<Genres>(`${env.base_url}/genres`, {
      params,
    });
  }

  getGameScreenShots(id: number): Observable<ScreenShots[]> {
    let localParams = params;
    localParams = localParams.append('page_size', 5);
    return this.http
      .get<{
        results: ScreenShots[];
      }>(`${env.base_url}/games/${id}/screenshots`, { params: localParams })
      .pipe(
        tap((value) => {
          console.log(value);
        }),
        map((value) => value.results)
      );
  }
}
