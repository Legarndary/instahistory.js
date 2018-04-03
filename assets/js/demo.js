$('#feed').instahistory('@instagram');

var testWord = 'test';
var mustWord = 'bare SKAL';

$('.test').text($('.test').text().replace('((test))', testWord).replace(/[[måske]]/g, mustWord));

