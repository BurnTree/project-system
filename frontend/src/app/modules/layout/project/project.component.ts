import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../../services/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Task} from "../../models/task";
import {Subscription} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {count} from "rxjs/operators";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  task: Task;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private authService: AuthService,
    private loadingService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.loadingService.show();
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.taskService.getById(id).subscribe((task: any) => {
          if (task) {
            this.task = task;
          } else
            this.router.navigate(['/not-found']);
        }, (e: HttpErrorResponse) => {
          console.log(e);
          // if (e.status === 404) {
          console.log('This task not found');
          this.router.navigate(['/not-found']);
          // };
        })
      }
    });
    this.loadingService.hide();
  }

  public logoutSubmit() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
