---
title: Assignment 8
permalink: /08a-vuejs/
---

{% raw %}
<script src="/assets/vue.js"></script>
<script src="/assets/vue-resource.js"></script>
{% endraw %}


# Basics

Its recommended to do the following examples in jsfiddle.
All examples can be done using vue, no jQuery required!
Make sure to include the following at the top of your html.

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-resource"></script>
```

## Two-way Data Binding

Create an input text box, and set up two-way data binding so that it displays the typed text in a paragraph below it.

{% raw %}
<div class="framed" id="a1">
	<input type="text" v-model="typed"><br>
	<p>You typed: {{ typed }}</p>
</div>
<script>
	let a1 = new Vue({
		el: '#a1',
		data: {
			typed: ""
		}
	})
</script>
{% endraw %}


## Click Events

Create a button that increments a counter each time it is clicked.
Add a button that resets the counter to `0`.

{% raw %}
<div class="framed" id="a2">
	<p>{{counter}}</p>
	<button v-on:click="incr">+</button> <button v-on:click='counter = 0'>Reset</button>
</div>
<script>
	let a2 = new Vue({
		el: '#a2',
		data: {
			counter: 0
		},
		methods: {
			incr: function() {
				this.$data.counter += 1
			}
		}
	})
</script>
{% endraw %}


## Rendering Lists

Create an input text field with a button to add text to a list.
Add another button that removes the first element of the list.
Display "No items" if the list is empty

Notes: 
- No need to modify the actual html elements! Use `v-if` and `v-for`.
- You can use either `ref` and `this.$refs....` to access the input element, or use two-way data binding via `v-model`.

{% raw %}
<div class="framed" id="a3">
	<ul v-if="list.length">
		<li v-for="i in list">{{i}}</li>
	</ul>
	<p v-else>No Items</p>
	<input type="text" ref="my-input"> <button v-on:click="add">Add</button>
	<button v-on:click="remove">Remove first</button>
</div>
<script>
	let a3 = new Vue({
		el: '#a3',
		data: {
			list: []
		},
		methods: {
			add: function() {
				this.$data.list.push(this.$refs['my-input'].value)
			},
			remove: function() {
				this.$data.list.shift()
			}
		}
	})
</script>
{% endraw %}


## Working with Select

Create a selection element has a (disabled) "nothing selected", and a list of options.
Create an input text field and a button to add to the list of options.
Add a paragraph that displays the currently selected option.

{% raw %}
<div class="framed" id="a4">
	<select v-model="sel" ref="select">
	<!-- <select ref="select" v-on:change="update"> -->
		<option disabled selected value=''>nothing selected</option>
		<option v-for="i in list">{{i}}</option>
	</select>
	<input v-on:keyup.enter="add" v-model.trim="input" type="text" ref="my-input"> <button v-on:click="add" v-bind:disabled='input.length == 0'>Add</button>
	<p>Your selection: {{ sel }}</p>
</div>
<script>
	let a4 = new Vue({
		el: '#a4',
		data: {
			list: [],
			input: '',
			sel: ''
		},
		methods: {
			add: function($event) {
				console.log($event)
				// let str = this.$refs['my-input'].value.trim()
				let str = this.$data.input
				if (!str) {
					console.log('ignored empty string')
					return
				}
				this.$data.list.push(str)
				this.$data.input = ''
				// this.$refs['my-input'].value = ''
			},
			/* use this with v-on:change
			update: function($event) {
				console.log($event)
				this.$data.sel = this.$refs.select.value
			} */
		},
		watch: {
			sel: function(n, o) {
				console.log('new selection: ' + n)
			}
		}
	})
</script>
{% endraw %}

Bonus points for rejecting an empty input, capturing `ENTER` when in the text field, and clearing it after adding the string to the list of options.


# Mensa App

On jsfiddle, create a fork of the solution of week 6 (http): <https://jsfiddle.net/sikoried/gzrxxdef/>

Include `vue` and `vue-requests` by adding 

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-resource"></script>
```

at the top of your html.

**Hints:**
- Make the ajax request to retrieve the list of canteens in the `mounted` callback of your app.
- On the `<select>`, use `v-on:change` to react to any change or _watch_ the variable specified by `v-model` to update the displayed canteen.
- You can use the `ref="..."` attribute on elements, but it is better to use `v-model` to bind elements to "their" data.
- Use `v-for` to build your selection and menu

