async function fetchCanteens() {
  const response = await fetch('http://openmensa.org/api/v2/canteens');
  return response.json();
}

function fillAndShowSelect(canteens) {
  const select = $('select');
  canteens.forEach((canteen) => {
    const option = $('<option>');
    option.val(canteen.id);
    option.text(canteen.name);
    select[0].appendChild(option[0]);
  })
  select.css('display', 'block');
}

async function handleCanteenChange(e) {
  const url = 'http://openmensa.org/api/v2/canteens/'+ e.target.value + '/days/20171109/meals';
  const request = await fetch(url);
  const meals = await request.json();
  renderMenu(processMenu(meals));
}

$(async () => {
  const canteens = await fetchCanteens();
  fillAndShowSelect(canteens);

  $('select').on('change', handleCanteenChange);
});

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

function processMenu(data) {
  var meals = data
    .map(function(x) {
      return new Meal(x.name, x.notes);
    });  
  return meals;
}