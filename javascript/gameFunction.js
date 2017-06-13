var Nuble = function(length) {

  this.initialize =  function(length) {
      this.move=0;
        this.length = length;
        this.movesArray = [];
    var sampleArray = [];
    var arrayLength = length * length;
    for (var i = 0; i < arrayLength - 1; i++) {
      sampleArray[i] = i + 1;
    }
    sampleArray.push('');
    this.array = this.shuffleArray(sampleArray);
};

 this.shuffleArray =  function(array) {
      var shuffleArray = array;
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return shuffleArray;
};

  this.getActiveBoxes = function(){
      var lengthOfArray = this.length*this.length;
      var activeBoxIndex = [];
      var emptyIndex = this.getEmptyIndex();
      var row =Math.floor(emptyIndex/this.length);
      var column = emptyIndex%this.length;
      console.log(row);
      console.log(column);

      if(row > 0) {
          activeBoxIndex.push(this.getIndex(row -1, column));
      }

      if(row < this.length) {
          activeBoxIndex.push(this.getIndex(row +1, column));
      }

      if(column > 0) {
          activeBoxIndex.push(this.getIndex(row, column -1));
      }

      if(column < this.length) {
          activeBoxIndex.push(this.getIndex(row, column + 1));
      }

      return activeBoxIndex;

  };

  this.getIndex = function(row,column){
      if(row>-1 && column>-1 && row<this.length && column <this.length){
          var index = row*this.length+column;
          return index;
      }
      return null;

  };

  this.getEmptyIndex = function(){
      for (var i = 0; i < this.array.length; i++) {
          if(!this.array[i]){
              return i;
          }
      }
  };

  this.moveElement = function(clickIndex){
      var emptyIndex = this.getEmptyIndex();
      var activeBoxes = this.getActiveBoxes();
      if(activeBoxes.indexOf(clickIndex)<0){
         return;
      }
      var move={
          value:this.array[clickIndex],
          row:Math.floor(emptyIndex/this.length)+1,
          column:emptyIndex%this.length+1,
          clickIndex:clickIndex,
          emptyIndex:emptyIndex
      };
      this.movesArray.push(move);
      console.log(this.movesArray);
      this.array[emptyIndex] = this.array[clickIndex];
      this.array[clickIndex] = '';
      this.move = this.move+1;
  };

  this.gameFinished = function(){
      for(var i=0;i<this.array.length-1;i++){
          if(this.array[i] !== i+1){
              return false;
          }
      }
      return true;
  };

  this.undo = function(){
    var object = this.movesArray.pop();
    var temp = this.array[object.emptyIndex];
    this.array[object.emptyIndex] = '';
    this.array[object.clickIndex] = temp;
    this.move = this.move -1;

  };
      this.initialize(length);

};
