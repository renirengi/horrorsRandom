import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFilm } from 'src/app/interfaces/film';
import { IUser } from 'src/app/interfaces/user';

 export enum StarRatingColor {
    primary = "primary",
    accent = "accent",
    warn = "warn"
  }

  @Component ({
    selector: 'app-movie-rating',
    templateUrl: './movie-rating.component.html',
    styleUrls: ['./movie-rating.component.scss']
  })

  export class MovieRatingComponent  implements OnInit{
    @Input() rating?: number;
    @Input() user?: IUser;
    @Output() update = new EventEmitter<number>();

    public starCount: number = 10;
    public color: string = 'accent';
    public ratingArr: number[] = [];
    public message: string='';

      constructor() { }

    ngOnInit():void {
      for (let index = 0; index < this.starCount; index++) {
        this.ratingArr.push(index);
      }
    }
    onClick(rating:number) {
      this.update.emit(rating);
    }

    showIcon(index:number) {
      if(this.rating){
      if (this.rating >= index + 1) {
        return 'star';
      } else {
        return 'star_border';
      }
    }
    return false;
    }


}
