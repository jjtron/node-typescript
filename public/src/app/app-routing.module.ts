import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { StreamsComponent } from './streams/streams.component';
import { WebSocketsComponent } from './web-sockets/web-sockets.component';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { ObservablesComponent } from './observables/observables.component';
import { ProvidersComponent } from './providers/providers.component';
import { ParentComponent } from './chng-detection-strtgy/parent.component';
import { DemoResolver } from './_resolvers/demo.resolver';
import { ResolverDemo }  from './resolver-demo/resolver.demo';
import { DirectiveDemoComponent }  from './directive-demo/directive-demo.component';
import { CanActivateRouteGuard } from './_guards/can-activate-route.guard';
import { ConsumerComponent } from './demo-ng-content/consumer.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'web-sockets', component: WebSocketsComponent },
    { path: 'streams', component: StreamsComponent },
    { path: 'line-graph', component: LineGraphComponent },
    { path: 'observables', component: ObservablesComponent },
    { path: 'providers', component: ProvidersComponent, canActivate: [CanActivateRouteGuard]},
    { path: 'chng-detection-strtgy', component: ParentComponent },
    {
    	path: 'resolver-demo',
    	component: ResolverDemo,
    	resolve: { demo_resolver: DemoResolver }
    },
    { path: 'directive-demo', component: DirectiveDemoComponent },
    { path: 'demo-ng-content-comsumer', component: ConsumerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}