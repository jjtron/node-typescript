import { Injectable } from '@angular/core';
import { CanActivate, Router,
ActivatedRouteSnapshot,
RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CanActivateRouteGuard implements CanActivate {

	constructor(private router: Router) {

	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
	  
		let canActivate: boolean | UrlTree;
		if ((Math.random() < 0.5)) {
			return true;
		}
		else {
			alert('cant Activate:\nThis is a demo to show using a Guard (see /app/_guards/can-activate-route.guard.ts)');
			this.router.navigateByUrl('/line-graph');
		}
	}
}
