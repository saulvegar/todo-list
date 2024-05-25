import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import * as moment from 'moment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  id: string | null = null;
  todo: Todo | null = null;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.todoService.getById(this.id as string).subscribe((todo: Todo) => {
      this.todo = todo;
    })
  }

  public completeTodo() {
    this.todoService.complete(this.todo?._id as string)
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }

  public formatDate(date: string | undefined): string {
    if (!date) {
      return '';
    }

    return moment(date).format('DD/MM/YYYY hh:mm');
  }

}
