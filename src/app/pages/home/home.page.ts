import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todos: Todo[] = [];
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: (todo: Todo) => {
        this.deleteTodo(todo);
      },
    },
  ];

  constructor(
    private alertController: AlertController,
    private todoService: TodoService,
    private router: Router,
  ) {
    this.getAll();
  }

  getAll() {
    this.todoService.getAll().subscribe((todos: Todo[]) => {
      this.todos = todos;
    })
  }

  ionViewWillEnter() {
    // Reset component state here
    this.getAll();
  }

  async deleteTodo(todo: Todo) {
    const confirmed = await this.confirmAction();

    if (confirmed) {
      this.todoService.delete(todo?._id as string).subscribe(() => {
        this.getAll();
      });
    }
  }

  async completeTodo(todo: Todo) {
    this.todoService.complete(todo._id as string).subscribe(() => {
      this.getAll();
    });
  }

  public goToUpdate(todo: Todo) {
    this.router.navigate(['/create', 'update'], { state: todo });
  }

  async confirmAction(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirm Action',
        message: 'Are you sure you want to proceed?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              resolve(false); // Resolve with false if cancelled
            }
          },
          {
            text: 'Okay',
            handler: () => {
              resolve(true); // Resolve with true if confirmed
            }
          }
        ]
      });
      await alert.present();
    });
  }

}
