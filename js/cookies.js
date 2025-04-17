<!--

// Example:
// writeCookie("myCookie", "my name", 24);
// Stores the string "my name" in the cookie "myCookie" which expires after 24 hours.
function writeCookie(name, value, hours){
  var expire = "";
  if(hours != null){
    expire = new Date((new Date()).getTime() + hours * 3600000);
    expire = "; expires=" + expire.toGMTString();
  }
  document.cookie = name + "=" + escape(value) + expire+'; path=/';
}

function getCookie(c_name){
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++){
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name){
            return unescape(y);
        }
     }
}
function setConsCookie(){
	writeCookie("consCookie","ok",900);
	document.getElementById("consCoo").style.opacity=0;
	setTimeout("nasCoo()",1000);
}
function nasCoo(){
	document.getElementById('consCoo').style.display='none';
}
function visCoo(){
	if(getCookie("consCookie")!='ok'){
		document.getElementById("consCoo").style.opacity=1;
	}
}
function visCooRit(){
	setTimeout("visCoo()",1000);
}
if(getCookie("consCookie")!='ok')document.write('<div id="consCoo"><div id="msgCoo">'+coo_msg+'</div><div id="infoCoo" onClick="window.open(\''+coo_urlInfo+'\',\'_self\');">'+coo_info_txt+'</div><div id="okCoo" onClick="setConsCookie();">'+coo_ok_txt+'</div><div class="acapo"></div></div>');

if(window.addEventListener) {  // all browsers except IE before version 9
	window.addEventListener ("load", function () {visCooRit()}, true);
}else{
	if(window.attachEvent){   // IE before version 9
		window.attachEvent("onload", visCooRit);
	}
}
//-->