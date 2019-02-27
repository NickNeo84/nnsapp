import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS  }   from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RulesComponent } from './rulesSum/rules.component';
import { QuestComponent } from './quest/quest.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

// used to create fake backend
// import { fakeBackendProvider } from './_helpers';

@NgModule({
  declarations: [
    AppComponent,
    RulesComponent,
    QuestComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
