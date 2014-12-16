import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        days: {
            refreshModel: true
        }
    },

    model: function(params) {
        // TODO: Do not set default value here. Rather transition to
        // the properly parametrized route.
        var project = params.project_id || 'linux';
        var days = params.days || 7;

        return Ember.Object.create({
            projectName: project,
            days: days,
            summary: Ember.$.getJSON('/api/p/'+project+'/r/summary'),
            topAchievers: Ember.$.getJSON('/api/p/'+project+'/r/winners'),
            reports: Ember.$.getJSON('/api/p/'+project+'/r/last_x_days?days='+days),
            filesReport: Ember.$.getJSON('/api/p/'+project+'/r/last_x_days_files?days='+days)
        });
    }
});
