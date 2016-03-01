/**
 * Created by Netta.bondy on 29/02/2016.
 */

define(['backbone', 'localstorage', 'history.model'], function(Backbone, LocalStorage, HistoryModel){

    return Backbone.Collection.extend ({
        model: HistoryModel,
        localStorage: new Backbone.LocalStorage('search-history')

    });
});
