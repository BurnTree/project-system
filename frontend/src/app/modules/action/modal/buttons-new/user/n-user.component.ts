import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, FormControl} from "@angular/forms";
import {Task} from "../../../../task/models/task";
import {Subscription} from "rxjs";
import {User} from "../../../../task/models/user";
import {TaskService} from "../../../../../services/task.service";
import {UserService} from "../../../../../services/user.service";

@Component({
  selector: 'app-n-user',
  templateUrl: './n-user.component.html',
  styleUrls: ['./n-user.component.css']
})

export class NUserComponent implements OnInit{

  public test: string = " ";
  public newUser: User = new User();
  private subscriptions: Subscription[] = [];

  constructor(public userService: UserService, public activeRef: BsModalRef) { }

  ngOnInit(): void {
  }


  public _createNewUser():void{
    this.subscriptions.push(this.userService.saveUser(this.newUser).subscribe(()=>{
      this.newUser = new User();
    }));
    console.log(this.newUser);
  }
}
