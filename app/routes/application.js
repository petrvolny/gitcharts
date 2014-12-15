import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return this._loadProjects();
    },

    _loadProjects: function() {
        var result = Ember.Object.create({ isLoading: true });

        Ember.$.getJSON('/api/p').then(function(res) {
            result.set('projects', res.projects);
            result.set('isLoading', false);
        }.bind(this));

        return result;
    }
});
