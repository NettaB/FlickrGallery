/**
 * Created by Netta.bondy on 28/02/2016.
 */
define(['jquery', 'backbone'], function($, Backbone){

    return Backbone.View.extend({
        el: 'header',

        initialize: function(){
            console.log('Header view says hello world!')
        },

        events: {
            'click .fn-click-open' : 'clickBtn'
        },

        clickBtn: function() {
            this.trigger('open');
        }

    });
});
