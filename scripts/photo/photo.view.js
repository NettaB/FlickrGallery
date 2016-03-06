/**
 * Created by Netta.bondy on 29/02/2016.
 */
define(['jquery', 'backbone', 'dot', 'text!photo/tmpl/photo.view.template.html',
'text!photo/tmpl/photo.view.empty.template.html'],
    function($, Backbone, Dot, PhotoViewTemplate, PhotoViewEmpty){

    return Backbone.View.extend({
        el: '#photo',
        initialize: function(){
            console.log('Photo view says hello world!');

            this.render();

            this.on('collectionFull', this.showPhoto, this)
        },

        render: function(){
            var emptyPhotoSection = Dot.template(PhotoViewEmpty);
            this.$el.append(emptyPhotoSection);

        },
        //render photo view on collection creation.
        //triggered from Parent View
        showPhoto: function() {
            console.log('photo view is rendered');
            var thisPhoto = this.collection.models[0].attributes.url_l;
            var thisPhotoSmall = this.collection.models[0].attributes.url_t;
            console.log(thisPhoto);
            console.log(thisPhotoSmall);
            var photoDisplay = Dot.template(PhotoViewTemplate);
            if (!thisPhoto) {
                $('#photo').empty().append(photoDisplay({url:thisPhotoSmall}))

            } else
            {$('#photo').empty().append(photoDisplay({url:thisPhoto}))}
        }

    });
});
