import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="form" class="container mt-5">
      <div class="alert alert-primary" role="alert">Pamiętaj aby poprawnie uzupełnić formularz</div>
      <div class="mb-3">
        <label for="firstname" class="form-label">First name *</label>
        <input
          formControlName="firstName"
          type="email"
          class="form-control"
          id="firstname"
          aria-describedby="emailHelp"
          autocomplete="off"
        />
      </div>

      <div class="mb-3">
        <label for="lastname" class="form-label">Last name *</label>
        <input
          formControlName="lastName"
          type="email"
          class="form-control"
          id="lastname"
          aria-describedby="emailHelp"
          autocomplete="off"
        />
      </div>

      <div class="mb-3 form-check">
        <input [formControl]="savetoNewslatter" type="checkbox" class="form-check-input" id="newsletter" />
        <label class="form-check-label" for="newsletter">Save me to newsletter</label>
      </div>

      <div *ngIf="savetoNewslatter.value === true" class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          formControlName="email"
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          autocomplete="off"
        />
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>

      <button (click)="send()" type="submit" class="btn btn-primary" [disabled]="!form.valid">Submit</button>
    </form>
  `,
})
export class AppComponent implements OnDestroy {
  form = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl({ disabled: true, value: null }, [Validators.required]),
  });

  savetoNewslatter = new FormControl(false);

  private toggleEmailSub = this.savetoNewslatter.valueChanges.subscribe(() => this.toggleEmail());

  toggleEmail() {
    const email = this.form.get('email')!;
    email.enabled ? email.disable() : email.enable();
  }

  send() {
    alert(`
    form.value:
    ${JSON.stringify(this.form.value)}

    form.getRawValue():
    ${JSON.stringify(this.form.getRawValue())}
    `);
  }

  ngOnDestroy(): void {
    this.toggleEmailSub.unsubscribe();
  }
}
