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
import { ArtistApplication } from '../../../models/ArtistApplications';
import { ArtistApplicationsService } from '../../../services/artistapplications.service';

@Component({
  selector: 'app-listarartistapplications',
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
  templateUrl: './listarartistapplications.component.html',
  styleUrls: ['./listarartistapplications.component.css'],
})
export class ArtistApplicationListComponent implements OnInit {
  artistApplicationDataSource: MatTableDataSource<ArtistApplication> = new MatTableDataSource();
  artistApplicationDisplayedColumns: string[] = [
    'applicationId',
    'status',
    'appliedAt',
    'restaurantAdsId',
    'artistProfileId',
    'actionDelete',
    'actionUpdate',
  ];

  @ViewChild(MatPaginator) artistApplicationPaginator!: MatPaginator;
  @ViewChild(MatSort) artistApplicationSort!: MatSort;

  constructor(private artistApplicationsService: ArtistApplicationsService) {}

  ngOnInit(): void {
    this.artistApplicationsService.list().subscribe((data) => {
      this.artistApplicationDataSource = new MatTableDataSource(data);
      this.artistApplicationDataSource.paginator = this.artistApplicationPaginator;
      this.artistApplicationDataSource.sort = this.artistApplicationSort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.artistApplicationDataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteArtistApplication(applicationId: number) {
    this.artistApplicationsService.delete(applicationId).subscribe(() => {
      this.artistApplicationsService.list().subscribe((data) => {
        this.artistApplicationDataSource.data = data;
      });
    });
  }
}
