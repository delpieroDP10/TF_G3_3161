import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessagesService } from '../../../services/messages.service';
import { UserService } from '../../../services/user.service';
import { RestaurantAdsService } from '../../../services/restaurantsads.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../../../models/User';
import { RestaurantAds } from '../../../models/RestaurantAds';
import { Message } from '../../../models/Messages';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-creaeditamessages',
  templateUrl: './creaeditamessages.component.html',
  styleUrls: ['./creaeditamessages.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class CreaEditaMessagesComponent implements OnInit {
  messageForm!: FormGroup;
  isEditMode: boolean = false;
  messageId!: number;
  users: User[] = [];
  restaurantAds: RestaurantAds[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private messagesService: MessagesService,
    private userService: UserService,
    private restaurantAdsService: RestaurantAdsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.messageId = params['id'];
      this.isEditMode = !!this.messageId;
      this.initForm();
      this.loadUsers();
      this.loadRestaurantAds();

      if (this.isEditMode) {
        this.messagesService.getMessageById(this.messageId).subscribe((data) => {
          this.messageForm.patchValue(data);
          this.messageForm.get('messageId')?.disable(); // Disable messageId in edit mode
        });
      }
    });
  }

  private initForm(): void {
    this.messageForm = this.formBuilder.group({
      messageId: [{ value: '', disabled: this.isEditMode }],
      messageText: ['', Validators.required],
      sentAt: ['', Validators.required],
      senderId: [null, Validators.required],
      receiverId: [null, Validators.required],
      restaurantAdsId: [null, Validators.required],
    });
  }

  private loadUsers(): void {
    this.userService.list().subscribe((data) => {
      this.users = data;
    });
  }

  private loadRestaurantAds(): void {
    this.restaurantAdsService.list().subscribe((data) => {
      this.restaurantAds = data;
    });
  }

  saveMessage(): void {
    if (this.messageForm.valid) {
      const messageToSave: Message = this.messageForm.getRawValue();
      if (this.isEditMode) {
        messageToSave.messageId = this.messageId;
        this.messagesService.update(messageToSave).subscribe(() => {
          this.snackBar.open('Mensaje actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/messages']);
        });
      } else {
        this.messagesService.create(messageToSave).subscribe(() => {
          this.snackBar.open('Mensaje registrado exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/messages']);
        });
      }
    } else {
      this.messageForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/messages']);
  }
}
