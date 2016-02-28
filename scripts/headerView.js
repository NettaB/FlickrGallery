/**
 * Created by Netta.bondy on 28/02/2016.
 */
define(['jquery', 'backbone', 'mainview'], function($, Backbone, MainView){

    var theHeaderView = Backbone.View.extend({
        initialize: function(){
            console.log('hello world!')
        }

    });

    var headerView1 = new theHeaderView();
});
