import Ember from 'ember';

export default Ember.Controller.extend({

    repoSummary: undefined,

    init: function() {
        this._super();
        this.set('days', 21);
    },

    contentChanged: function() {
        // TODO: Model transformations here
        this.get('content.summary').then(function(res) {
            var metrics = res.report.metrics;
            this.set('repoSummary', Ember.Object.create({
                commits: metrics.commits,
                authors: metrics.authors,
                size: metrics.size,
                files: metrics.files
            }));
        }.bind(this));
        this.get('content.topAchievers').then(function(res) {
            this.set('content.topAchievers', res);
        }.bind(this));
        this.get('content.reports').then(function(res) {
            this.set('content.reports', res);
        }.bind(this));
    }.observes('content')
});
