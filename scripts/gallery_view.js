/**
 * Created by Netta.bondy on 29/02/2016.
 */
define(['jquery', 'backbone'], function($, Backbone){

    return Backbone.View.extend({
        el: '#gallery',
        initialize: function(){
            console.log('Gallery view says hello world!')
        }

    });
});
