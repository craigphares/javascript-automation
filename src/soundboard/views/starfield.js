'use strict';

SB.Views.StarfieldView = Backbone.View.extend({

  initialize: function(options) {

    var self = this;

    $(window).on('resize', function() { self.refreshSize(); });

    this.listenTo(this.model.get('sounds'), 'all', this.render);
    
    this.canvas = this.$('.canvas')[0];
    this.context = this.canvas.getContext('2d');
    this.context.globalAlpha = 0.25;

    this.refreshSize();

    this.warpZ = 12;
    this.units = 500;
    this.stars = [];
    this.cycle = 0;    
    this.z = 0.01;

    this.tz = this.z;
    this.zooming = false;

    for (var i=0; i < this.units; i++) {
      var n = {};
      this.resetStar(n);
      this.stars.push(n);
    }

    window.requestAnimFrame(this.rf.bind(this));
  },

  render: function() {
    var playing = this.model.get('sounds').playing().length;

    var pct = playing / this.model.get('sounds').length;
    this.tz = (0.49 * pct) + 0.01;

    this.zooming = playing > 0;

    return this;
  },

  resetStar: function(a) {
    a.x = (Math.random() * this.width - (this.width * 0.5)) * this.warpZ;
    a.y = (Math.random() * this.height - (this.height * 0.5)) * this.warpZ;
    a.z = this.warpZ;
    a.px = 0;
    a.py = 0;
  },

  rf: function() {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.width, this.height);

    this.z = this.z + ((this.tz - this.z) / 2);

    var cx = (this.mousex - this.width / 2) + (this.width / 2);
    var cy = (this.mousey - this.height / 2) + (this.height / 2);

    var sat = Math.floor(this.z * 500);
    if (sat > 100) sat = 100;
    for (var i=0; i < this.units; i++) {
      var n = this.stars[i];
      var xx = n.x / n.z;
      var yy = n.y / n.z;
      var e = (1.0 / n.z + 1) * 2;

      if (n.px !== 0) {
        this.context.strokeStyle = 'hsl(' + ((this.cycle * i) % 360) + ',' + sat + '%,80%)';
        this.context.lineWidth = e;
        this.context.beginPath();
        this.context.moveTo(xx + cx, yy + cy);
        this.context.lineTo(n.px + cx, n.py + cy);
        this.context.stroke();
      }

      n.px = xx;
      n.py = yy;
      n.z -= this.z;

      if (n.z < this.z || n.px > this.width || n.py > this.height) {
        this.resetStar(n);
      }
    }

    this.cycle += 0.01;

    window.requestAnimFrame(this.rf.bind(this));
  },

  mouseMoved: function(e) {
    this.mousex = e.clientX;
    this.mousey = e.clientY;
  },

  wheelMoved: function(e) {
    var delta = 0;
    if (e.originalEvent.detail) {
      delta = -e.originalEvent.detail / 3;
    } else {
      delta = e.originalEvent.wheelDelta / 120;
    }
    var doff = (delta / 25);
    if (delta > 0 && this.z + doff <= 0.5 || delta < 0 && this.z + doff >= 0.01) {
      this.z += (delta / 25);
    }
  },

  refreshSize: function() {
    this.width = this.$el.width();
    this.height = this.$el.height();
    $(this.canvas).attr({ width: this.width, height: this.height });

    this.mousex = this.width / 2;
    this.mousey = this.height / 2;
  }

});