import Ember from 'ember';
import ScrollingMixin from 'gitcharts/mixins/scrolling';

export default Ember.View.extend(ScrollingMixin, {

    didInsertElement: function() {
        this.bindScrolling();
        this.filterOffset = Ember.$('#days-filter').offset().top -40;
    },

    willInsertElement: function() {
        this.unbindScrolling();
    },

    scrolled: function() {
        var filterElement = Ember.$('#days-filter');

        if (filterElement && Ember.$(window).scrollTop() > this.filterOffset) {
            this.set('controller.isFixedDaysFilter', true);
        } else {
            this.set('controller.isFixedDaysFilter', false);
        }
    }
});
