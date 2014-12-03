import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        // TODO: Do not set default value here. Rather transition to
        // the properly parametrized route.
        var project = params.project_id || 'linux';

        return Ember.Object.create({
            summary: Ember.$.getJSON('/p/'+project+'/r/summary'),
            topAchievers: Ember.$.getJSON('/p/'+project+'/r/winners'),
            reports: Ember.$.getJSON('/p/'+project+'/r/last_x_days?days=30')
        });
    }
});
