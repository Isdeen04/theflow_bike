<!--
class box{
	constructor( sez, prods, tit, lab ) {
		
		this.prods = prods;
		this.n = 0;
		this.c = -1;
		this.nProd = 0;
		this.tmProd = null;
		this.tmCursore = null;
		this.imgs = new Array();
		this.i = 0;
		this.cc = 0;
		this.sez = sez;
		this.el = document.createElement('div');
		this.el.id = 'boxFoto_'+sez;
		this.el.className = 'boxFoto';
		this.el.innerHTML =
			'<div class="labelFoto" style="background-image:url(../_img/f_video_strong.png),url(../_img/box_'+sez+'.jpg);">'+tit+'</div>' +
			'<div class="prezzo_box"></div>' +
			'<div class="marchio_box"><a>'+lab+'</a></div>' +
			'<div id="titoloFoto">' +
			'	<div class="frFotoSx" onClick="box_'+sez+'.vaiProd(-1);"></div>' +
			'	<h2></h2>' +
			'	<div class="frFotoDx" onClick="box_'+sez+'.vaiProd(1);"></div>' +
			'</div>' +
			'<div class="cursore_box"></div>' +
			'<ul class="cont_prods listProds"></ul>';
		document.getElementById("boxHome").appendChild( this.el );
		this.mr = this.el.getElementsByClassName("marchio_box")[0];
		this.cr = this.el.getElementsByClassName("cursore_box")[0];
		this.imgs[0] = this.prods[0].imgProdotto;
		var EL = this;
		var rand = Math.random()*1000;
		setTimeout(function(){EL.cambiaProd();},rand,EL);
	}
	cambiaProd( n ){
		clearInterval(this.tmCursore);
		this.c++;
		if(this.c == this.prods.length)this.c = 0;
		else{
			if(typeof(this.imgs[this.c])=='undefined'){
				this.imgs[this.c] = new Image();
				this.imgs[this.c].src=this.prods[this.c].imgProdotto;
			}
		} 
		var PR = '';
		if(this.prods[this.c].prezzoOriginario)PR += '<s class="barrato" style="opacity:0.8;">&euro; '+this.prods[this.c].prezzoOriginario+'</s><br>';
		PR += '<b class="price">&euro; '+this.prods[this.c].prezzoProdotto+'</b>';
		if(this.prods[this.c].chiediSconto)PR += '<span style="color:#f80;">*</span><br><span class="ottieniSconto" style="cursor:pointer;" onClick="window.open(\''+this.prods[this.c].linkProdotto+'?getinfo=1\',\'_self\');">'+ottieniSconto+'</span>';
		
		this.el.getElementsByClassName("prezzo_box")[0].innerHTML = PR;
		this.el.getElementsByTagName("h2")[0].innerHTML = this.prods[this.c].nomeProdotto;
		this.el.style.backgroundImage = "url('"+this.prods[this.c].imgProdotto+"')";
		this.el.getElementsByTagName("a")[0].href = this.prods[this.c].linkProdotto;
		if(this.prods[this.c].brandProdotto)this.mr.style.backgroundImage="url('../_img/marchi/marchio_"+this.prods[this.c].brandProdotto+".png')";
		else this.mr.style.backgroundImage="";
		this.tmProd = 0;
		
		var EL = this;
		this.tmCursore = setInterval(function(){ 
		
			EL.tmProd += 1;
			EL.cr.style.width = EL.tmProd+'%';
			if(EL.tmProd == 100){
				EL.cr.style.width = '0px';
				EL.cambiaProd();
			}
		},40,EL);
	}
	vaiProd( n ){
		n-=1;
		this.c+=n;	
		if(this.c == -1)this.c = this.prods.length - 1;
		if(this.c == -2)this.c = this.prods.length - 2;
		if(this.c == this.prods.length)this.c = 0;
		this.cambiaProd();
	}
}
//-->