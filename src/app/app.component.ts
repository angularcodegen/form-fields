import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnDestroy {
  form = new FormGroup({
    login: new FormControl(null, [Validators.required, Validators.maxLength(5)]),
    password: new FormControl(null, [Validators.required, Validators.maxLength(5)], [exampleAsyncValidator]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  get login(): FormControl {
    return this.form.get('login') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  toggleEmailControl = new FormControl(false);

  private toggleEmailSub = this.toggleEmailControl.valueChanges.subscribe(() => this.toggleEmail());

  toggleEmail() {
    const hours = this.form.get('email')!;
    hours.enabled ? hours.disable() : hours.enable();
  }

  ngOnDestroy(): void {
    this.toggleEmailSub.unsubscribe();
  }
}

function exampleAsyncValidator(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), 2500);
  });
}
