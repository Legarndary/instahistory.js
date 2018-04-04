# instahistory.js
This is a jQuery plugin that helps you with getting information from Instagram. In short **instahistory** helps you get an Instagrams user's or hashtag's history of posts. All without the use of "Access Token" and "Client Id". 

## Getting Started
The only thing you need to do for making this works is including jQuery and then the instahistory.js file.
```js
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="path/to/instahistory.js"></script>
```

### Simple Usage
Call the plugin on the element that you want as a container for the history like this: `$('#element').instahistory('@instagram')`. You can change *"@instagram"* to whatever username or hashtag your like. 

### Advanced Usage
You can call the plugin with custom options.
```js
$('#element').instahistory({
    get: '@instagram',
    limit: 9
});
```

## Options 
There is a couple of options that you can change when you call the plugin.
- **get**: Defines what you want to get from instagram, either an username or a hashtag. Type String, **Required**.
- **imageSize**: Defines what thumbnail size you want the images in, available sizes are: `150`,`240`,`320`,`480`,`640`. Type Int, default is 150.
- **limit**: Defines how many items do you want from the history. As of now an user history has a max of 12, and a hashtag has a limit of 68. Type Int, default is 6.
- **links**: Defines what ever you want the images to be inside links or not, the links are to the post of the image. Type: Bool, default is true.
- **squareImages**: Defines if you want the use thumbnails. If set to false the plugin ignores the imageSize property. The plugin will return the display url of the image. It means that you will get an images with their original orientation and size. Up to 1080px and the smallest side. Type Bool, default is true.
- **template**: Defines a html template to use with with the history from instagra, for more info see [template section](#template). Type string.

## Template
Template is an easy way to make **instahistory.js** look just how you want it. Type the desired HTML markup in a string, then the markup will be used on every image instead of the default markup.

Small example:
```js
$('#element').instahistory({
    get: '@instagram',
    limit: 9,
    template: '<div class="col"><a href="{{link}}"><img src="{{image}}"></a></div>'
});
```
As you can see there are a couple of templating tags, this are some tags you can use to replace with real data. The full list of availble tags is:
- `{{caption}}` - Returns the caption for the image/post.
- `{{comments}}` - Returns the comment count.
- `{{image}}` - Returns the image url. Use other settings to control the size.
- `{{likes}}` - Returns the like count.
- `{{link}}` - Returns the link for the instagram post.

## Changelog
### 1.1
- Added **template** option so you can controls the HTML output. Added a small demo with template af basic styling.
### 1.0
- Initial release