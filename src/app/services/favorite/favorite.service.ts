import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private apiUrl =
    'http://bm-app-env.eba-yspz5pwf.eu-north-1.elasticbeanstalk.com/api/favorites/';

  constructor(private http: HttpClient) {}

  getFavorite(): Observable<any> {
    return this.http.get(`${this.apiUrl}getFavorites`);
  }

  addFavorite(favorite: any): Observable<any> {
    return this.http.post(`${this.apiUrl}addFavorite`, favorite);
  }

  deleteFavorite(favoriteNumber: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}delete/${favoriteNumber}`);
  }
}
