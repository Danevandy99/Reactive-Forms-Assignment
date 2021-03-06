import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectFormGroup: FormGroup;
  projectStatuses = ['Stable', 'Critical', 'Finished'];

  ngOnInit() {
    this.projectFormGroup = new FormGroup({
      'projectName': new FormControl(null, Validators.required, this.forbiddenProjectNames),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    console.log(this.projectFormGroup.value);
    this.projectFormGroup.reset();
  }

  /* forbiddenProjectNames(control: FormControl): { [s: string]: boolean } {
    return (control.value === "Test") ? { "forbiddenProjectName": true } : null;
  } */

  forbiddenProjectNames(control: FormControl): Promise<any> | Observable<any> {
    const promise =  new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "Test") {
          resolve({ "forbiddenProjectName": true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }  
}
