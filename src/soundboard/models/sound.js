'use strict';

SB.Models.Sound = Backbone.Model.extend({
  defaults: {
    name: '',
    url: '',
    playing: false,
    volume: 0.5
  }
});

SB.Collections.SoundCollection = Backbone.Collection.extend({

  model: SB.Models.Sound,

  playing: function() {
    return this.where({ playing: true });
  }

});