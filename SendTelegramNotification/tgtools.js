// <a href="http://www.example.com/">inline URL</a>

exports.tglinkbuilder = function (href,linkText) {
    return "<a href=\""+ encodeURI(href) +"\">"+linkText+"</a>";
}; 