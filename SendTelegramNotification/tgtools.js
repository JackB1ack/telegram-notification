// <a href="http://www.example.com/">inline URL</a>
const SocksAgent = require('socks5-https-client/lib/Agent');
const tl = require("vsts-task-lib/task");

exports.tglinkbuilder = function (href,linkText) {
    return "<a href=\""+ encodeURI(href) +"\">"+linkText+"</a>"
}; 

exports.getProxyCfg = function (){
var config = {};
    if(tl.getBoolInput("useProxy",false))
    {
        config = configbuilder(tl.getInput('proxyHost',false),tl.getInput('proxyPort',false),tl.getInput('proxyUsername',false),tl.getInput('proxyPassword',false));      
    }
    return config;
};

// {agent: proxyAgent}
configbuilder = function (host, port, username = null, password = null) {
 var socksAgent =  new SocksAgent({
        socksHost: host,
        socksPort: port,
        socksUsername: username,
        socksPassword: password,
      });
    return {agent: socksAgent}
};