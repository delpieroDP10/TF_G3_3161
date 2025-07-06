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
import { RestaurantAds } from '../../../models/RestaurantAds';
import { RestaurantAdsService } from '../../../services/restaurantsads.service';

@Component({
  selector: 'app-listarrestaurantsads',
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
  templateUrl: './listarrestaurantsads.component.html',
  styleUrls: ['./listarrestaurantsads.component.css'],
})
export class RestaurantAdsListComponent implements OnInit {
  restaurantAdsDataSource: MatTableDataSource<RestaurantAds> = new MatTableDataSource();
  restaurantAdsDisplayedColumns: string[] = [
    'adId',
    'description',
    'budget',
    'eventDate',
    'restaurantId', // Relación con el ID del restaurante
    'actionDelete',
    'actionUpdate',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private restaurantAdsService: RestaurantAdsService) {}

  ngOnInit(): void {
    this.restaurantAdsService.list().subscribe((data) => {
      this.restaurantAdsDataSource = new MatTableDataSource(data);
      this.restaurantAdsDataSource.paginator = this.paginator;
      this.restaurantAdsDataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.restaurantAdsDataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteRestaurantAd(adId: number) {
    this.restaurantAdsService.delete(adId).subscribe(() => {
      this.restaurantAdsService.list().subscribe((data) => {
        this.restaurantAdsDataSource.data = data;
      });
    });
  }
}
