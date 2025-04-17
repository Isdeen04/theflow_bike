<!--
function anteprima(n){
	window.open("catalogue_anteprima?idProdotto="+n,'','menubar=0,toolbar=0,scrollbars=0,resizable=0');
}
function video(n){
	window.open("catalogue_video?idProdotto="+n,'','menubar=0,toolbar=0,scrollbars=0,resizable=0');
}
function anteprimaVideo(txt){
	window.open(txt+".php?video="+txt,'','menubar=0,toolbar=0,scrollbars=0,resizable=0');
}
function punti(){
	window.open('../_anteprime/PUNTI/MANUALE.htm','demopunti','toolbar=0,menubar=0,resizable=0,scrollbars=0,location=0,status=1,width=800,height=600');

}
function chiedi(txt){
	if(confirm(txt)) return true;
	else return false;
}

var elCarr='';
var coloriSel=new Array();
function selColore(el,colore,im){
	document.getElementById("lk"+el).href="catalogue_add?idProdotto="+colore+"&ret="+escape(location.href);
	if(im.indexOf("http")==-1){
		imBig=im.split(".");
		imBig="../_img/prodotti/"+imBig[0]+"_g.jpg";
		im="../_img/prodotti/"+im;
	}else{
		if(im.indexOf("http")==-1)imBig=im+"?t="+(Math.floor(Date.now() / 1000));
		else{
			var pI=im.split("?");
			imBig=pI[0]+"?fmt=jpeg&qlt=80,0";
		}
	}
	if(document.getElementById("im"+el))document.getElementById("im"+el).onclick=function(){
		apriFoto(imBig);
	};
	if(typeof(coloriSel[el])!='undefined'){
		document.getElementById("cl"+el+"_"+coloriSel[el]).src='../_img/col.gif';
		document.getElementById("fr"+el+"_"+coloriSel[el]).src='../_img/fr.gif';
	}
	document.getElementById("cl"+el+"_"+colore).src='../_img/colSel.gif';
	document.getElementById("fr"+el+"_"+colore).src='../_img/frSel.gif';
	coloriSel[el]=colore;
	if(elCarr.length>0){
		var passOff=false;
		partiCarr=elCarr.split("|");
		for(k=0;k<partiCarr.length;k++){
			if(partiCarr[k]*1==colore*1){
				document.getElementById("lk"+el).href='javascript:ff();';
				document.getElementById("pA"+el).src='../_img/p_acquista_off.gif';
				document.getElementById("nDisp"+el).innerHTML='<br><a href="catalogue_viewbasket"><img src="../_img/carrellinook3.gif" width="22" height="22" border="0" align="absmiddle"> <b><font color="#990066">'+TXT_nelCarrello+'</font></b></a>';
				passOff=true;
			}
			if(!passOff){
				document.getElementById("lk"+el).href='catalogue_add?idProdotto='+colore+"&ret="+escape(location.href);
				if(document.getElementById("pr"+el))document.getElementById("pr"+el).href='javascript:visModuloInfo();';
				document.getElementById("pA"+el).src='../_img/p_acquista.gif';
				document.getElementById("nDisp"+el).innerHTML='';
			}
		}
	}
	document.getElementById("im"+el).style.backgroundImage='url('+im+')';
}
function selColoreAppr(colore){
	var partiImg=colori[colore].split(".");
	var im=colori[colore];
	var imBig='';
	if(im.indexOf("http")==-1){
		im="../_img/prodotti/"+im;
		imBig="../_img/prodotti/"+partiImg[0]+"_g."+partiImg[1];
	}else imBig=im+"?t="+(Math.floor(Date.now() / 1000));
	document.images["immagineProdotto"].style.backgroundImage='url('+im+')';
	document.images["immagineProdotto_piccola"].src=im;
	document.getElementById("linkProdotto").href="javascript:apriFoto('"+imgBig+"');";
	document.getElementById("linkImgProdotto").href="javascript:apriFoto('"+imgBig+"');";
	if(colSel){
		document.getElementById("cl"+colSel+"_1").src='../_img/col.gif';
		document.getElementById("cl"+colSel+"_2").src='../_img/col.gif';
		document.getElementById("fr"+colSel+"_1").src='../_img/fr.gif';
		document.getElementById("fr"+colSel+"_2").src='../_img/fr.gif';
	}
	document.getElementById("cl"+colore+"_1").src='../_img/colSel.gif';
	document.getElementById("cl"+colore+"_2").src='../_img/colSel.gif';
	document.getElementById("fr"+colore+"_1").src='../_img/frSel.gif';
	document.getElementById("fr"+colore+"_2").src='../_img/frSel.gif';
	colSel=colore;
	if(elCarr.length>0){
		var passOff=false;
		partiCarr=elCarr.split("|");
		for(k=0;k<partiCarr.length;k++){
			if(partiCarr[k]*1==colore*1){
				for(e=1;e<=JSAppr;e++){
					document.getElementById("lk"+e).href='javascript:ff();';
					document.getElementById("pA"+e).src='../_img/p_acquista2_off.gif';
					document.getElementById("nDisp"+e).innerHTML='<br><a href="catalogue_viewbasket"><img src="../_img/carrellinook3.gif" width="22" height="22" border="0" align="absmiddle"> <b><font color="#990066">'+TXT_nelCarrello+'</font></b></a>';
					passOff=true;
				}
			}
			if(!passOff){
				for(e=1;e<=JSAppr;e++){
					document.getElementById("lk"+e).href='javascript:acquistaProd();';
					if(document.getElementById("pr"+e))document.getElementById("pr"+e).href='javascript:visModuloInfo();';
					document.getElementById("pA"+e).src='../_img/p_acquista2.gif';
					document.getElementById("nDisp"+e).innerHTML='';
				}
			}
		}
	}
}
function acquistaProd(){
	window.open('catalogue_add?idProdotto='+colSel+'&ret='+escape(location.href),'_self');
}

function visDettProd(n){
	document.getElementById("sch"+n).style.overflow='visible';
	document.getElementById("sch"+n).style.height='';
	document.getElementById("piuD"+n).style.display='none';
}
function verNote(){
	var ret = true;
	if(document.getElementById("NoteProdotto")){
		if(document.getElementById("NoteProdotto").value.trim()==''){
			alert(TXT_noNote.replace('[note]',document.getElementById("noteProdottoSpan").innerText));
			document.getElementById("NoteProdotto").focus();
			ret = false;
		}
	}
	return ret;
}
function valNote(){
	var val = '';
	if(document.getElementById("NoteProdotto")){
		val = window.btoa(encodeURIComponent(document.getElementById("NoteProdotto").value.trim()));
	}
	return val;
}

function selImg(txt){
	nomeImg=document.getElementById(txt).src;
	partiImg=nomeImg.split("OFF");
	document.getElementById(txt).src=partiImg[0]+"EVI"+partiImg[1];
}
function desImg(txt){
	nomeImg=document.getElementById(txt).src;
	partiImg=nomeImg.split("EVI");
	document.getElementById(txt).src=partiImg[0]+"OFF"+partiImg[1];
}
//-->