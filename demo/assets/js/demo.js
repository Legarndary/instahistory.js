$('#feed').instahistory({
    get: '@instagram',
    imageSize: 240,
    limit: 9,
    template: '<div class="col"><a href="{{link}}" type="_blank"><img src="{{image}}"><span class="info">❤️ {{likes}} 💬 {{comments}}</span></a></div>'
});
