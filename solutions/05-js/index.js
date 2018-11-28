/**
 * Assignment 1: refactor the following javascript code to use 
 * jQuery's $.ajax() call.
 */
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://openmensa.org/api/v2/canteens/229/days/20171109/meals');
xhr.onload = function() {
    if (xhr.status === 200) {
        var meals = processMenu(JSON.parse(xhr.responseText));
        renderMenu(meals);
    } else {
        console.log('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();


/**
 * Assignment 2: Implement the renderMenu function that takes an 
 * array of meals (see definition below) and renders it as table 
 * rows inside the tbody element.
 * Add the .warning and .danger classes to rows which denote 
 * vegetarian or vegan food.
 * You may want to read the docs for 
 * - Array.forEach()
 * - jQuery's append and addClass
 */
function renderMenu(meals) {
  const table = $('tbody');
	// 1: clear the old tbody, so we can start fresh
  table.empty();
  // 2: for each meal
  meals.forEach((meal) => {
    // 2.1: create a new row (<tr>)
    const tr = $('<tr>');
    const td = $('<td>');
    td.text(meal.getName());
    // 2.2. if vegan, add the danger class
    if (meal.isVegan()) {
      td.addClass('danger');
      // 2.3. if vegetarian, add the warning class
    } else if (meal.isVegetarian()) {
      td.addClass('warning');
    }
    tr[0].appendChild(td[0]);
    table[0].appendChild(tr[0]);
  });
}

// class Meal (no need to edit this)
function Meal(name, ingredients) {
  console.log(name, ingredients);
  
  // this makes them "private", 
  // since they're only visible in the scope
  var vegan = true;
  var vegetarian = true;
  var glutenfree = true;
  var chicken = false;
  
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
  
  this.getName = function() { return name; };
  this.hasPork = function () { return ingredients.includes("Schweinefleisch"); };
  this.hasChicken = function () { return ingredients.includes("Hühnerfleisch"); };
  this.hasBeef = function () { return ingredients.includes("Rindfleisch"); };
  this.isGlutenFree = function() {
    return !ingredients.includes("Glutenhaltiges Getreide");
  };
  this.isVegetarian = function () { return !(
    ingredients.includes("Rindfleisch") ||
    ingredients.includes("Schweinefleisch") ||
    ingredients.includes("Kalbfleisch"));
  };
  this.isVegan = function () { 
    return this.isVegetarian() && !(ingredients.includes("Hühnerei") || ingredients.includes("Milch und Laktose") || ingredients.includes("Fisch")); 
  };
}

/** 
	Takes the openmensa JSON output and transforms it into
	an array of Meal instances.
*/
function processMenu(data) {
  var meals = data
    .filter(function(x) { 
      return x.category === 'Self-Service';
    })
    .map(function(x) {
      return new Meal(x.name, x.notes);
    });  
  return meals;
}
