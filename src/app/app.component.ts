import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
   rForm: FormGroup;
   post: any;
   description: string;
   name: string;
   Required: string = 'This field is required';

   constructor(public fbuilder: FormBuilder) {
     this.rForm = fbuilder.group({
         'name': [null, Validators.required],
         'description': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
         'validate': ''
     });
   }
ngOnInit() {
  this.rForm.get('validate').valueChanges.subscribe(
    validators => {  if (validators === '1') {
         this.rForm.get('name').setValidators([validators.required, Validators.minLength(3)]);
        } else {
           this.rForm.get('name').setValidators(Validators.required);
         }
         this.rForm.get('name').updateValueAndValidity();
    }
  );
}

   addPost(post) {
     this.name = post.value.name;
     this.description = post.value.description;
   }
}
