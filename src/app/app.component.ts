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
    hours: new FormControl(null, [Validators.required]),
  });

  get login(): FormControl {
    return this.form.get('login') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get hours(): FormControl {
    return this.form.get('hours') as FormControl;
  }

  rememberMeControl = new FormControl(true);

  private toggleEmailSub = this.rememberMeControl.valueChanges.subscribe(() => this.toggleHours());

  toggleHours() {
    const hours = this.form.get('hours')!;
    hours.enabled ? hours.disable() : hours.enable();
  }

  ngOnDestroy(): void {
    this.toggleEmailSub.unsubscribe();
  }
}

function exampleAsyncValidator(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      control.value === 'test' ? resolve(null) : resolve({ example: true });
    }, 2500);
  });
}
