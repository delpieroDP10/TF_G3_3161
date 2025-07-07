import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArtistProfileService } from '../../../services/artistprofile.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../../../models/User';
import { ArtistProfile } from '../../../models/ArtistProfile';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-creaeditaartistprofile',
  templateUrl: './creaeditaartistprofile.component.html',
  styleUrls: ['./creaeditaartistprofile.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class CreaEditaArtistProfileComponent implements OnInit {
  artistProfileForm!: FormGroup;
  isEditMode: boolean = false;
  artistId!: number;
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private artistProfileService: ArtistProfileService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.artistId = params['id'];
      this.isEditMode = !!this.artistId;
      this.initForm();
      this.loadUsers();

      if (this.isEditMode) {
        this.artistProfileService.getArtistProfileById(this.artistId).subscribe((data) => {
          this.artistProfileForm.patchValue(data);
          this.artistProfileForm.get('artistId')?.disable(); // Desactivar el campo ID en modo edición
        });
      }
    });
  }

  private initForm(): void {
    this.artistProfileForm = this.formBuilder.group({
      artistId: [{ value: '', disabled: this.isEditMode }],
      bio: ['', Validators.required],
      experience: ['', Validators.required],
      portfolioUrl: [''],
      userId: [null, Validators.required],
    });
  }

  private loadUsers(): void {
    this.userService.list().subscribe((data) => {
      this.users = data;
    });
  }

  saveArtistProfile(): void {
    if (this.artistProfileForm.valid) {
      const artistProfileToSave: ArtistProfile = this.artistProfileForm.getRawValue();
      if (this.isEditMode) {
        artistProfileToSave.artistId = this.artistId;
        this.artistProfileService.update(artistProfileToSave).subscribe(() => {
          this.snackBar.open('Perfil de artista actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/artist-profiles']);
        });
      } else {
        this.artistProfileService.create(artistProfileToSave).subscribe(() => {
          this.snackBar.open('Perfil de artista registrado exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/artist-profiles']);
        });
      }
    } else {
      this.artistProfileForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/artist-profiles']);
  }
}
