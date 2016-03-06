/**
 * Created by Netta.bondy on 01/03/2016.
 */
define(['backbone', 'dot', 'localStorage', 'history.collection',
    'text!sidebar/history/tmpl/historyitem.tmpl.html'],
    function(Backbone, Dot, LocalStorage, HistoryCollection, HistoryItemTemplate){

    return Backbone.View.extend({
       el: '#history-list',

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
            this.on('newSearchDone', this.onNewSearchDone, this)
        },


        render: function() {
            console.log(this.historyArr);
            var historyDisplay = this.historyArr;
            console.log(historyDisplay);
            //slices array to show last 20 results


            //templating
            var historyItem = Dot.template(HistoryItemTemplate);
            $('#history-list-child').empty().append(historyItem({historyDisplay}));

        },

        //callback for new search event
        onNewSearchDone: function(){
            var that = this;
                this.historyArr = [];
                this.history.fetch()
                    .done(function(response) {

                        //deletes items over 20
                        if(response.length > 20) {
                            that.history.at(0).destroy();
                        }
                        console.log(that.history);

                        //creates array of search terms
                        for (var i = 0; i < 20; i++){
                            var prop = that.history.models[i].attributes.name;
                            that.historyArr.unshift(prop);
                        }

                        //render
                        that.render();
                })
                    .fail(function (error) {
                        console.log(error);
                });
        }
    });
});