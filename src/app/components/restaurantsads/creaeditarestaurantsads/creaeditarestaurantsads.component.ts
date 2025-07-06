import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RestaurantAds } from '../../../models/RestaurantAds';
import { RestaurantService } from '../../../services/restaurants.service';
import { RestaurantAdsService } from '../../../services/restaurantsads.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Restaurant } from '../../../models/Restaurants';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-creaeditarestaurantsads',
  templateUrl: './creaeditarestaurantsads.component.html',
  styleUrls: ['./creaeditarestaurantsads.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class CreaEditaRestaurantsAdsComponent implements OnInit {
  restaurantAdForm!: FormGroup;
  isEditMode: boolean = false;
  adId!: number;
  restaurants: Restaurant[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private restaurantAdsService: RestaurantAdsService,
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.adId = params['id'];
      this.isEditMode = !!this.adId;
      this.initForm();
      this.loadRestaurants();

      if (this.isEditMode) {
        this.restaurantAdsService.getRestaurantAdById(this.adId).subscribe((data) => {
          this.restaurantAdForm.patchValue({
            adId: data.adId,
            description: data.description,
            budget: data.budget,
            eventDate: data.eventDate,
            restaurantId: data.restaurantId
          });
          this.restaurantAdForm.get('adId')?.disable(); // Deshabilitar el campo adId en modo edición
        });
      }
    });
  }

  private initForm() {
    this.restaurantAdForm = this.formBuilder.group({
      adId: [{ value: '', disabled: this.isEditMode }], // Configuración inicial dependiendo de isEditMode
      description: ['', [Validators.required]],
      budget: [0, [Validators.required]],
      eventDate: ['', [Validators.required]],
      restaurantId: [null, [Validators.required]]
    });
  }

  private loadRestaurants() {
    this.restaurantService.list().subscribe((data) => {
      this.restaurants = data;
    });
  }

  saveRestaurantAd(): void {
    if (this.restaurantAdForm.valid) {
      const restaurantAdToSave: RestaurantAds = this.restaurantAdForm.getRawValue();
      restaurantAdToSave.adId = this.adId; // Asignar el id manualmente en modo edición

      if (this.isEditMode) {
        this.restaurantAdsService.update(restaurantAdToSave).subscribe(() => {
          this.snackBar.open('Anuncio actualizado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/restaurant_ads']);
        });
      } else {
        this.restaurantAdsService.create(restaurantAdToSave).subscribe(() => {
          this.snackBar.open('Anuncio registrado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.router.navigate(['/restaurant_ads']);
        });
      }
    } else {
      this.restaurantAdForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/restaurant_ads']);
  }
}
