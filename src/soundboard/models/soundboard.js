'use strict';

SB.Models.Soundboard = Backbone.Model.extend({
  defaults: {
    sounds: new SB.Collections.SoundCollection()
  }
});

SB.Collections.SoundboardCollection = Backbone.Collection.extend({
  model: SB.Models.Soundboard
});