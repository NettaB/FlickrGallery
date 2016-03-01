/**
 * Created by Netta.bondy on 29/02/2016.
 */

define(['backbone', 'localstorage', 'history_model'], function(Backbone, LocalStorage, HistoryModel){

    return Backbone.Collection.extend ({
        model: HistoryModel,
        localStorage: new Backbone.LocalStorage('search-history')

        //nextOrder: function() {
          //  if(!this.length) return 1;
            //return this.last().get('order') + 1;
        //},

//        comparator: 'order'
    });
});
