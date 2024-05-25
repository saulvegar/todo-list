import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  form: FormGroup;
  type: string | null = null;
  id: string | null = null;
  todo: Todo | null;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');

    if (this.type as string === 'create') {
      this.form = this.fb.group({
        title: ['', Validators.required],
        description: ['', [Validators.required]],
      });
    }

    if (this.type as string === 'update') {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras?.state as Todo;

      if (state) {
        this.todo = { ...state };
        this.form = this.fb.group({
          title: [this.todo?.title, Validators.required],
          description: [this.todo?.description, [Validators.required]],
        });
      }
    }
  }

  public onSubmit() {
    if (this.form.valid) {
      const todo: Todo = { ...this.form.value, };

      let response$;
      if (this.type as string === 'create') {
        response$ = this.todoService.create(todo);
      }

      if (this.type as string === 'update') {
        response$ = this.todoService.update(todo, this.todo?._id as string);
      }

      response$?.subscribe(() => {
        this.form.reset();
        this.router.navigate(['/home']);
      });
    }
  }

}
