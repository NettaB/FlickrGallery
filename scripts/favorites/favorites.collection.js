/**
 * Created by Netta.bondy on 13/03/2016.
 */
define(['backbone', 'underscore', 'localStorage', 'photo.model'],
    function(Backbone, _, LocalStorage, PhotoModel){

    return Backbone.Collection.extend ({

        Model: PhotoModel,

        localStorage: new Backbone.LocalStorage('FavoritesCollection'),

        initialize: function(){
        }
    })
});