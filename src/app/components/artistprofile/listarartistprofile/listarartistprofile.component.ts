import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArtistProfile } from '../../../models/ArtistProfile';
import { ArtistProfileService } from '../../../services/artistprofile.service';

@Component({
  selector: 'app-listarartistprofile',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
  ],
  templateUrl: './listarartistprofile.component.html',
  styleUrls: ['./listarartistprofile.component.css'],
})
export class ArtistProfileListComponent implements OnInit {
  artistProfileDataSource: MatTableDataSource<ArtistProfile> = new MatTableDataSource();
  artistProfileDisplayedColumns: string[] = [
    'artistId',
    'bio',
    'experience',
    'portfolioUrl',
    'userId',
    'actionDelete',
    'actionUpdate',
  ];

  @ViewChild(MatPaginator) artistProfilePaginator!: MatPaginator;
  @ViewChild(MatSort) artistProfileSort!: MatSort;

  constructor(private artistProfileService: ArtistProfileService) {}

  ngOnInit(): void {
    // Llamada al método 'list' del servicio para obtener la lista de perfiles de artistas
    this.artistProfileService.list().subscribe((data) => {
      this.artistProfileDataSource = new MatTableDataSource(data);
      this.artistProfileDataSource.paginator = this.artistProfilePaginator;
      this.artistProfileDataSource.sort = this.artistProfileSort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.artistProfileDataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteArtistProfile(artistId: number) {
    // Llamada al método 'delete' del servicio para eliminar un perfil de artista
    this.artistProfileService.delete(artistId).subscribe(() => {
      this.artistProfileService.list().subscribe((data) => {
        this.artistProfileDataSource.data = data;
      });
    });
  }
}
