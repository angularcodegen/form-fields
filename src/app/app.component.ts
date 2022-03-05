import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  form = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl({ disabled: true, value: null }, [Validators.required]),
  });

  get email() {
    return this.form.get('email')!;
  }

  saveToNewslatter = new FormControl(true);

  private toggleEmailSub = this.saveToNewslatter.valueChanges.subscribe(() => this.toggleEmail());

  toggleEmail() {
    const email = this.form.get('email')!;
    email.enabled ? email.disable() : email.enable();
  }

  ngOnDestroy(): void {
    this.toggleEmailSub.unsubscribe();
  }
}
