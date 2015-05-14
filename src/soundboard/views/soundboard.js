'use strict';

SB.Views.SoundboardView = Backbone.View.extend({

  initialize: function(options) {

    var self = this;

    this.listenTo(this.model.get('sounds'), 'add', this.addOne);
    this.listenTo(this.model.get('sounds'), 'reset', this.addAll);
    this.listenTo(this.model.get('sounds'), 'all', this.render);

    this.$('.starfield').each(function(index, element) {
      self.starfield = new SB.Views.StarfieldView({
        el: $(element),
        model: self.model
      });
    });

    this.$('.slider').slider({
      orientation: 'vertical',
      range: 'min',
      min: 0,
      max: 9,
      value: 0,
      slide: function(event, ui) {
        console.log('slide to ' + ui.value);
      }
    });
    

    this.addAll();
  },

  render: function() {

    var playing = this.model.get('sounds').playing().length;
    this.$('.bobblehead').toggleClass('bobbling', playing > 0);

    for (var i=0; i < this.model.get('sounds').length; i++) {
      if (i + 1 != playing)
        this.$('.bobblehead').removeClass('bobbling-' + (i+1));
    }

    if (playing > 0) {
      this.$('.bobblehead').addClass('bobbling-' + playing);
    }

    return this;
  },

  addOne: function(sound) {
    var view = new SB.Views.SoundView({model: sound});
    this.$('.sounds').append(view.render().el);
  },

  addAll: function() {
    this.model.get('sounds').each(this.addOne, this);
  }

});