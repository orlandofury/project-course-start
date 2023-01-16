import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  ingredients: Ingredient[];
  
  constructor(private shoppingListService:ShoppingListService) {
    
  }
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    //the subscribe allows updating the values of the components with those of the service
    //when you add new ingredients, this is to work with the .slice()
    this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients = ingredients;
      }
    )
  }
}
