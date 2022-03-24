var count = 0;
var index = 0;
var qcount = 0;

function loadQuestion(index) {
	qcount = dataArray.length;
	console.log(qcount);
	document.getElementById("scoreDiv").style.visibility="hidden";
	
	document.getElementById("question").innerHTML = dataArray[index].Question;
	document.getElementById("optText1").innerHTML = dataArray[index].options.opt1;
	document.getElementById("optText2").innerHTML = dataArray[index].options.opt2;
	document.getElementById("optText3").innerHTML = dataArray[index].options.opt3;
	document.getElementById("optText4").innerHTML = dataArray[index].options.opt4;
}

function onNext() {
	var correctAnswer = dataArray[index].correctAnswer;
	console.log('Correct answer : '+ correctAnswer);

	
	if (document.getElementById('radio1').checked) {
		selectedAnswer = document.getElementById('radio1').value;
	}
	
	if (document.getElementById('radio2').checked) {
		selectedAnswer = document.getElementById('radio2').value;
	}
	
	if (document.getElementById('radio3').checked) {
		selectedAnswer = document.getElementById('radio3').value;
	}
	
	if (document.getElementById('radio4').checked) {
		selectedAnswer = document.getElementById('radio4').value;
	}
	
	console.log('Selected answer : '+ selectedAnswer);
	
	if (selectedAnswer == correctAnswer) {
		count++;
		console.log('Count:  ' + count);
	}

	console.log('Count:  ' + count);
	index++;
	
	if(index < qcount) {
		loadQuestion(index);
	}
	else {
		document.getElementById("score").innerHTML = count;

		document.getElementById("scoreDiv").style.visibility="visible";
		document.getElementById("quizDiv").style.visibility="hidden";  
	}
	
}
	