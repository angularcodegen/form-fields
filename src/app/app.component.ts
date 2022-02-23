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

  saveToNewslatter = new FormControl(false);

  private toggleEmailSub = this.saveToNewslatter.valueChanges.subscribe(() => this.toggleEmail());

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
