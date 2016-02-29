/**
 * Created by Netta.bondy on 29/02/2016.
 */
define(['jquery', 'backbone'], function($, Backbone){

    return Backbone.View.extend({
        el: '#photo',
        initialize: function(){
            console.log('Photo view says hello world!')
        }

    });
});
