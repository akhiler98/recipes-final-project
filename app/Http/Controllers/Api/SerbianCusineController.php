<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;

class SerbianCusineController extends Controller
{
    public function index() {
        $recipes = Recipe::all();
        return $recipes;
    }
}

