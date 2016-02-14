var WebSocket = require('ws');
var ws = new WebSocket('wss://ws.blockchain.info/inv');

var numbers = {};
var iterations = 0;
var io;

module.exports = function(_io) {
	io = _io;
}

ws.on('open', function open() {
	var op1 = {
		op : "set_tx_mini"
	};

	ws.send( JSON.stringify(op1));

	var op2 = {
		op : "unconfirmed_sub"
	};

	ws.send( JSON.stringify(op2));

	var op3 = {
		op : "blocks_sub"
	};

	ws.send( JSON.stringify(op3));
});

ws.on('message', function(data, flags) {
	processHash(JSON.parse(data).x.hash);
});

function processHash(hash) {
	//process.stdout.write(".");
	var b = new Buffer(hash, 'hex');

	for (var i = 0; i < b.length; i++) {
		var number = (b[i] % 49) + 1;
		numbers[number] = (numbers[number] || 0) + 1;
 	}

	iterations++;
	if (iterations === 5) {
		iterations = 0;
		printTop6();
	}
}

function printTop6() {
	var list = [];
	for (var key in numbers) {
		list.push([key, numbers[key]]);
	}

	list.sort(function(a, b) {
		return b[1] - a[1];
	});

	var winners = [];
	for (var i = 0; i < 6; i++) {
		winners.push(+list[i][0]);
	}

	var numbersInOrder = winners.sort(function(a,b) {
		return a - b;
	});

	io.sockets.emit('draw', JSON.stringify(numbersInOrder));

	//console.log(numbersInOrder);

	numbers = {};
}
