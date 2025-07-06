import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { RestaurantAdsListComponent } from './listarrestaurantsads/listarrestaurantsads.component';

@Component({
  selector: 'app-restaurantsads',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RestaurantAdsListComponent],
  templateUrl: './restaurantsads.component.html',
  styleUrls: ['./restaurantsads.component.css'],
})
export class RestaurantsAdsComponent {
  constructor(public route: ActivatedRoute) {}
}
