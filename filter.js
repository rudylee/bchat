var fileStream = require('fs').createReadStream('badwords.txt'); 
fileStream.on('data', function(data){
var lines = data.split(/\n|\r/);
for (var l in lines) {
console.log(l);
}
});


function validUsername(username) {
	var badUsernames = new Array();
	badUsernames = ['kucing','testing'];

	for(i=0;i < badUsernames.length; i++) {
		if(badUsernames[i] == username) {
			return false;
		}
	}
	return true;
}
console.log(validUsername('testingsakldfhd'));
