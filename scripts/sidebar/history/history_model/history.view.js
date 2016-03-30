/**
 * Created by Netta.bondy on 01/03/2016.
 */
define(['jquery', 'backbone', 'dot', 'localStorage', 'history.collection',
    'text!sidebar/history/tmpl/historyitem.tmpl.html'],
    function($, Backbone, Dot, LocalStorage, HistoryCollection, HistoryItemTemplate){

    return Backbone.View.extend({
       el: '#history-section',

        initialize: function(){
            var that = this;

            /**
             * @property history        -collection
             */
            this.history = new HistoryCollection;

            /**
             * @property {Array} historyArr
             */
            this.historyArr = [];
                    //fetch data from local storage
            /**
             * @returns {Array} historyArr   -populates array
             * @throws will throw and error and log details if fetch failed
             */
            this.history.fetch()
                    .done(function(response) {
                        //console.log(that.history.length);

                        //creates array of search names
                        for (var i = 0; i < response.length; i++){
                            that.historyArr.unshift(response[i].name);
                            }

                            //render
                            that.render();
                        })
                        .fail(function (error) {
                            console.error(error);
                        });


            /**
             * @listens newSearchDone
             */
            this.on('newSearchDone', this.onNewSearchDone, this);
        },

        events: {
            'click .history-items': 'itemClicked'
        },


        render: function() {
            var historyDisplay = this.historyArr;
            //templating
            var historyItem = Dot.template(HistoryItemTemplate);
            $('#history-list').empty().append(historyItem({historyDisplay}));

        },

        /**
         * @function onNewSearchDone
         * @throws logs error if fetch fails
         */
        onNewSearchDone: function(){
            var that = this;
                this.historyArr = [];
                this.history.fetch()
                    .done(function(response) {

                        /**
                         * deletes items over 20
                         */
                        if(response.length > 20) {
                            var difference = response.length - 20;
                            for (var i = 0; i < difference; i++){
                                that.history.at(i).destroy();

                            }
                        }

                        /**
                         * creates array of search terms
                         */
                        for (var j = 0; j < 20; j++){
                            var prop = that.history.models[j].attributes.name;
                            that.historyArr.unshift(prop);
                        }

                        //render
                        that.render();
                })
                    .fail(function (error) {
                        console.log(error);
                });
        },

        /**
         * @fires historyView#bhistoryItemClicked
         * @param e     -search term which was clicked
         */
        itemClicked: function(e) {
            //extract text
            var clickedText = $(e.target).text();
            //alert parent view to init search service
            this.trigger('historyItemClicked', [clickedText])
        }
    });
});