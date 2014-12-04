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
        var yKey = this.get('yKey');
        this.chart = Morris.Line({
            element: this.get('element').id,
            xkey: this.get('xKey'),
            ykeys: this.get('keys'),
            labels: this.get('keys'),
            hideHover: 'always',
            resize: true,
            xLabelAngle: 60,
            gridTextSize: 10,
            barColors: function(row, series, type) {
                if (row.y > 0) {
                    return '#00F';
                } else {
                    return '#F00';
                }
            }
        });
    },

    dataChanged: function() {
        this.chart.setData(this.get('data'));
    }.observes('data')
});
