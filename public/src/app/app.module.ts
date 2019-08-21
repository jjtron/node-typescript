import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app-routing.module";
import { StreamsComponent } from './streams/streams.component';
import { WebSocketsComponent } from './web-sockets/web-sockets.component';
import { HomeComponent } from './home/home.component';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { ChartsModule } from 'ng2-charts';
import { ObservablesComponent } from './observables/observables.component';
import { ProvidersComponent } from './providers/providers.component';
import { TodoComponent } from './providers/todos/todo.component';
import { TodoLabelComponent } from './providers/todos/todo-label.component';

@NgModule({
    declarations: [
        AppComponent,
        StreamsComponent,
        WebSocketsComponent,
        HomeComponent,
        LineGraphComponent,
        ObservablesComponent,
        ProvidersComponent,
        TodoComponent,
        TodoLabelComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        ChartsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
