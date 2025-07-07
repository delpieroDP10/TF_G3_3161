import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArtistApplicationsService } from '../../../services/artistapplications.service';
import { ArtistProfileService } from '../../../services/artistprofile.service';
import { RestaurantAdsService } from '../../../services/restaurantsads.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RestaurantAds } from '../../../models/RestaurantAds';
import { ArtistProfile } from '../../../models/ArtistProfile';
import { ArtistApplication } from '../../../models/ArtistApplications';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-creaeditaartistapplications',
  templateUrl: './creaeditaartistapplications.component.html',
  styleUrls: ['./creaeditaartistapplications.component.css'],
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
export class CreaEditaArtistApplicationComponent implements OnInit {
  artistApplicationForm!: FormGroup;
  isEditMode: boolean = false;
  applicationId!: number;
  restaurantAds: RestaurantAds[] = [];
  artistProfiles: ArtistProfile[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private artistApplicationsService: ArtistApplicationsService,
    private artistProfileService: ArtistProfileService,
    private restaurantAdsService: RestaurantAdsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.applicationId = params['id'];
      this.isEditMode = !!this.applicationId;
      this.initForm();
      this.loadRestaurantAds();
      this.loadArtistProfiles();

      if (this.isEditMode) {
        this.artistApplicationsService.getArtistApplicationById(this.applicationId).subscribe((data) => {
          this.artistApplicationForm.patchValue(data);
          this.artistApplicationForm.get('applicationId')?.disable();
        });
      }
    });
  }

  private initForm(): void {
    this.artistApplicationForm = this.formBuilder.group({
      applicationId: [{ value: '', disabled: this.isEditMode }],
      status: ['', Validators.required],
      appliedAt: ['', Validators.required],
      restaurantAdsId: [null, Validators.required],
      artistProfileId: [null, Validators.required],
    });
  }

  private loadRestaurantAds(): void {
    this.restaurantAdsService.list().subscribe((data) => {
      this.restaurantAds = data;
    });
  }

  private loadArtistProfiles(): void {
    this.artistProfileService.list().subscribe((data) => {
      this.artistProfiles = data;
    });
  }

  saveArtistApplication(): void {
    if (this.artistApplicationForm.valid) {
      const artistApplicationToSave: ArtistApplication = this.artistApplicationForm.getRawValue();
      if (this.isEditMode) {
        artistApplicationToSave.applicationId = this.applicationId;
        this.artistApplicationsService.update(artistApplicationToSave).subscribe(() => {
          this.snackBar.open('Aplicación de artista actualizada exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/artist-applications']);
        });
      } else {
        this.artistApplicationsService.create(artistApplicationToSave).subscribe(() => {
          this.snackBar.open('Aplicación de artista registrada exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/artist-applications']);
        });
      }
    } else {
      this.artistApplicationForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/artist-applications']);
  }
}
