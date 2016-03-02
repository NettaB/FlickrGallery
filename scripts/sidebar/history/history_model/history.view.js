/**
 * Created by Netta.bondy on 01/03/2016.
 */
define(['backbone', 'dot', 'localStorage', 'history.collection',
    'text!sidebar/history/tmpl/historyitem.tmpl.html'],
    function(Backbone, Dot, LocalStorage, HistoryCollection, HistoryItemTemplate){

    return Backbone.View.extend({
       el: '#history-list',

        initialize: function(){
            var that = this,
                //init collection
                history = new HistoryCollection;
                //init array for template iteration
                that.historyArr = [];
                    //fetch data from local storage
                    history.fetch()
                        .done(function(response) {

                            //creates array of search names
                            for (var i = 0; i < response.length; i++){
                                that.historyArr.push(response[i].name);
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
            var that = this;
            //slices array to show last 20 results
            var historyDispArr = [],
            historyDispLength = that.historyArr.length - 20;
            if(that.historyArr.length < 21) {
                historyDispArr = that.historyArr.reverse();
            } else {
                historyDispArr = that.historyArr.slice(historyDispLength).reverse()
            }

            //templating
            var historyItem = Dot.template(HistoryItemTemplate);
            $('#history-list-child').empty().append(historyItem({historyDispArr}));

        return this;
        },

        //callback for new search event
        onNewSearchDone: function(){
            var that = this,
                history = new HistoryCollection;
            that.historyArr = [];
            history.fetch()
                .done(function(response) {
                    //console.log(response);
                    //creates array of search terms
                    for (var i = 0; i < response.length; i++){
                        that.historyArr.push(response[i].name);
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