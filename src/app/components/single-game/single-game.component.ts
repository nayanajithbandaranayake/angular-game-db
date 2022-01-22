import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game, initialGame } from 'src/app/models';
import { GlobalContextService } from 'src/app/services/global-context.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-single-game',
  templateUrl: './single-game.component.html',
  styleUrls: ['./single-game.component.scss'],
})
export class SingleGameComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpService
  ) {}

  gameId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  game: Game = initialGame;
  showShowMore: boolean = true;
  originalDescription: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.fetchGame();
  }
  async fetchGame() {
    this.isLoading = true;
    const game = await this.http.getGame(this.gameId).toPromise();

    if (!game) {
      this.router.navigate(['/']);
    } else {
      this.originalDescription = game.description;
      let newDescription: string = '';

      if (game.description.length >= 275) {
        this.showShowMore = true;
        newDescription = game.description.slice(0, 275) + '...';
      } else {
        this.showShowMore = false;
        newDescription = game.description;
      }

      this.game = {
        ...game,
        description: newDescription,
      };
    }
    this.game.short_screenshots = await this.http
      .getGameScreenShots(this.game.id)
      .toPromise();
    this.isLoading = false;
  }
  showMoreOrLess() {
    const tempDescription = this.game.description;
    this.game.description = this.originalDescription;
    this.originalDescription = tempDescription;
  }
}
