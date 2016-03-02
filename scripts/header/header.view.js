/**
 * Created by Netta.bondy on 28/02/2016.
 */
define(['jquery', 'backbone', 'text!header/tmpl/header.tmpl.html'],
    function($, Backbone, HeaderTemplate){

    return Backbone.View.extend({
        el: 'header',

        initialize: function(){
            console.log('Header view says hello world!');
            this.render();
        },

        render: function(){
            //template injection from header.tmpl
            this.$el.append(HeaderTemplate)

        },

        events: {
            //handles header button click
            'click .fn-click-open' : 'clickBtn'
        },

        //triggers openSidebar event on parent view
        clickBtn: function() {
            this.trigger('openSidebar');
        }

    });
});
