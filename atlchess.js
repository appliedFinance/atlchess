// chatchess.js

const print = console.log;


let board;
let kw ; let kb ; let wq ; let bq ; let wr ; let br ; 
let wb ; let bb ; let wk ; let bk ; let wp ; let bp ;

let movingPiece; // the piece being considered to move
let inTransit;   // lets us know a piece loaded for movement
let clkSqrCount; // counts the number of recently clicked squares

function mainReset() {
	drawSquares();
	initPieces();
	inTransit = -1;
	clkSqrList = [];
	clkSqrCount = 0;
}//mainReset	

function color(n) {
	if (n<8) {
		if (n % 2 == 0) {return "white";} else {return "black";}
	} else if (n<16) {
		if (n % 2 == 1) {return "white";} else {return "black";}
	} else if (n<24) {
		if (n % 2 == 0) {return "white";} else {return "black";}
	} else if (n<32) {
		if (n % 2 == 1) {return "white";} else {return "black";}
	} else if (n<40) {
		if (n % 2 == 0) {return "white";} else {return "black";}
	} else if (n<48) {
		if (n % 2 == 1) {return "white";} else {return "black";}
	} else if (n<56) {
		if (n % 2 == 0) {return "white";} else {return "black";}
	} else if (n<64) {
		if (n % 2 == 1) {return "white";} else {return "black";}
	}	
}//color

function drawSquares() {
	let s = "";
	for(let n=0; n<64; n++) {
		s += `<div id="${n}" class="${color(n)} square"></div>`;
	}
	board.html(s);
}//drawSquares

function flipboard() {
	let before = [];
	for(let i=0; i<64; i++) {
		before[i] = board.find("#"+i).html();
	}
	for(let i=0; i<64; i++) {
		board.find("#"+i).html(before[63-i]);
	}
}//flipboard

function dropPiece(n,p) { board.find("#"+n).html(p); }

function initPieces() {
	for(let n=0; n<64; n++) {
		switch (n) {
			case 0: dropPiece(n, br); break;
			case 1: dropPiece(n, bk); break;
			case 2: dropPiece(n, bb); break;
			case 3: dropPiece(n, bq); break;
			case 4: dropPiece(n, kb); break;
			case 5: dropPiece(n, bb); break;
			case 6: dropPiece(n, bk); break;
			case 7: dropPiece(n, br); break;
			case 8: case 9: case 10: case 11:
			case 12: case 13: case 14: case 15:
				dropPiece(n, bp); break;
			case 56: dropPiece(n, wr); break;
			case 57: dropPiece(n, wk); break;
			case 58: dropPiece(n, wb); break;
			case 59: dropPiece(n, wq); break;
			case 60: dropPiece(n, kw); break;
			case 61: dropPiece(n, wb); break;
			case 62: dropPiece(n, wk); break;
			case 63: dropPiece(n, wr); break;
			case 48: case 49: case 50: case 51:
			case 52: case 53: case 54: case 55:
				dropPiece(n, wp); break;
		}
	}
}//initPieces

function loadSwapper(n) {
	let holding = board.find("#"+n).text();
	if (holding != "") {
		movingPiece = holding;
		inTransit = n;
	} else {
		clearClkList(); 
	}
}//loadSwapper

function doSwap(n) {
	if (inTransit > -1) {
		dropPiece(n,movingPiece);
		dropPiece(inTransit,"");	
		inTransit = -1;
	}
}//doSwap

function movePiece(n) {
	if (n == inTransit) { 
		clearClkList(); 
		inTransit=-1; 
		clkSqrCount=0; 
		return; 
	}
	if (inTransit > -1) {
		doSwap(n);
	} else {
		loadSwapper(n);
	}
}//movePiece

function clearClkList() {
	clkSqrCount = 0;
	$('.square').removeClass("selectionHighlight");	
}//clearClkList

function addClkList(mythis) {
	clkSqrCount += 1;
	$(mythis).addClass("selectionHighlight");
}//addClkList

function highlights(mythis) {
	if (clkSqrCount < 2) {
		addClkList(mythis);
	} else {
		clearClkList();
		addClkList(mythis); // hmm...
	}
}//highlights


function main() {
	board = $(".mainChessBoard");
	kw = "&#9812;"; kb = "&#9818;"; wq = "&#9813;";	bq = "&#9819;";
	wr = "&#9814;"; br = "&#9820;"; wb = "&#9815;"; bb = "&#9821;";
	wk = "&#9816;"; bk = "&#9822;"; wp = "&#9817;";	bp = "&#9823;";

	mainReset();

	board.on('click', '.square', function(event) {
		event.stopPropagation();
		highlights(this);
		movePiece($(this).attr('id'));

	});

	$('body').on('click', function() {
		inTransit = -1;
		clearClkList(); 
	});
}//main

$(main)

