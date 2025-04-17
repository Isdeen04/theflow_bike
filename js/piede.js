<!--
// GENERICHE
var touchable=false;
function isTouchDevice() {
   var el = document.getElementById('prova');
   el.setAttribute('ontouchstart', 'return;');
   if(typeof el.ontouchstart == "function"){
	  return true;
   }else {
	  return false
   }
}
if(isTouchDevice())touchable=true;
if(!touchable)document.body.classList.add("notouch");
else document.body.classList.add("touch");

function addslashes(str) {
	str = str.replace(/\\/g, '\\\\');
	str = str.replace(/\'/g, '\\\'');
	str = str.replace(/\"/g, '\\"');
	str = str.replace(/\0/g, '\\0');
	return str;
}
function WF(){
	if(window.innerWidth)return window.innerWidth;
	else return document.body.clientWidth;
}
function HF(){
	if(window.innerHeight)return window.innerHeight;
	else return document.body.clientHeight;
}
function tCoord(obj,q){
	var c=0;
	var L='Left';
	if(q=='y')L='Top';
	c+=eval("obj.offset"+L);
	while(obj=obj.offsetParent){c+=eval("obj.offset"+L);}	
	return c;
}
function getScrollTop(){
    if(typeof pageYOffset!= 'undefined'){
        //most browsers except IE before #9
        return pageYOffset;
    }
    else{
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D= (D.clientHeight)? D: B;
        return D.scrollTop;
    }
}

// MENU
var smOp = null;
function swMenu(el){
	if(!document.getElementById("menu").classList.contains("caricato"))return;
	if(document.getElementById(el).className.indexOf('mnOp')==-1){
		document.body.classList.add('noOF');
		document.getElementById(el).className='mnOp';
		document.getElementById("p_menu").className='mnBtnOp';
	}else{
		document.body.classList.remove('noOF');
		document.getElementById(el).className='';
		document.getElementById("p_menu").className='';
		nasSM();
	}
}
function swSMPiede(n,bt){
	var el="smp"+n;
	if(document.getElementById(el).className.indexOf('smpOp')==-1){
		document.getElementById(el).classList.add('smpOp');
		bt.classList.add('smPieOp');
	}else{
		document.getElementById(el).classList.remove('smpOp');
		bt.classList.remove('smPieOp');
	}
}
function swPP(el,bt,url){
	if(document.getElementById(el).className.indexOf('PPop')==-1){
		document.getElementById(el).classList.add('PPop');
		bt.classList.add('formFrOp');
	}else{
		document.getElementById(el).classList.remove('PPop');
		bt.classList.remove('formFrOp');
	}
}
function visSM( el, url ){
	if(typeof(url)=='undefined')var url = '';
	//if(WF()>700){
		var els = document.getElementById("menu").getElementsByClassName("SMtit");
		for(e=0;e<els.length;e++){
			els[e].parentElement.getElementsByTagName("div")[0].classList.remove("vis");
			els[e].classList.remove("vis");
		}
		if(document.body.classList.contains('visCatalogue') && !el){
			els[0].parentElement.getElementsByClassName("div")[0].classList.add("vis");
			els[0].classList.add("vis")
		}
		if(WF()>1250)if(url)window.open(url,'_self');
		if(WF()<=700){
			document.getElementById("menu").classList.add("sm");
		}
			smOp = el;
	//}
	if(el){
		el.classList.toggle("vis");
		el.parentElement.getElementsByTagName("div")[0].classList.toggle("vis");
		document.getElementById("tit_sm").innerHTML = el.parentElement.getElementsByClassName("SMtit")[0].innerHTML
	}
	//if(WF()>700)
	document.getElementById("menu").classList.toggle("is_menu_mod",el.parentElement.classList.contains("menu_mod"));
}
function nasSM(){
	document.getElementById("menu").classList.remove("sm");
	document.getElementById("menu").classList.remove("is_menu_mod");
	smOp.parentElement.getElementsByTagName("div")[0].classList.remove("vis");
	smOp.classList.remove("vis");
	smOp = null;
}
function showCatalogue(){
	if(WF()>700){
		document.body.classList.toggle('visCatalogue');
		if(WF()>700)selFirst();
	}
}
window.addEventListener ("resize", function(){
	if(WF()<=700){
		document.body.classList.remove('visCatalogue');
		nasSM();
	}
}, {passive: true});
if(!localStorage.tipoSel)localStorage.tipoSel = 'sem';
if(!localStorage.marchioSel)localStorage.marchioSel = 'Specialized';
function selTipoMenu( tipo ){
	var vTipo = localStorage.tipoSel;
	if(localStorage.tipoSel)document.getElementById("menu").classList.remove(localStorage.tipoSel);
	document.getElementById("menu").classList.add(tipo);	
	localStorage.tipoSel = tipo;
	if(vTipo!=tipo && WF()>700)selFirst();
	setTipoSel();
	verNoModels();
}
function setTipoSel(){
	fetch("catalogue__setTipoSel",{
		method: 'POST',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: localStorage.tipoSel
	})
	.then(res => res.json())
	.then(data => {});
}
function selMarchio( marchio ){
	if(localStorage.marchioSel)document.getElementById("menu").classList.remove(localStorage.marchioSel);
	document.getElementById("menu").classList.add(marchio);
	var els = document.getElementById("sel_marchio").getElementsByTagName("div");
	localStorage.marchioSel = marchio;
	for(e=0;e<els.length;e++){
		els[e].classList.toggle("sel", (els[e].classList.contains("marchio_"+localStorage.marchioSel.toLowerCase())) );
	}
	verNoModels();
}
function verNoModels(){
	var marchio = localStorage.marchioSel,
		els = document.getElementById("menu").getElementsByClassName("menu_mod"),
		retrigger = false;
	for(e=0;e<els.length;e++){
		if(els[e].id!='sel_marchio'){
			var aas = els[e].getElementsByTagName("a"),
				tot = 0;
			els[e].classList.remove("vis_no_models");
			if(document.getElementById("menu").classList.contains(marchio)){
				for(a=0;a<aas.length;a++){
					if(aas[a].classList.contains(marchio)){
						tot++;
					}
				}
				if(!tot)els[e].classList.add("vis_no_models");
			}
			if(	els[e].getElementsByClassName("SMtit")[0].classList.contains("vis") && 
				els[e].classList.contains("vis_no_models") ){
				retrigger = true;
			}
		}
	}
	if(retrigger && WF()<=700){
		for(e=0;e<els.length;e++){
			if(els[e].id!='sel_marchio'){
				if(	!els[e].classList.contains("vis_no_models") && retrigger){
					els[e].getElementsByClassName("SMtit")[0].click();
					retrigger = false;
				}
			}
		}
	}
}
function selFirst(){
	//if(WF()>1100)return;
	var el = document.getElementById("menu").getElementsByClassName("menu_"+localStorage.tipoSel)[0];
	visSM( el.getElementsByClassName("SMtit")[0],'');
}
window.addEventListener("load",function(){
	if(localStorage.tipoSel)document.getElementById("menu").classList.add(localStorage.tipoSel);
	if(localStorage.marchioSel){
		document.getElementById("menu").classList.add(localStorage.marchioSel);
		var els = document.getElementById("sel_marchio").getElementsByTagName("div");
		for(e=0;e<els.length;e++){
			els[e].classList.toggle("sel", (els[e].classList.contains("marchio_"+localStorage.marchioSel.toLowerCase())) );
		}
	}
	document.getElementById("menu").classList.add("caricato");
	verNoModels();
},false);


// FOTO ZOOM
function imgBig(el,id){
	if(typeof(id)=='undefined')id=false;
	var partiImg=el.src.split("/mini/");
	var im=partiImg[0]+'/big/'+partiImg[1];
	apriFoto(im,id);
}
var imOp=false;
function apriFotoAuto(el){
	im=el.src.replace("_m.","_g.");
	apriFoto(im);
}
var nIm=0;
var imgsZ='';
var idZoom=0;
var totA=0;
var multiImg=false;
function apriFoto(im,id){
	if(typeof(id)=='undefined')id=false;
	idZoom=id;
	if(WF()>420){
		nImg=0;
		document.getElementById("carImg").src="../_include/_verImg.php?im="+escape(im);
		document.getElementById("zoom").style.backgroundImage='url(\''+addslashes(im)+'\')';
		document.getElementById("zoom").onclick=function(){
			biggerZoom();
		};
		document.getElementById("zoom_cont").className='zoomOn';
		document.getElementById("chiudiZoom").style.right='10px';
		document.getElementById("chiudiZoom").style.top='10px';
		document.getElementById("spegniPopup").style.right='50px';
		document.getElementById("spegniPopup").style.top='10px';
		document.getElementById("zoomFrSx").style.display='none';
		document.getElementById("zoomFrDx").style.display='none';
		imgsZ='';
		if(id){
			var ty='A';
			var aaa=document.getElementById("pr_"+id).getElementsByTagName("A");
			if(aaa.length==0){
				aaa=document.getElementById("pr_"+id).getElementsByTagName("IMG");
				ty='IMG';
				if(aaa[0].className=='lastItemBig')aaa.splice(0,1);
			}
			totA=aaa.length;
			if(totA>1){
				for(k=0;k<totA;k++){
					if(ty=='A'){
						var pH=aaa[k].href.split("'");
						if(pH[1]==im)nImg=k;
						imgsZ+=pH[1]+'|';
					}else{
						if(aaa[k].src.indexOf("/mini/")>-1){
							var partiImg=aaa[k].src.split("/mini/");
							var im2=partiImg[0]+'/big/'+partiImg[1];
						}else im2 = aaa[k].src;
						if(im2==im)nImg=k;
						imgsZ+=im2+'|';
					}
				}
				document.getElementById("zoomFrSx").style.display='block';
				document.getElementById("zoomFrDx").style.display='block';
				if(nImg==0)document.getElementById("zoomFrSx").style.display='none';
				if(nImg==totA-1)document.getElementById("zoomFrDx").style.display='none';
				multiImg=true;
			}
		}
		imOp=true;
		document.body.style.overflow="hidden";
	}else{
		window.open("catalogue_img?i="+encodeURIComponent(window.btoa(im)),'_blank');
	}
}
function sostFoto( el ){
	var els = document.getElementById("product_gallery").getElementsByTagName("img");
	for(e=0;e<els.length;e++){
		els[e].classList.remove("gallSel");
	}
	el.classList.add("gallSel");
	document.getElementById("leadImg").src = el.src;
	document.getElementById("leadImg").dataset.src = el.src;
	document.getElementById("leadImg").parentElement.onclick= function(){ apriFoto(el.src,parseInt(document.getElementById("leadImg").parentElement.id.replace("im","")));};
}
function biggerZoom(forzaCh){
	if(typeof(forzaCh)=='undefined')var forzaCh=false;
	if(document.getElementById("zoom_cont").className.indexOf("zoomC")>-1 || forzaCh){
		document.getElementById("zoom_cont").classList.remove("zoomC");
		document.getElementById("zoom").removeEventListener("mousemove",mouseCoord);
		document.getElementById("zoom").style.backgroundPosition='center center';
	}else{
		document.getElementById("zoom_cont").classList.add("zoomC");
		document.getElementById("zoom").addEventListener("mousemove",mouseCoord, {passive: true});
	}
}
var mouseX=mouseY=0;
function mouseCoord(e){
	if(!e){
		mouseX = event.clientX;
		mouseY = event.clientY;
	}else{
		mouseX = e.pageX;
		mouseY = e.pageY;
	}
	mouseY-=getScrollTop();
	var pad=300;
	var x=(mouseX*(iW+pad*2))/(WF()-30);
	var y=(mouseY*(iH+pad*2))/HF();
	var posX=(mouseX-x+pad)+'px';
	if(iW<=WF()-30)posX='center';
	var posY=(mouseY-y+pad)+'px';
	if(iH<=HF())posY='center';
	
	document.getElementById("zoom").style.backgroundPosition=posX+' '+posY;
	
}
function zoomGo(n){
	var pImgs=imgsZ.split("|");
	apriFoto(pImgs[nImg+n],idZoom)
}
function chiudiZoom(){
	document.body.style.overflow="visible";
	document.getElementById("zoom_cont").className='zoomCh';
	document.getElementById("zoomFrSx").style.display='none';
	document.getElementById("zoomFrDx").style.display='none';
	document.getElementById("zoom").onclick='';
	document.getElementById("zoom").classList.remove('zoomC');
	biggerZoom(true);
	imgsZ='';
	idZoom=0;
	multiImg=false;
	totA=0;
	setTimeout("rit_chiudiZoom()",600);
}
function rit_chiudiZoom(){
	document.getElementById("zoom").style.backgroundImage='';
	document.getElementById("zoom").innerHTML='';
	document.getElementById("zoom_cont").className='';
	document.getElementById("chiudiZoom").style.top='-510px';
	document.getElementById("chiudiZoom").style.right='-510px';
	imOp=false;
	iW=iH=0;
}
var iW=iH=0;
function verDimImg(w,h){
	iW=w;
	iH=h;
}
function verImg(){
	if(imOp){
		var padd=0,
			marg=40;
		if(WF()<420){
			padd=0;
			marg = 0;
		}
		var resetIW=false;
		if(!iW){
			iW=WF();
			iH=HF();
			resetIW=true;	
		}
		var rapp=iW/iH;
		nH=HF()-padd*2;
		nW=nH*rapp;
		nW=parseInt(nW);
		mT=0;
		zT=10;
		zR=((WF()-nW)/2)-padd;
		zR=parseInt(zR);
		
		if(nW>WF()-padd*2){
			nW=WF()-padd*3;
			nH=nW/rapp;
			nH=parseInt(nH);
			mT=((HF()-nH)/2)-padd;
			mT=parseInt(mT);
			zR=10;
			zT=mT;
		}
		if(nW>iW && nH>iH){
			nW=iW;
			nH=iH;
			mT=((HF()-nH)/2)-padd;
			mT=parseInt(mT);
			zT=mT+5;
			zR=((WF()-nW)/2)-padd;
			zR=parseInt(zR);
		}
		if(nW>document.getElementById("zoom_cont").scrollWidth){
			nW=document.getElementById("zoom_cont").scrollWidth;
			zR=10;
		}
		document.getElementById("zoom").style.width=(WF()-marg)+'px';
		document.getElementById("zoom").style.height=(HF()-marg)+'px';

		document.getElementById("zoom").style.marginTop='0px';
		if(resetIW)iW=iH=0;
	}
}

// TASTI PER LO ZOOM
function tasti(e){
	tasto=window.event.keyCode;
	if(tasto==27){
		if(imOp)chiudiZoom();
		chiudPaesi();
	}
	if(tasto==37 && imOp && multiImg && nImg>0)zoomGo(-1);
	if(tasto==39 && imOp && multiImg && nImg<totA-1)zoomGo(1);
}
document.onkeyup = tasti;

// PAESI
function loadLanguages(){
	if(!document.getElementById("lingue_piede").innerHTML)document.getElementById("frSess").src = 'catalogue__loadLanguages?'+paramsLanguages;
}
function apriPaesi(){
	loadLanguages();
	document.body.style.overflow="hidden";
	document.getElementById("countries_cont").classList.add("countriesVis");
}
function chiudiPaesi(){
	document.body.style.overflow="visible";
	document.getElementById("countries_cont").classList.remove("countriesVis");
}
// LINGUE PIEDE
function swLinguePiede(){
	loadLanguages();
	document.getElementById("lingue_piede").classList.toggle("visLi");
}

// VIDEO
function verVideo(){
	if(document.getElementById("videoDemo")){
		var rapp=16/9;
		if(document.getElementById("videoDemo").className.indexOf("v4_3")>-1)rapp=4/3;
		var w=document.getElementById("videoDemo").scrollWidth+6;
		var h=document.getElementById("videoDemo").scrollHeight+6;
		var nH=w/rapp;
		if(nH!=h)document.getElementById("videoDemo").style.height=nH+"px";
	}
}
window.addEventListener ("resize", function () {verVideo()}, {passive: true});
function anteprimayoutube(impl){
	document.getElementById("zoom_cont").className='zoomOn zoomBlack';
	document.getElementById("chiudiZoom").style.right='10px';
	document.getElementById("zoom").style.left='0px';
	document.getElementById("zoom").style.width='100%';
	document.getElementById("zoom").style.opacity=1;
	document.getElementById("chiudiZoom").style.top='0px';
	document.getElementById("chiudiZoom").style.right='5px';
	document.getElementById("chiudiZoom").style.opacity=1;
	document.getElementById("zoom").innerHTML='<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+impl+'?hd=1&autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>';
	imOp=true;
	verImg();
}



function verFormRic2(){
	/*document.getElementById("ricerca").className='';*/
}
function verFormRic(){
	var pass=true;
	if(WF()<=500){
		if(document.getElementById("ricerca").className.indexOf("ric_off")>-1){
			pass=false;
			document.getElementById("ricerca").className='';
		}
	}
	if(pass){
		if(document.getElementById("ricerca").value.length<3){
			pass=false;
			alert("Per poter effettuare una ricerca devi inserire almeno 3 caratteri!");
			document.getElementById("ricerca").focus();
		}
	}
	return pass;
}

// RICERCA
function swRicerca( forza ){
	if(typeof(forza)=='undefined')var forza = false;
	if(document.getElementById('barraRicerca').className.indexOf('ricerca_on')==-1 && !forza){
		document.getElementById('barraRicerca').classList.add('ricerca_on');
		document.getElementById('ricerca').focus();
	}else{
		document.getElementById('barraRicerca').classList.remove('ricerca_on');
		document.getElementById('ricerca').blur();
	}
}
/*function verRicerca(){
	if(WF()>700){
		swRicerca(true);
	}
}
window.addEventListener ("resize", function () {
	verRicerca();
}, {passive: true});*/

// MESSAGGIO DI STATO
var tmMsg = null;
function showMessage( msg ){
	clearTimeout(tmMsg);
	tmMsg = null;
	document.getElementById("msg_stato").innerHTML = msg;
	document.getElementById("msg_stato").classList.add("op");
	tmMsg = setTimeout( function(){
		document.getElementById("msg_stato").classList.remove("op");
	}, 5000);
}

/* RATINGS */
function visRating(id){
	apriPopupRatings('','','loadingPopUp');
	document.getElementById("frSess").src='catalogue__ratingsDett?id='+id;
}

function apriPopupRatings(HTML,sfondo,classe){
	if(typeof(sfondo)=='undefined')sfondo='';
	if(typeof(classe)=='undefined')classe='';
	document.getElementById("popupRatings").className='popupMsg '+classe;
	document.getElementById("popupRatings").style.background=sfondo;
	document.getElementById("popupRatings").style.backgroundImage='';
	document.getElementById("popupRatings_cont").className='zoomOn';
	document.getElementById("chiudiPopupRatings").className='chiudiMsg';
	document.getElementById("chiudiPopupRatings").style.right='10px';
	document.getElementById("chiudiPopupRatings").style.top='10px';
	document.getElementById("popupRatings").innerHTML=HTML;
}
function chiudiPopupRatings(){
	document.getElementById("popupRatings_cont").className='popupRatingsCh';
	imgsZ='';
	idZoom=0;
	multiImg=false;
	totA=0;
	setTimeout("rit_chiudiPopupRatings()",600);
}
function rit_chiudiPopupRatings(){
	document.getElementById("popupRatings").style.backgroundImage='';
	document.getElementById("popupRatings").innerHTML='';
	document.getElementById("popupRatings_cont").className='';
	document.getElementById("chiudiPopupRatings").style.top='-510px';
	document.getElementById("chiudiPopupRatings").style.right='-510px';
	imOp=false;
	iW=iH=0;
}

// PREFERITI
var overHeart=false;
function addPref(n){
	document.getElementById("frSess").src='catalogue_addpref?idProdotto='+n;
}

function reposBuyBox(){
	if(document.getElementById("buy_box")){
		if(WF()>1200){
			var hMenu = document.getElementById("testa").scrollHeight;
			/*var maxT = tCoord(document.getElementById("buy_box"),'y')-hMenu;*/
			
			var maxT = tCoord(document.querySelector(".prods"),'y') - (hMenu+60);
			
			if(getScrollTop()>=maxT){
				document.body.classList.add("bbFix");
				
				var posBottom = (tCoord(document.getElementById("list_labels"),'y')-getScrollTop())-0;
				if(document.getElementById("geometry_div"))posBottom = (tCoord(document.getElementById("geometry_div"),'y')-getScrollTop())-0;
				var h = posBottom - 69;
				if(h>HF()-69)h=HF()-69;
				//var buy_box_bottom = tCoord(document.getElementById("bottom_buy_box"),'y');
				
				/*var hMin = (tCoord(document.getElementById("buy_box"),'y')+document.getElementById("buy_box").scrollHeight)-getScrollTop()-16;
				var h = (HF()-hMenu);
				if(document.getElementById("buy_box").scrollHeight>hMin){
					h = hMin;
				}*/
				//if(buy_box_bottom<posBottom){
					document.getElementById("buy_box").style.height = h+'px';
					//document.getElementById("buy_box").style.marginTop = '0px';
				/*}else{
					setTimeout(function(){
						document.getElementById("buy_box").style.marginTop = (posBottom-buy_box_bottom)+"px";
					},100);
				}*/
				
				
				if(h<90)document.getElementById("buy_box").classList.add("nas");
				else document.getElementById("buy_box").classList.remove("nas");
				setTimeout(function(){document.getElementById("label_titolo").classList.add("vis");},200);
			}else{
				document.body.classList.remove("bbFix");
				document.getElementById("label_titolo").classList.remove("vis");
				document.getElementById("buy_box").classList.remove("nas");
				
				var h = HF()-(tCoord(document.getElementById("buy_box"),'y')-getScrollTop());
				var lucePagina = document.getElementById("buy_box").scrollHeight+50;
				if(h>=lucePagina)h=lucePagina;
				document.getElementById("buy_box").style.height = h+'px';
			}
		}else{
			document.getElementById("label_titolo").classList.remove("vis");
			document.getElementById("buy_box").classList.remove("nas");
			document.body.classList.remove("bbFix");
			document.getElementById("buy_box").style.height = '';
		}
	}
}

// FIX
function detectFix(){
	if(getScrollTop()>=28)document.body.classList.add("fix");
	else document.body.classList.remove("fix");
	
	// riposiziono il menu dei filtri
	if(document.getElementById("boxFiltri_cont")){
		if(WF()>780){
			document.getElementById("boxFiltri_cont").classList.remove("fix");
			var hMenu = document.getElementById("testa").scrollHeight;
			var maxT = tCoord(document.getElementById("boxProdotti_cont"),'y')-hMenu;
			
			if(getScrollTop()>=maxT){
				document.body.classList.add("mnFix");
				
				var hMin = (tCoord(document.getElementById("boxProdotti_cont"),'y')+document.getElementById("boxProdotti_cont").scrollHeight)-getScrollTop()-16;
				var h = (HF()-hMenu);
				if(document.getElementById("boxFiltri_cont").scrollHeight>hMin){
					h = hMin;
				}
				document.getElementById("boxFiltri_cont").style.height = h+'px';
			}else{
				document.body.classList.remove("mnFix");
				var h = HF()-(tCoord(document.getElementById("boxProdotti_cont"),'y')-getScrollTop());
				var lucePagina = document.getElementById("boxProdotti_cont").scrollHeight+50;
				if(h>=lucePagina)h=lucePagina;
				document.getElementById("boxFiltri_cont").style.height = h+'px';
			}
		}else{
			document.getElementById("boxFiltri_cont").classList.add("fix");
		}
	}

}
window.addEventListener ("scroll", function () {
	detectFix();
	reposBuyBox();
}, {passive: true});
window.addEventListener ("resize", function () {
	reposBuyBox();
}, {passive: true});

	window.addEventListener ("load", function () {
		if(touchable){
			var sheet = document.createElement('style')
			sheet.innerHTML = ".cuore, .cuoreR, .cuoreG {opacity:1 !important;width:40px !important;height:40px !important;background-size:auto !important;margin-bottom:-10px;padding-left:40px !important;background-position:center center !important;}#catalogo div:hover{box-shadow:none;}.cuore:hover{background-image:url(../_img/cuoreG.png) !important;}.cuoreR:hover{background-image:url(../_img/cuoreR.png) !important;}input[type='text'], input[type='password'], input[type='email'], select{-webkit-appearance: none; -moz-appearance: none; appearance: none; }select{background:url(../_img/frDw.png) right center no-repeat;border:1px solid #999;}";
			document.body.appendChild(sheet);
		}
		detectFix();
	}, {passive: true});
	
function swLanguage(){
	document.getElementById("selLingua").classList.toggle("linguaVis");
	document.getElementById("selLingua").style.left=(tCoord(document.getElementById("flag"))-(document.getElementById("selLingua").scrollWidth/2)+(document.getElementById("flag").scrollWidth/2))+'px';
}
var classSpinner = '';
function visLoading( vis=true, classe='' ){
	if(vis){
		document.getElementById('spinner').classList.add("vis");
		if(classe)document.getElementById('spinner').classList.add(classe);
	}else{
		document.getElementById('spinner').classList.remove("vis");
		if(classSpinner)document.getElementById('spinner').classList.remove(classSpinner);
	}
	classSpinner=classe;
}
function visResCont( vis=true ){
	if(vis){
		document.getElementById('res_cont').classList.add("vis");
		document.getElementById('res_cont').classList.add("noClick");
		document.getElementById('barraRicerca').classList.add("onSearch");
		visLoading(true,'black');
		document.getElementById('spinner').onclick=function(){visResCont(false);};
		getResProvv(document.getElementById('ricerca'));
		if(!document.getElementById('barraRicerca').classList.contains('ricerca_on'))document.getElementById('barraRicerca').classList.add('ricerca_on');
	}else{
		document.getElementById('res_cont').classList.remove("vis");
		document.getElementById('barraRicerca').classList.remove("onSearch");
		visLoading(false);
		document.getElementById('spinner').onclick="";
		swRicerca();
	}
}
function getResProvv( el ){
	document.getElementById("carImg").src = "catalogue_resProvv?p="+btoa(encodeURIComponent(el.value));	
}
function blurRes(){
	visLoading(false);
	visLoading(true);
	document.getElementById('res_cont').style.zIndex=1000;
	document.getElementById('spinner').style.zIndex=1000000003;
}
function goRes( p='' ){
	if(p)document.getElementById('ricerca').value = p;
	blurRes();
	document.getElementById("formRicerca").submit();
}
if(document.getElementById("contColoriTaglie")){
	document.getElementById("contColoriTaglie").style.height = document.getElementById("contColoriTaglie").getElementsByTagName("div")[0].scrollHeight-3 + "px";
}
//-->