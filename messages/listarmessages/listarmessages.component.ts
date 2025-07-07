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
import { Message } from '../../../models/Messages';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-listarmessages',
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
  templateUrl: './listarmessages.component.html',
  styleUrls: ['./listarmessages.component.css'],
})
export class MessageListComponent implements OnInit {
  messageDataSource: MatTableDataSource<Message> = new MatTableDataSource();
  messageDisplayedColumns: string[] = [
    'messageId',
    'messageText',
    'sentAt',
    'senderId',
    'receiverId',
    'restaurantAdsId',
    'actionDelete',
    'actionUpdate',
  ];

  @ViewChild(MatPaginator) messagePaginator!: MatPaginator;
  @ViewChild(MatSort) messageSort!: MatSort;

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    // Llamada al método 'list' del servicio para obtener la lista de mensajes
    this.messagesService.list().subscribe((data) => {
      this.messageDataSource = new MatTableDataSource(data);
      this.messageDataSource.paginator = this.messagePaginator;
      this.messageDataSource.sort = this.messageSort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.messageDataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteMessage(messageId: number) {
    // Llamada al método 'delete' del servicio para eliminar un mensaje
    this.messagesService.delete(messageId).subscribe(() => {
      this.messagesService.list().subscribe((data) => {
        this.messageDataSource.data = data;
      });
    });
  }
}
