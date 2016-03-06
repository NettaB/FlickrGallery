/**
 * Created by Netta.bondy on 29/02/2016.
 */
define(['jquery', 'backbone', 'dot', 'text!photo/tmpl/photo.view.template.html'],
    function($, Backbone, Dot, PhotoViewTemplate){

    return Backbone.View.extend({
        el: '#photo',
        initialize: function(){
            console.log('Photo view says hello world!');

            this.on('collectionFull', this.render, this)
        },

        render: function(){
            console.log('photo view is rendered');
            var thisPhoto = this.collection.models[0].attributes.url_l;
            console.log(thisPhoto);
            var photoDisplay = Dot.template(PhotoViewTemplate);
            $('#photo').append(photoDisplay({url:thisPhoto}));

        }

    });
});
