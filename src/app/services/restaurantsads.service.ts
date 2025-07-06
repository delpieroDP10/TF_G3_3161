import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RestaurantAds } from '../models/RestaurantAds';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RestaurantAdsService {
  private url = `${base_url}/restaurant_ads`;  // Ruta al backend para RestaurantAds

  constructor(private http: HttpClient) {}

  // Crear encabezados de autorización
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Obtener todos los anuncios de restaurantes
  list(): Observable<RestaurantAds[]> {
    return this.http.get<RestaurantAds[]>(this.url, { headers: this.createAuthorizationHeader() });
  }

  // Obtener un anuncio de restaurante por ID
  getRestaurantAdById(id: number): Observable<RestaurantAds> {
    return this.http.get<RestaurantAds>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  // Crear un nuevo anuncio de restaurante
  create(restaurantAd: RestaurantAds): Observable<RestaurantAds> {
    return this.http.post<RestaurantAds>(this.url, restaurantAd, { headers: this.createAuthorizationHeader() });
  }

  // Actualizar un anuncio de restaurante
  update(restaurantAd: RestaurantAds): Observable<RestaurantAds> {
    return this.http.put<RestaurantAds>(`${this.url}/${restaurantAd.adId}`, restaurantAd, { headers: this.createAuthorizationHeader() });
  }

  // Eliminar un anuncio de restaurante
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`, { headers: this.createAuthorizationHeader() });
  }
}
