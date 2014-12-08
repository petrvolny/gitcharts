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
            days: days,
            summary: Ember.$.getJSON('/p/'+project+'/r/summary'),
            topAchievers: Ember.$.getJSON('/p/'+project+'/r/winners'),
            reports: Ember.$.getJSON('/p/'+project+'/r/last_x_days?days='+days),
        });
    }
});
