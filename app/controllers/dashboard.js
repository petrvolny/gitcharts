import Ember from 'ember';

export default Ember.Controller.extend({

    init: function() {
        this._super();
        this.set('days', 21);
    },

    contentChanged: function() {
        // TODO: Model transformations here
    }.observes('content')
});
