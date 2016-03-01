/**
 * Created by Netta.bondy on 28/02/2016.
 */
define(['jquery', 'backbone', 'history.collection', 'history.view'],
    function($, Backbone, HistoryCollection, HistoryView){

    return Backbone.View.extend({
        el: 'aside',

        initialize: function(){
            console.log('Sidebar view says hello world!');
            this.history = new HistoryCollection;
            this.historyview = new HistoryView();
            this.on('openView', this.onOpenView);
        },

        events: {
            'click .fn-click-close': 'clickClose',
            'click #search-btn': 'doSearch'
        },

        onOpenView: function() {
            //console.log('Events sequence initialized!');
            this.$el.slideDown();
        },

        clickClose: function() {
            this.$el.slideUp();
        },

        doSearch: function() {
            var searchVal = $('#search-input').val();
            console.log(searchVal);
            this.history.add({name: searchVal});
            console.log(this.history.length);

            //trigger search event in main view to request data
            this.trigger('search');

        }

    });
});
