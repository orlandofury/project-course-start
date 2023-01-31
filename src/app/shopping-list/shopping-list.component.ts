import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients:Ingredient[]}>;
  private igChangeSub: Subscription;
  constructor(
    private shoppingListService: ShoppingListService,
    private loogingService: LoggingService,
    private store: Store<fromShoppingList.AppState>
  ) {}
  onEditItem(index: number) {
    //this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
  ngOnDestroy(): void {
    //this.igChangeSub.unsubscribe();
  }
  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.shoppingListService.getIngredients();
    // //the subscribe allows updating the values of the components with those of the service
    // //when you add new ingredients, this is to work with the .slice()
    // this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
    this.loogingService.printLog('Hi from ShoppingListComponent');
  }
}
