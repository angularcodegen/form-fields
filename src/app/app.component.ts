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

  toggleLoginControl = new FormControl(false);
  togglePasswordControl = new FormControl(false);
  toggleEmailControl = new FormControl(false);

  private toggleLoginSub = this.toggleLoginControl.valueChanges.subscribe(() => this.toggle('login'));
  private togglePasswordSub = this.togglePasswordControl.valueChanges.subscribe(() => this.toggle('password'));
  private toggleEmailSub = this.toggleEmailControl.valueChanges.subscribe(() => this.toggle('email'));

  ngOnDestroy(): void {
    this.toggleLoginSub.unsubscribe();
    this.togglePasswordSub.unsubscribe();
    this.toggleEmailSub.unsubscribe();
  }

  private toggle(control: string) {
    const hours = this.form.get(control)!;
    hours.enabled ? hours.disable() : hours.enable();
  }
}

function exampleAsyncValidator(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), 2500);
  });
}
