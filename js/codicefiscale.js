<!--
codFiscMesi = Array ("","A","B","C","D","E","H","L","M","P","R","S","T");
codFiscDispari = Array ();
codFiscDispari["A"]=1;
codFiscDispari["0"]=1;
codFiscDispari["B"]=0;
codFiscDispari["1"]=0;
codFiscDispari["C"]=5;
codFiscDispari["2"]=5;
codFiscDispari["D"]=7;
codFiscDispari["3"]=7;
codFiscDispari["E"]=9;
codFiscDispari["4"]=9;
codFiscDispari["F"]=13;
codFiscDispari["5"]=13;
codFiscDispari["G"]=15;
codFiscDispari["6"]=15;
codFiscDispari["H"]=17;
codFiscDispari["7"]=17;
codFiscDispari["I"]=19;
codFiscDispari["8"]=19;
codFiscDispari["J"]=21;
codFiscDispari["9"]=21;
codFiscDispari["K"]=2;
codFiscDispari["L"]=4;
codFiscDispari["M"]=18;
codFiscDispari["N"]=20;
codFiscDispari["O"]=11;
codFiscDispari["P"]=3;
codFiscDispari["Q"]=6;
codFiscDispari["R"]=8;
codFiscDispari["S"]=12;
codFiscDispari["T"]=14;
codFiscDispari["U"]=16;
codFiscDispari["V"]=10;
codFiscDispari["W"]=22;
codFiscDispari["X"]=25;
codFiscDispari["Y"]=24;
codFiscDispari["Z"]=23;

codFiscPari=Array ();
codFiscPari["A"]=0;
codFiscPari["0"]=0;
codFiscPari["B"]=1;
codFiscPari["1"]=1;
codFiscPari["C"]=2;
codFiscPari["2"]=2;
codFiscPari["D"]=3;
codFiscPari["3"]=3;
codFiscPari["E"]=4;
codFiscPari["4"]=4;
codFiscPari["F"]=5;
codFiscPari["5"]=5;
codFiscPari["G"]=6;
codFiscPari["6"]=6;
codFiscPari["H"]=7;
codFiscPari["7"]=7;
codFiscPari["I"]=8;
codFiscPari["8"]=8;
codFiscPari["J"]=9;
codFiscPari["9"]=9;
codFiscPari["K"]=10;
codFiscPari["L"]=11;
codFiscPari["M"]=12;
codFiscPari["N"]=13;
codFiscPari["O"]=14;
codFiscPari["P"]=15;
codFiscPari["Q"]=16;
codFiscPari["R"]=17;
codFiscPari["S"]=18;
codFiscPari["T"]=19;
codFiscPari["U"]=20;
codFiscPari["V"]=21;
codFiscPari["W"]=22;
codFiscPari["X"]=23;
codFiscPari["Y"]=24;
codFiscPari["Z"]=25;

codFiscRis = Array ("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");

function Trim(stringa){
	reTrim=/\s+$|^\s+/g;
	return stringa.replace(reTrim,"");
}

function controllaCodFisc(frm){
	var risultato=0;
	var re = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;
	Codice=Trim(frm.value.toUpperCase());
	risultato1=re.test(Codice);
	var re = /^\d{11}$/;
	risultato2=re.test(Codice);
	if(risultato1 || risultato2)risultato=1;
	if(risultato1){ // se codice fiscale individuale
		var mese=Codice.substr(8,1);
		var contr=Codice.substr(15);
		var totContr=0;
		var pass=false;
		for(m=1;m<codFiscMesi.length;m++){
			if(mese==codFiscMesi[m])pass=true;
		}
		for(c=0;c<15;c+=2){
			totContr+=codFiscDispari[Codice.substr(c,1)];
			if(c<14){
				totContr+=codFiscPari[Codice.substr(c+1,1)];
			}
		}
		totContr=totContr-(26*parseInt(totContr/26));
		codiceControllo=codFiscRis[totContr];
		if(contr != codiceControllo)risultato=-1;
	}
	if(risultato2){ // se partita iva
		var dispari=0;
		var pari=0;
		var z=0;
		for(c=0;c<10;c+=2){
			dispari+=parseInt(Codice.substr(c,1));
			pari+=parseInt(Codice.substr(c+1,1));
			if(parseInt(Codice.substr(c+1,1))>=5)z++;
		}
		pari*=2;
		totale=(dispari+pari+z)/10;
		totale+='';
		parti=totale.split(".");
		if(parti.length==1)codiceContr=0;
		else codiceContr=10-parseInt(parti[1]);
		if(codiceContr>9)codiceContr=0;
		if(Codice.substr(10,1)!=codiceContr)risultato=-1;
	}
	return risultato;
}
function controllaPartIva(frm){
	var risultato=0;
	var re = /^\d{11}$/;
	Codice=Trim(frm.value);
	if(re.test(Codice))risultato=1;
	var dispari=0;
	var pari=0;
	var z=0;
	for(c=0;c<10;c+=2){
		dispari+=parseInt(Codice.substr(c,1));
		pari+=parseInt(Codice.substr(c+1,1));
		if(parseInt(Codice.substr(c+1,1))>=5)z++;
	}
	pari*=2;
	totale=(dispari+pari+z)/10;
	totale+='';
	parti=totale.split(".");
	if(parti.length==1)codiceContr=0;
	else codiceContr=10-parseInt(parti[1]);
	if(Codice.substr(10,1)!=codiceContr)risultato=-1;
	return risultato;
}
//-->