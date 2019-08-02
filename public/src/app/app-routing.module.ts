import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { StreamsComponent } from './streams/streams.component';
import { WebSocketsComponent } from './web-sockets/web-sockets.component';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { ObservablesComponent } from './observables/observables.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'web-sockets', component: WebSocketsComponent },
    { path: 'streams', component: StreamsComponent },
    { path: 'line-graph', component: LineGraphComponent },
    { path: 'observables', component: ObservablesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}