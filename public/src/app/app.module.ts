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
import { PlayerComponent } from './providers/music-player/player.component';
import { ArtistComponent } from './providers/music-player/artist.component';
import { AlbumComponent } from './providers/music-player/album.component';
import { SongComponent } from './providers/music-player/song.component';
import { ClrIconModule } from '@clr/angular';
import { ParentComponent } from './chng-detection-strtgy/parent.component';
import { ChildComponent } from './chng-detection-strtgy/child.component';
import { Child2Component } from './chng-detection-strtgy/child2.component';
import { ResolverDemo }  from './resolver-demo/resolver.demo';
import { CustomButton }  from './_directives/custom.button';
import { DirectiveDemoComponent }  from './directive-demo/directive-demo.component';
import { DemoNgContentComponent } from './demo-ng-content/demo-ng-content.component';
import { ConsumerComponent } from './demo-ng-content/consumer.component';

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
        TodoLabelComponent,
        PlayerComponent,
        ArtistComponent,
        AlbumComponent,
        SongComponent,
        ParentComponent,
        ChildComponent,
        Child2Component,
        ResolverDemo,
        CustomButton,
        DirectiveDemoComponent,
        DemoNgContentComponent,
        ConsumerComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        ChartsModule,
        ClrIconModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
