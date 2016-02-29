/**
 * Created by Netta.bondy on 28/02/2016.
 */
define(['jquery', 'backbone'], function($, Backbone){

    return Backbone.View.extend({
        el: 'aside',

        initialize: function(){
            console.log('Sidebar view says hello world!');
            this.on('openView', this.onOpenView);
        },

        events: {
            'click .fn-click-close': 'clickClose'
        },

        onOpenView: function() {
            //console.log('Events sequence initialized!');
            this.$el.slideDown();
        },

        clickClose: function() {
            console.log("close clicked");
            this.$el.slideUp();
        }

    });
});
