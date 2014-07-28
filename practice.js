var Player = Backbone.Model.extend({

    validate : function(attrs){
        if ( ! attrs.name ){
            return 'WRONGGGGG'
        }
    }
});
var PlayerCollection = Backbone.Collection.extend({
    model : Player
});

var PlayerView = Backbone.View.extend({
    tagName : 'div',
    className : 'player_cell',

initialize : function(){
    this.template = _.template( $('#player-template').html() );
    this.render();
    },
    render : function(){
        this.$el.html(this.template( this.model.toJSON() ));
        $('.initial_players').append(this.$el.html());
    }
});

var PlayersView = Backbone.View.extend({

});
// add players to the game
$( document ).ready(function() {
    var playerCollection = new PlayerCollection;
    $( "#enterPlayer" ).submit(function(e) {
        var player = new Player();
        var playerName = $('#playerField').val();
        player.set({name : playerName , score : 0, total : 0});
        playerCollection.add(player);
        var playerView = new PlayerView({ model : player });
        e.preventDefault();
    });
    $( "#start" ).submit(function(e) {
        playerController.initializeScoring();
        e.preventDefault();
    });
});


