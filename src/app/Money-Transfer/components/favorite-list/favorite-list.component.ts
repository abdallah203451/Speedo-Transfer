import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';
import { FavoriteService } from '../../../services/favorite/favorite.service';
import { Favorite } from '../../../models/favorite';

@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.scss',
})
export class FavoriteListComponent {
  ref: DialogRef = inject(DialogRef);
  favorites: Favorite[] = [];
  constructor(private fav: FavoriteService) {}

  ngOnInit() {
    this.fav.getFavorite().subscribe({
      next: (data) => {
        this.favorites = <Favorite[]>data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  chooseFavorite(favorites: Favorite) {
    this.ref.close(favorites);
  }
}
