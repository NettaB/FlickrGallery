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
                //init collection
            this.history = new HistoryCollection;

                //init array for template iteration
            this.historyArr = [];
                    //fetch data from local storage
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
                            console.log(error);
                        });


            //listens for search event on parent view
            this.on('newSearchDone', this.onNewSearchDone, this);
            //this.on('historyItemClicked', this.itemClicked, this);
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

        //callback for new search event
        onNewSearchDone: function(){
            var that = this;
                this.historyArr = [];
                this.history.fetch()
                    .done(function(response) {

                        //deletes items over 20
                        if(response.length > 20) {
                            var difference = response.length - 20;
                            for (var i = 0; i < difference; i++){
                                that.history.at(i).destroy();

                            }
                        }

                        //creates array of search terms
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

        //handle past search click event
        itemClicked: function(e) {
            //extract text
            var clickedText = $(e.target).text();
            //alert parent view to init search service
            this.trigger('historyItemClicked', [clickedText])
        }
    });
});