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
                history = new HistoryCollection;
                that.historyArr = [];
                    history.fetch()
                        .done(function(response) {
                            console.log(response);
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


            //listen for changes
            //this.on('add', this.render())
            //this.on('search', that.historyAdd());
            this.on('newSearchDone', this.onNewSearchDone, this)
        },


        render: function() {
            var that = this;
            //slices array to show last 10 results
            var historyDispArr = [],
            historyDispLength = that.historyArr.length - 20;
            if(that.historyArr.length < 21) {
                historyDispArr = that.historyArr.reverse();
            } else {
                historyDispArr = that.historyArr.slice(historyDispLength).reverse()
            }
            //console.log(historyDispArr);

            //templating
            var historyItem = Dot.template(HistoryItemTemplate);
            $('#history-list-child').empty().append(historyItem({historyDispArr}));

        return this;
        },

        //listens to new searches
        onNewSearchDone: function(){
            var that = this,
                history = new HistoryCollection;
            that.historyArr = [];
            history.fetch()
                .done(function(response) {
                    console.log(response);
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