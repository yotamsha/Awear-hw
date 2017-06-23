/**
 * Created by yotam on 21/06/2017.
 */
var controllers = [require('./controllers/tag')];
var Routes = {
    init: function(app){
        controllers.forEach(function(ctrl){
            ctrl.routes(app);
        });
    }
};

module.exports = Routes;