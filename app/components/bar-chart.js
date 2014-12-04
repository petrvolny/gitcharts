import Ember from 'ember';

export default Ember.Component.extend({

    chart: undefined,
    tagName: 'div',
    classNames: ['chart'],
    data: undefined,

    didInsertElement: function() {
        var yKey = this.get('yKey');
        this.chart = Morris.Bar({
            element: this.get('element').id,
            xkey: this.get('xKey'),
            ykeys: [this.get('yKey')],
            labels: [this.get('yKey')],
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
