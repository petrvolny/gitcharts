import Ember from 'ember';

function byteUnits(val) {
    if (val < 1000) {
        return val + ' B';
    } else if (val < 1000000){
        return (val / 1000).toFixed(1) + ' kB';
    } else {
        return (val / 1000000).toFixed(1) + ' MB';
    }
}

export {
    byteUnits
};

export default Ember.Handlebars.makeBoundHelper(byteUnits);
