import {Component, Input, OnInit} from "@angular/core";
import {Task} from "../../../../models/task";
import {BsModalRef} from "ngx-bootstrap";
import {UserService} from "../../../../../services/user.service";
import {TaskService} from "../../../../../services/task.service";
import {AuthService} from "../../../../../services/auth.service";
import {User} from "../../../../models/user";

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html'
})

export class NewCommentComponent implements OnInit{

  @Input()
  public task: Task;
  @Input()
  public activeRef: BsModalRef;
  public user: User;
  public newComment: string;
  public nowData: Date = new Date();
  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  constructor(
              public taskService: TaskService,
              public authService: AuthService) {
  }

  public addComment(){
    this.task.comments += this.nowData.getDate() + "."
      + this.nowData.getDay() + " : "
      + this.nowData.getHours() + " h "
      + this.nowData.getMinutes() + " min : "
      + this.user.firstName + " "
      + this.user.secondName + ": "
      + this.newComment + "\n";
    this.taskService.updateTask(this.task).subscribe((data: Task) => {
      console.log("Comment add");
      this.activeRef.hide();
      }
    );
  }
}
