import Ember from 'ember';

export default Ember.Controller.extend({

    contentChanged: function() {
        // TODO: Model transformations here
    }.observes('content')
});
