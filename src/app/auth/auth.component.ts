import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthService, IAuthResponseData } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy{
  isLoggedIn = true;
  isLoading = false;
  error: string = null;
  private closeSubscription: Subscription;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  onSwitchMode() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const AlertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(AlertComponentFactory);

    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<IAuthResponseData>;

    this.isLoading = true;
    if (this.isLoggedIn) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe((resData) => {
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, (errorMessage) => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
    });

    form.reset();
  }

  ngOnDestroy() {
    if(this.closeSubscription) this.closeSubscription.unsubscribe();
  }
}

