import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['days'],
    days: null,
    isFixedDaysFilter: false,
    isBiggerMargin: Ember.computed.alias('isFixedDaysFilter'),

    repoSummary: undefined,

    init: function() {
        this._super();
    },

    actions: {
        daysChanged: function() {
            this.set('days', this.get('daysCounter'));
        }
    },

    contentChanged: function() {
        // Prepare model for Summary
        this.set('daysCounter', this.get('content.days'));
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

        this.get('content.filesChanged').then(function(res) {
            this.set('filesChanged', res.report.metrics.sum);
        }.bind(this));
    }.observes('content'),

    linesTotals: function() {
        if (this.get('reports')) {
            return {
                added: this._sumFor('reports', 'lines_a'),
                deleted: this._sumFor('reports', 'lines_r')
            };
        } else {
            return { added: 0, deleted: 0 };
        }
    }.property('reports'),

    filesTotals: function() {
        if (this.get('reports')) {
            return {
                added: this._sumFor('reports', 'files_a'),
                deleted: this._sumFor('reports', 'files_r'),
                changed: this._sumFor('reports', 'files_c')
            };
        } else {
            return { added: 0, deleted: 0, changed: 0 };
        }
    }.property('reports'),

    commitsTotal: function() {
        if (this.get('reports')) {
            return this._sumFor('reports', 'commits');
        }
    }.property('reports'),

    sizeTotal: function() {
        if (this.get('reports')) {
            return this._sumFor('reports', 'size');
        }
    }.property('reports'),

    _sumFor: function(arrayProp, key) {
        return this.get(arrayProp).reduce(function(prev, curr) {
            return prev + curr[key];
        }, 0);
    }
});
