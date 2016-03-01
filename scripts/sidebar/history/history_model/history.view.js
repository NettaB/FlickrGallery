/**
 * Created by Netta.bondy on 01/03/2016.
 */
define(['backbone', 'history.collection'],
    function(Backbone, HistoryCollection){

    return Backbone.View.extend({
        el: '#history-list',
        template: '',

        initialize: function(){
            var history = new HistoryCollection;
                history.fetch()
                    .done(function(response) {
                        console.log(response);
                        this.render();
                    })
                    .fail(function (error) {
                        console.log('Error');
                        console.log(error);
                    });
            this.render();

        },


        render: function() {
            this.$el.html(dot(this.template, {}));

        return this;
        }

    })
});