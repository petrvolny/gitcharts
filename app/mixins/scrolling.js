import Ember from 'ember';

export default Ember.Mixin.create({
    bindScrolling: function(opts) {
        var self = this;
        opts = opts || {debounce: 100};

        var onScroll = function() { return self.scrolled(); };

        Ember.$(document).bind('touchmove', onScroll);
        Ember.$(window).bind('scroll', onScroll);
    },

    unbindScrolling: function() {
        Ember.$(window).unbind('scroll');
        Ember.$(document).unbind('touchmove');
    }
});
