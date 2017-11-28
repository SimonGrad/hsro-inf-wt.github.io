Vue.config.debug = true
Vue.config.devtools = true

let app = new Vue({
	el: '#darts-app',
  data: {
  	state: 0,
    players: [],
    moves: [],
    current: 0,
    game: 501
  },
  methods: {
  	add: function(event) {
    	this.players.push({name: this.$refs.name.value, moves: []})
    },
  	start: function(event) {
      this.state = 1
      var that = this
      this.players.forEach(function(o) { o.score = that.game })
    },
    move: function(event) {
    	this.moves.push(parseInt(this.$refs.score.value))
    },
    undo: function(event) {
    	this.moves.pop()
    },
    next: function(event) {
    	const p = this.players[this.current]
    	const sc = this.moves.reduce(function(acc, i) { return acc - i; }, p.score);

			if (sc >= 0) {
      	p.score = sc;
        p.moves.push.apply(p.moves, this.moves)
      }


			if (sc == 0) {
      	this.state = 2
        this.winner = p
        return
      }
      
      
    	this.current = (this.current + 1) % this.players.length
      this.moves = []
      
    },
    restart: function(event) {
    	this.state = 0
      this.moves = []
      this.players = []
    }
  }
})