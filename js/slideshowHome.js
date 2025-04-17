<!--
var iSS=Array();

function WF(){
	if(window.innerWidth)return window.innerWidth;
	else return document.body.clientWidth;
}
function HF(){
	if(window.innerHeight)return window.innerHeight;
	else return document.body.clientHeight;
}
// SLIDESHOW
// variabili
var oSS=new Array();
var iS=new Array();
var carS=new Array();
var nAtt=fd=0;
var TT,TT2;
var velFD=50;
var tempoTimer=5000; // 3 secondi
var dest=1;
var tmSp=null;

//iSS=imgs.split(",");
// fade
function spostaSS(n){
	clearTimeout(tmSp);
	document.getElementById("ss").style.marginLeft='-'+n+'00%';
	var palls = document.getElementById("ss_palls").getElementsByTagName("div");
	for(p=0;p<palls.length;p++){
		if(p==n)palls[p].className='pallSel';
		else palls[p].className='';
	}
	nAtt=n+1;
	if(nAtt>=slideshow.length)nAtt=0;
	tmSp = setTimeout('spostaSS('+nAtt+')',tempoTimer);
}

function fitAnimation(){
	var h='';
	if(WF()>730){
		h=(HF()*.7)+'px';
	}
	document.getElementById("slideshow").style.height=h;
	document.getElementById("ss").style.height=h;
	var els = document.getElementById("ss").getElementsByTagName("div");
	for(e=0;e<els.length;e++)els[e].style.height=h;
}

function ini(){
	var cont=contPalls='';
	for(l=0;l<slideshow.length;l++){
		//cont+='<div style="background-image:url(../_img/fMenu.png), url(../_img/fMenuInv.png),url(\'';
		cont+='<div style="background-image:none,none,url(\'';
		if(WF()>600)cont+=slideshow[l].imgD;
		else cont+=slideshow[l].imgM;
		cont+='\');';
		if(slideshow[l].lnk)cont+='cursor:pointer;';
		cont+='" class="'+slideshow[l].cls+'"';
		if(slideshow[l].lnk)cont+=' onClick="window.open(\''+slideshow[l].lnk+'\',\'_self\')"';
		cont+='>';
		cont+=slideshow[l].txt+'</div>';
		contPalls+='<div onClick="spostaSS('+l+')"></div>';
		
	}
	document.getElementById("ss").innerHTML=cont;
	document.getElementById("ss_palls").innerHTML=contPalls;
	document.getElementById("ss").style.opacity=1;
	spostaSS(0);
	fitAnimation();
}


window.addEventListener ("load", function () {
	fitAnimation();
	setTimeout("ini()",1000);
}, true);
window.addEventListener("resize",fitAnimation,false);

// FUNZIONI TOUCH
var touchX = -1,
	touchOr = -1,
	mlOr;
function touchHandler( event ){
	switch (event.type){
		case "touchstart":
			touchOr = event.touches[0].screenX;
			mlOr = document.getElementById("ss").style.marginLeft;
			break;
		case "touchmove":
			var diff = touchX-touchOr;
			touchX = event.touches[0].screenX;
			document.getElementById("ss").style.marginLeft = 'calc('+mlOr+' + '+diff+'px)';
			break;
		case "touchend":
			var diff = touchX-touchOr;
			var n = nAtt -1;
			if(n<0)n=slideshow.length-1;
			if(Math.abs(diff)>70 && ((diff>0 && n>0) || (diff<0 && n<slideshow.length-1))){
				if(diff<0)spostaSS(nAtt);
				else spostaSS(n-1);
			}else document.getElementById("ss").style.marginLeft = mlOr;
			break;
	}
}

window.addEventListener ("load", function () {
	if(touchable){
		document.getElementById("slideshow").addEventListener("touchstart",touchHandler ,false);
		document.getElementById("slideshow").addEventListener("touchmove",touchHandler ,false);
		document.getElementById("slideshow").addEventListener("touchend",touchHandler ,false);
	}
}, true);
//-->