import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {User} from "../../../../models/user";
import {Subscription} from "rxjs";
import {Project} from "../../../../models/project";
import {ProjectService} from "../../../../../services/project.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {validate} from "codelyzer/walkerFactory/walkerFn";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
  selector: 'app-n-project',
  templateUrl: './n-project.component.html',
  styleUrls: ['./n-project.component.css']
})

export class NProjectComponent implements OnInit {

  public newProject: Project = new Project();
  public allProject: Project[] =[];
  public isNewProject: boolean = false;
  private subscriptions: Subscription[] = [];

  projectForm = new FormGroup({
    name: new FormControl('', {validators: [Validators.required, Validators.minLength(2), Validators.maxLength(10)]}),
    summary: new FormControl('', {validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)]}),
  })

  constructor(//public activeModal: NgbActiveModal,
    public projectService: ProjectService,
    public activeRef: BsModalRef,
    private loadingService: Ng4LoadingSpinnerService) {
  }

  ngOnInit(): void {
    this.projectService.getAllProject().subscribe((data: Project[]) => {
      data.forEach((p: Project) => this.allProject.push(p));
    });
  }

  public _createNewProject(): void {
    this.loadingService.show();
    this.newProject.nameProject = this.projectForm.get('name').value;
    this.newProject.summary = this.projectForm.get('summary').value;
    if(!this.searchCreatedProject())
    this.subscriptions.push(this.projectService.saveProject(this.newProject).subscribe(() => {
      this.newProject = new Project();
      console.log("Project created");
      this.activeRef.hide();
    }));
    console.log(this.newProject);
    this.loadingService.hide();
  }

  public searchCreatedProject():boolean{
    this.isNewProject = false;
    this.allProject.forEach((u: Project)=> {
        if (this.newProject.nameProject === u.nameProject)
          this.isNewProject = true;
      }
    )
    return this.isNewProject;
  }
}
