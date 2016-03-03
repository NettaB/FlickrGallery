/**
 * Created by Netta.bondy on 28/02/2016.
 */
define(['jquery', 'backbone', 'history.collection', 'history.view'],
    function($, Backbone, HistoryCollection, HistoryView){

    return Backbone.View.extend({
        el: 'aside',

        initialize: function(){
            console.log('Sidebar view says hello world!');
            //init collection
            this.history = new HistoryCollection;

            //init subview
            this.historyView = new HistoryView();

            //listens for openSidebar event on parent view
            this.on('openView', this.onOpenView);
        },

        events: {
            //handles close click
            'click .fn-click-close': 'clickClose',
            //handles search click
            'click #search-btn': 'doSearch'
        },

        //opens sidebar menu
        onOpenView: function() {
            this.$el.slideDown();
        },

        //closes sidebar menu
        clickClose: function() {
            this.$el.slideUp();
        },

        //callback for search click
        doSearch: function() {
            var searchVal = $('#search-input').val();
            //validations
            if (!searchVal) {
                alert("Please enter a search value.")
            }

            //create new model in history collection
            this.history.create({name: searchVal});
            //triggers event in history subview
            this.historyView.trigger('newSearchDone');

            //deliver search term to search collection
            //this.searchCollection.searchTerm = String(searchVal);
            //triggers event in search service
            //this.searchCollection.trigger('newSearchDone',[searchVal]);



            //trigger search event in main view to request data
            this.trigger('searchEvent', [searchVal]);


            //creates new collection for results

        }

    });
});
