/**
 * Created by Netta.bondy on 29/02/2016.
 */

define(['backbone', 'localStorage', 'history.model'],
    function(Backbone, LocalStorage, HistoryModel){

        /**
         * @property localStorage       -location for collection local storage
         */
        return Backbone.Collection.extend ({
            model: HistoryModel,
            localStorage: new Backbone.LocalStorage('HistoryCollection'),
            initialize: function(){

            }

        });
});
