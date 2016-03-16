/**
 * Created by Netta.bondy on 14/03/2016.
 */
define(['backbone', 'localStorage', 'photo.model'],
    function(Backbone, LocalStorage, PhotoModel){

        return Backbone.Collection.extend ({

            Model: PhotoModel,

            localStorage: new Backbone.LocalStorage('ViewedCollection'),

            initialize: function(){
            }
        })
    });