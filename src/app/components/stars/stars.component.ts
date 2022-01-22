import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent implements OnInit {
  constructor() {}

  @Input() rating: number = 0;
  stars: string[] = ['star', 'star_half', 'star_border'];

  ngOnInit(): void {}
  returnStar(i: number) {
    if (this.rating >= i - 0.2) return this.stars[0];
    else if (this.rating >= i - 0.7) return this.stars[1];
    else return this.stars[2];
  }
}
