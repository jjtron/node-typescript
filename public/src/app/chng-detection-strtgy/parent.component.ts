import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'parent-component',
  template: `
	<a href="https://alligator.io/angular/change-detection-strategy/">See article</a>
	<br>
	<input #newFood type="text" placeholder="Enter a new food">
	<button (click)="addFood(newFood.value)">Add food</button>
	<child-component [data]="foods" [newItem]="newItem"></child-component>
	<child2-component [data]="otherFoods"></child2-component>
  `
})
export class ParentComponent {

  foods = ['Bacon', 'Lettuce', 'Tomatoes'];
  newItem: string;
  otherFoods = new BehaviorSubject<string>(null);

  addFood(food) {
	  /**
	   * 	EXPLANATION:
	   * 
	   *	this.foods.push(food); will NOT work because it does not actually CHANGE the ref `this.foods`,
	   *	it merely MUTATES it.
	   *
	   *	You have to totally provide a new ref altogethor, i.e., replace the this.foods ref with a 
	   *	completey new array, as follows.
	   */
	  
    this.foods = [...this.foods, food];
    //this.foods.push(food);

    // if this were used, onPush change-detection won't matter,
    // because a new string is a CHANGE, not just a mutation
    //this.newItem = food;
    
    this.otherFoods.next(food);
  }
}