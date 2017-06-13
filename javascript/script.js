var nuble;

function initalize(length) {
  var string = giveHtml(length);
  $("#board").empty();
  $("#board").append(string);
  console.log(string);
  nuble = new Nuble(length);
  setElementInArray(nuble.array);
  timerStart();
}
initalize(3);

//var nuble = new Nuble(3);

$('#board').on("click", '.number', function() {
  nuble.moveElement(parseInt(this.id));
  changeMove();
  setElementInArray();
  changeMoveString();
  if(nuble.gameFinished()){
      $("#t").timer('remove');
      initalize(nuble.length);
      alert("You win the match in "+ nuble.move);
      nuble.move =0;
      nuble.movesArray = [];
      changeAll();
  };
});

function changeMove() {
  $("#moveCount").html(nuble.move);
}

function changeMoveString() {
  var moveString = getMoveString();
  $("#moveString").empty();
  $("#moveString").append(moveString);
}

function changeAll() {
  setElementInArray();
  changeMoveString();
  changeMove();
}

function setElementInArray() {
  var array = nuble.array;
  var number = document.getElementsByClassName('number');
  for (var i = 0; i < array.length; i++) {
    number[i].innerText = array[i];
  }
}

function giveHtml(length) {
  var string = '';
  for (var i = 0; i < length; i++) {
    string = string + '<tr>';
    for (var j = 0; j < length; j++) {
      var num = i * length + j;
      string = string + '<td id="' + num + '" class="number"></td>';
    }
    string = string + '</tr>';
  }
  return string;
}
$("#easy").click(function() {
    nuble.move =0;
    nuble.movesArray = [];
    changeAll();
 $("#t").timer('remove');
  initalize(3);
});
$("#medium").click(function() {
    nuble.move =0;
    nuble.movesArray = [];
    changeAll();
  console.log("medium");
   $("#t").timer('remove');
  initalize(4);
});
$("#hard").click(function() {
    nuble.move =0;
    nuble.movesArray = [];
    changeAll();
     $("#t").timer('remove');
  initalize(5);
});
$("#newGame").click(function() {
    nuble.move =0;
    nuble.movesArray = [];
    changeAll();
     $("#t").timer('remove');
  document.getElementById("moveCount").innerHTML = 0;
  nuble.move = 0;
  nuble.movesArray = [];
  changeAll()
$("#t").timer('remove');
  initalize(nuble.length);

});

function customInput() {
    nuble.move =0;
    nuble.movesArray = [];
    changeAll();
     $("#t").timer('remove');
  var length = prompt('Please enter the length of matrix');
  initalize(length);
}

function getMoveString() {
  var string = '';
  for (var i = 0; i < nuble.movesArray.length; i++) {
    string = string + '<p> Tile ' + nuble.movesArray[i].value + ' move ' + 'to' + nuble.movesArray[i].row + '.' + nuble.movesArray[i].column + '</p>';
  }
  return string;
}
$('#undo').click(function() {
  nuble.undo();
  changeAll();

});
function timerStart(){
    console.log("timer");
    $("#t").innerHTML = 0;

$("#t").timer({
action: 'start',
seconds: 0
});
}
