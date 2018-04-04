(function($) {
    $.fn.instahistory = function(options) {
        var settings;
        var searchType;
        var searchUrl;
        var buildTemplate;
        var $container = this;

        settings = $.extend({
            get : '',
            imageSize: 150,
            limit : 6,
            links : true,          
            squareImages: true,
            template: ''
        }, options);

        buildTemplate = function(data, image, link) {
            String.prototype.allReplace = function(obj) {
                var retStr = this;
                for (var x in obj) {
                    retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
                }
                return retStr;
            };

            var templateCodes = {
                '{{caption}}': data.edge_media_to_caption.edges[0].node.text,
                '{{comments}}': data.edge_media_to_comment.count,
                '{{image}}': image,
                '{{likes}}': data.edge_liked_by.count,
                '{{link}}': link
            }

            var template = settings.template.allReplace(templateCodes);

            return template;
        }

        if(settings.container) {
            if($container.find(settings.container).length > 0) {
                $container = $container.find(settings.container).first();
            }
        }

        if($.type(options) == 'string') {
            settings.get = options;
        }

        if(settings.get != '') {
            // Determine what type of search we are going to make.
            if(settings.get.indexOf('#') > -1) {
                searchType = 'tag';
                searchUrl = 'https://www.instagram.com/explore/tags/' + settings.get.split('#')[1] + '/?__a=1';
                if(settings.limit > 68) {
                    settings.limit = 68;
                    console.log("The max number of images for a tag is 68");
                }
            } else if(settings.get.indexOf('@') > -1) {
                searchType = 'user';
                searchUrl = 'https://www.instagram.com/' + settings.get.split('@')[1] + '/?__a=1';
                if(settings.limit > 12) {
                    settings.limit = 12;
                    console.log("The max number of images for a user is 12");
                }
            } else {
                searchType = false;
            }

            if(searchType) {
                $.ajax({
                    url: searchUrl,
                    success: function(data) {
                        var nodes;

                        if(searchType == 'tag') {
                            nodes = data.graphql.hashtag.edge_hashtag_to_media.edges;
                        } else {
                            nodes = data.graphql.user.edge_owner_to_timeline_media.edges;
                        }

                        for (var i = 0; i < settings.limit; i++) {
                            post = nodes[i].node;
                            image = $('<img/>');
                            imageUrl = '';
                            linkUrl =  'https://www.instagram.com/p/' + post.shortcode + '/';

                            if(settings.squareImages) {
                                var size; // is an index in an array
                                switch(settings.imageSize) {
                                    case 150:
                                        size = 0;
                                    break;
                                    case 240:
                                        size = 1;
                                    break;
                                    case 320:
                                        size = 2;
                                    break;
                                    case 480:
                                        size = 3;
                                    break;
                                    case 640:
                                        size = 4;
                                    break;
                                }
                                imageUrl = post.thumbnail_resources[size].src;
                            } else {
                                imageUrl = post.display_url;
                            }

                            image.attr('src', imageUrl);

                            if(settings.template == '') {
                                if(settings.links) {
                                    link = $('<a/>',{
                                        href: linkUrl,
                                        target: '_blank'
                                    }).append(image);

                                    $container.append(link);
                                } else {
                                    $container.append(image);
                                }
                            } else {
                                $container.append(buildTemplate(post, imageUrl, linkUrl));
                            }
                        }
                    },
                    error: function(err) {
                        switch(err.status) {
                            case 404:
                                console.warn('Sorry, but there was no results for that ' + searchType);
                            break;
                            default:
                                console.warn('An unknow error happend');
                            break;
                        }
                    }
                });
            } else {
                console.warn("Your search word must contain a '#' or a '@'. Like it would on instagram");
            }

        } else {
            console.warn("You need to specify a tag (e.g. #summer) or a user (e.g. @instagram) in the 'get' parameter, to search.");
        }
    }
})(jQuery);