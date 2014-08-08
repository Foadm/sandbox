var Player = Backbone.Model.extend({
    defaults : {
        name : "",
        score : 0,
        total : 0
    },

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
    tagName : 'tr',
    events :  {
      'click button.edit' : 'editPlayer',
      'click button.change-input' : 'changeName',
      'click button.delete' : 'destroy'
    },
    editPlayer : function(){
        this.$('span').hide();
        this.$( ".name-input").show();
        this.$( ".change-input").show();
        this.$( ".name-input").attr("placeholder",this.model.get("name"));
    },
    changeName : function(){
        var newName = this.$(".name-input").val();
        if ( !newName) return;
        //expand this later and add an error message
        this.model.set('name', newName);
    },
    destroy : function(){
        this.model.destroy();
    },

    initialize : function(){
        this.template = _.template( $('#player-template').html() );
        this.render();
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.remove, this);
    },
    render : function(){
        this.$el.html(this.template( this.model.toJSON() ));
        $('.initial_players').append(this.$el);
    },
    remove : function(){
        this.$el.remove();
    }
});

var PlayersView = Backbone.View.extend({
    render : function(){
            var last_model = this.collection.last();
            var playerView = new PlayerView({ model : last_model });
    }
});
var ScoringTemplate = Backbone.View.extend({
    tagName : 'td',
    initialize : function(){
        debugger;
        this.template = _.template( $('#scoringSubmit').html());
        this.render();
    },
    events : {
        'click #input-button' : 'addScore'
    },
    addScore : function(){
        console.log('clicked');
    },
    render : function(){
        $('footerSubmit').append(this.$el);
    }
});
var ScoringView = Backbone.View.extend({
    tagName : 'tr',
    addScore : function(){
        console.log('called');
        this.collection.each(function(player){
            console.log('called annon');
            console.log(player.get('score'));
        },this);
    },
    initialize : function(){
        this.template = _.template( $('#scoring-template').html());
        this.render();
    },
    render : function(){
        this.collection.each(function(player){
            this.$el.html(this.template( player.toJSON() ));
            $('.scoring-body').append(this.$el);
        }, this);
    }
});

// add players to the game
$( document ).ready(function() {
    var playerCollection = new PlayerCollection;
    var playersView = new PlayersView({ collection : playerCollection});
    $( "#enterPlayer" ).submit(function(e) {
        var player = new Player();
        var playerName = $('#playerField').val();
        player.set({name : playerName , score : 0, total : 0});
        playerCollection.add(player);
        //calls playersView (collection)
        playersView.render();
        e.preventDefault();
    });

    $( "#start" ).submit(function(e) {
        $('.intro').hide();
        $('#template-wrapper').show();
        var scoringView = new ScoringView({ collection : playerCollection});
        var scoringTemplate = new ScoringTemplate({ collection : playerCollection});
        e.preventDefault();
    });
});


