/**
 * Created by Netta.bondy on 28/02/2016.
 */
define(['jquery', 'backbone', 'text!header/tmpl/header.tmpl.html'],
    function($, Backbone, HeaderTemplate){

    return Backbone.View.extend({
        el: 'header',

        /**
         *@function initialize
         */
        initialize: function(){
            this.render();
        },

        /**
         * @function render
         */
        render: function(){
            //template injection from header.tmpl
            this.$el.append(HeaderTemplate)

        },

        /**
         * @listens click
         * @event #openSidebar
         */
        events: {
            'click .fn-click-open' : 'clickBtn'
        },

        /**
         * @fires #openSidebar
         */
        //triggers openSidebar event on parent view
        clickBtn: function() {
            this.trigger('openSidebar');
        }

    });
});
