// var xhr = new XMLHttpRequest();
// xhr.open('GET');
// xhr.onload = function() {
//   console.log('meh');
//   if (xhr.status === 200) {
//     var data = JSON.parse(xhr.responseText);
//     const menu = processMenu(data);
//     console.log(menu);
//     debugger;
//   } else {
//     console.log('Request failed.  Returned status of ' + xhr.status);
//   }
// };
// xhr.send();

(async () => {
  try {
    const response = await fetch(
      '//openmensa.org/api/v2/canteens/229/days/20171026/meals',
    );
    const data = await response.json();
    const menu = processMenu(data);
    console.log(menu);
    debugger;
  } catch (e) {
    console.error(e);
  }
})();

/** 
	Takes the openmensa JSON output and transforms it into
	an array of Meal instances.
*/
function processMenu(data) {
  return data.map(
    ({ name, prices: { students }, notes }) => new Meal(name, students, notes),
  );
}

class Meal {
  constructor(name, price, ingredients) {
    this.name = name;
    this.ingredients = ingredients;
    this.price = price;
  }

  isVegan() {
    return !this.hasEgg() && this.isVegetarian();
  }

  isVegetarian() {
    return !this.hasBeef() && !this.hasChicken() && !this.hasPork();
  }

  isGlutenfree() {
    return !this.ingredients.some(ingredient =>
      ingredient.startsWith('Gluten'),
    );
  }

  hasBeef() {
    return this.ingredients.some(ingredient =>
      ingredient.startsWith('Rindfleisch'),
    );
  }

  hasPork() {
    return this.ingredients.some(ingredient =>
      ingredient.startsWith('Schweinefleisch'),
    );
  }

  hasChicken() {
    return this.ingredients.some(ingredient =>
      ingredient.startsWith('Hühnerfleisch'),
    );
  }

  hasEgg() {
    return this.ingredients.some(ingredient =>
      ingredient.startsWith('Hühnerei'),
    );
  }

  getPrice() {
    return this.price;
  }
}
