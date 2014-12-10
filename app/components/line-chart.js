/* globals Morris */
import Ember from 'ember';

export default Ember.Component.extend({
    chart: undefined,
    tagName: 'div',
    classNames: ['chart'],
    data: undefined,

    keys: function() {
        var res = [];

        for (var i = 1; i < 10; i++) {
            if (this.get('yKey' + i)) {
                res.push(this.get('yKey' + i));
            } else {
                break;
            }
        }

        return res;
    }.property('data'),

    didInsertElement: function() {
        this.chart = Morris.Line({
            element: this.get('element').id,
            xkey: this.get('xKey'),
            ykeys: this.get('keys'),
            labels: this.get('keys'),
            hideHover: 'always',
            resize: true,
            xLabelAngle: 60,
            gridTextSize: 10,
            lineColors: ['#81C870', '#EC7F7F', '#979797']
        });
    },

    dataChanged: function() {
        this.chart.setData(this.get('data'));
    }.observes('data')
});
