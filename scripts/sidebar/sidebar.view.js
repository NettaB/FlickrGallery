/**
 * Created by Netta.bondy on 28/02/2016.
 */
define(['jquery', 'backbone', 'dot', 'history.collection', 'history.view',
    'text!sidebar/tmpl/sidebar.tmpl.html'],
    function($, Backbone, Dot, HistoryCollection, HistoryView, SidebarTmpl){

    return Backbone.View.extend({
        el: 'aside',

        /**
         * @function initialize
         * calls render for sidebar
         * initializes history collection
         * initializes historyView view
         */
        initialize: function(){

            this.render();

            //init collection
            this.history = new HistoryCollection;

            //init subview
            this.historyView = new HistoryView();

            /**
             * @listens openView
             * @listens historyItemClicked
             */
            this.on('openView', this.onOpenView);
            this.historyView.on('historyItemClicked', this.historySearch, this)
        },

        /**
         * @function render
         * renders sidebar
         */
        render: function() {
            var sidebarTemplate = Dot.template(SidebarTmpl);
            this.$el.html(sidebarTemplate);

        },

        /**
         * @event fn-click-close#click
         * @event input#change
         */
        events: {
            //handles close click
            'click .fn-click-close': 'clickClose',
            //handles search input change
            'change input': 'doSearch',

            'click #favorites-link': 'getFavorites'
        },

        /**
         * opens sidebar menu
         */
        onOpenView: function() {
            this.$el.slideDown();
        },

        /**
         * closes sidebar menu
         */
        clickClose: function() {
            this.$el.slideUp();
        },

        /**
         * @function
         * executes on search click
         * adds search terms to collection
         */
        doSearch: function() {
            var searchVal = $('#search-input').val().trim();
            //validations
            if (!searchVal) {
                alert("Please enter a search value.")
            } else {
                //create new model in history collection
                this.history.create({name: searchVal});
                //triggers event in history subview
                this.historyView.trigger('newSearchDone');
                //trigger search event in main view to request data
                //console.log(searchVal);
                this.trigger('searchEvent', [searchVal]);
            }
        },

        /**
         * @function historySearch
         * @param clickedText       -term from history list that was clicked for search
         * triggers new search with clicked term
         */
        historySearch: function(clickedText) {
            var searchVal = String(clickedText);
            this.trigger('searchEvent', [searchVal]);
        },

        getFavorites: function() {
            this.trigger('favoritesClicked')
        }

    });
});
