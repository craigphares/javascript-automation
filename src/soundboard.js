'use strict';

$(function() {

  SB.sounds = new SB.Collections.SoundCollection([
    { name: 'Drums', url: 'assets/audio/drums.mp3' },
    { name: 'Guitar', url: 'assets/audio/guitar.mp3' },
    { name: 'Synth', url: 'assets/audio/synth.mp3' },
    { name: 'Voice', url: 'assets/audio/voice.mp3' },
    { name: 'FX', url: 'assets/audio/zoops.mp3' }
  ]);

  $('.soundboard').each(function(index, element) {
    var soundboard = new SB.Views.SoundboardView({
      el: $(element),
      model: new SB.Models.Soundboard({
        sounds: SB.sounds
      })
    });
  });

});
