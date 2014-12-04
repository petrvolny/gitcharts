import Ember from 'ember';

export default Ember.Controller.extend({

    repoSummary: undefined,

    init: function() {
        this._super();
        this.set('days', 21);
    },

    contentChanged: function() {
        // Prepare model for Summary
        this.get('content.summary').then(function(res) {
            var metrics = res.report.metrics;
            this.set('repoSummary', Ember.Object.create({
                commits: metrics.commits,
                authors: metrics.authors,
                size: metrics.size,
                files: metrics.files
            }));
        }.bind(this));

        // Prepare model for Top Acievers
        this.get('content.topAchievers').then(function(res) {
            var metrics = res.report.metrics;

            this.set('topAchievers', Ember.keys(metrics).reduce(function(prev, curr) {
                var newCategory = {};
                newCategory[curr] = { winner: metrics[curr][1], value: metrics[curr][0]};

                return Ember.merge(prev, newCategory);
            }, Ember.Object.create()));
        }.bind(this));

        // Prepare model for charts
        this.get('content.reports').then(function(res) {
            var dates = res.report.x;
            var metrics = res.report.metrics;

            this.set('reports', dates.map(function(date, idx) {
                return {
                    date: date,
                    commits: metrics.commits[idx],
                    files_a: metrics.files_a[idx],
                    files_r: metrics.files_r[idx],
                    files_c: metrics.files_c[idx],
                    lines_a: metrics.lines_a[idx],
                    lines_r: metrics.lines_r[idx],
                    size: metrics.size[idx]
                };
            }));
        }.bind(this));
    }.observes('content')
});
