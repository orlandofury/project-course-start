import { Component,OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
 
  //this add a property with the same name recipeService to RecipeListComponent
  constructor(private recipeService: RecipeService) {
    
  }
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
  

}
