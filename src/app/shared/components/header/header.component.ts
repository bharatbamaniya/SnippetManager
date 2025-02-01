import {Component, effect, inject, output, signal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {SnippetSetupComponent} from "../../../core/snippet/snippet-setup/snippet-setup.component";
import {MatDialog} from "@angular/material/dialog";
import {HighlightLoader} from "ngx-highlightjs";
import {DataService} from "../../services/data.service";
import {HttpResponse} from "@angular/common/http";
import {getStylesConfig} from "@angular-devkit/build-angular/src/tools/webpack/configs";
import {CommonService} from "../../services/common.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatButton,
    MatIconButton,
    MatProgressSpinner
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly dataService = inject(DataService);
  readonly dialog = inject(MatDialog);
  readonly hljsLoader: HighlightLoader = inject(HighlightLoader);

  darkMode = signal<boolean>(true);
  showSpinnerBuyMeACoffee = signal<boolean>(false);
  createNewSnippet = output();

  setDarkMode = effect(() => {
    document.documentElement.classList.toggle('dark', this.darkMode());
    this.hljsLoader.setTheme(`//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/${this.darkMode() ? 'github-dark-dimmed' : 'github'}.min.css`);
  })

  onCreateNewSnippet() {
    this.createNewSnippet.emit()
  }

  openPaymentDialog() {
    this.showSpinnerBuyMeACoffee.set(true);
    this.dataService.postData({
      firstName: 'bharat',
      lastName: 'kumar',
      membershipType: 'silver'
    }, 'payment/create').subscribe({
      next: (res: HttpResponse<any>) => {
        this.showSpinnerBuyMeACoffee.set(false);

        const {key, amount, currency, notes, orderId} = res.body;

        const options = {
          key: key, // Enter the Key ID generated from the Dashboard
          amount: amount, // The Amount is in currency subunits. The Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: currency,
          name: "Buy coffee to Bharat Kumar", //your business name
          description: "Buy coffee to bharat kumar",
          order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
          prefill: { //We recommend using the prefilled parameter to autofill customer's contact information, especially their phone number
            // name: notes.firstName + ' ' + notes.lastName, //your customer's name
            // email: notes.emailId ?? '',
            // contact: "9000090000" //Provide the customer's phone number for better conversion rates
          },
          notes: {
            // address: "Razorpay Corporate Office"
          }
        };
        // @ts-ignore
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
        console.log('completed')
      }
    })
  }
}
