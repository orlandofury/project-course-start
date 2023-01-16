import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Cow Tongue stew mixed with vegables',
                    'This is Favorite Stew', 
                    'https://thenoshery.com/wp-content/uploads/2020/07/lengua-guisada-07-643x900.jpg',
                    [
                        new Ingredient('Cow Tongue',1),
                        new Ingredient('Vegetable Mix Bag',1)
                    ]),
        new Recipe('Big Fat Mondongo Soup',
                   'This is the NUMBER ONE Soup', 
                   'https://img-global.cpcdn.com/recipes/20a1edba7e4149b2/680x482cq70/sopa-de-mondongo-nicaraguense-foto-principal.webp',
                   [
                        new Ingredient('Achiote',2),
                        new Ingredient('Mondongo',1),
                        new Ingredient('Vegetable Mix Bag',2)
                   ])
      ];
    
    constructor(private slService: ShoppingListService){}
    
    getRecipe(index: number){
        return this.recipes[index];
    }
    getRecipes(){
        //slice to return a copy of the orignal recipes
        return this.recipes.slice();
    }
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}