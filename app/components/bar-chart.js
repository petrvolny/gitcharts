/* globals Morris */
import Ember from 'ember';

export default Ember.Component.extend({

    chart: undefined,
    tagName: 'div',
    classNames: ['chart'],
    data: undefined,

    didInsertElement: function() {
        var negativeColor = this.get('negativeColor') || '#EE7777',
            positiveColor = this.get('positiveColor') || '#7777EE';

        this.chart = Morris.Bar({
            element: this.get('element').id,
            xkey: this.get('xKey'),
            ykeys: [this.get('yKey')],
            parseTime: false,
            labels: [this.get('yKey')],
            hideHover: 'false',
            resize: true,
            xLabelAngle: 60,
            gridTextSize: 10,
            hoverCallback: function(index, options, content) {
                return(content);
            },
            barColors: function(row) {
                if (row.y > 0) {
                    return positiveColor;
                } else {
                    return negativeColor;
                }
            }
        });
    },

    dataChanged: function() {
        this.chart.setData(this.get('data'));
    }.observes('data')
});
