'use strict';

SB.Views.SoundView = Backbone.View.extend({

  tagName: 'li',

  template: _.template(
    '<button><%= name %></button><div class="volume"></div>'
  ),

  events: {
    'click button': 'togglePlaying'
  },

  initialize: function(options) {

    this.listenTo(this.model, 'change', this.render);

    this.sound = new Howl({
      urls: [this.model.get('url')],
      loop: true,
      volume: 0
    }).play();

    this.rendered = false;

  },

  render: function() {
    var self = this;

    if (!this.rendered)
      this.$el.html(this.template(this.model.toJSON()));
      this.$('.volume').slider({
        min: 0.1,
        max: 1,
        step: 0.1,
        change: function(event, ui) {
          self.model.set({ volume: ui.value });
        }
      });

    this.$el.toggleClass('playing', this.model.get('playing'));

    if (this.model.get('playing')) {
      this.sound.volume(this.model.get('volume'));
    }

    this.$('.volume').slider('value', this.model.get('volume'));    

    this.rendered = true;

    return this;
  },

  togglePlaying: function() {
    var playing = !this.model.get('playing');
    this.model.set({
      playing: playing
    });

    if (playing) {
      this.sound.fadeIn(this.model.get('volume'), 1000);
    } else {
      this.sound.fadeOut(0, 1000);
    }
  }

});