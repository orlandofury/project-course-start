import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[];
  private igChangeSub: Subscription;
  constructor(private shoppingListService:ShoppingListService) {
    
  }
  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);
  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    //the subscribe allows updating the values of the components with those of the service
    //when you add new ingredients, this is to work with the .slice()
    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients = ingredients;
      }
    )
  }
}
