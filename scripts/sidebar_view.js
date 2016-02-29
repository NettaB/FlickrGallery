/**
 * Created by Netta.bondy on 28/02/2016.
 */
define(['jquery', 'backbone'], function($, Backbone){

    return Backbone.View.extend({
        el: 'aside',
        initialize: function(){
            console.log('Sidebar view says hello world!')
        }

    });
});
