<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Recipe;

class Ingredient extends Model
{
    use HasFactory;
  
        public function recipes()
{
    return $this->belongsToMany(Recipe::class, 'recipe_ingredients') // And here as well
                ->withPivot('measure');
}
                    
    }
