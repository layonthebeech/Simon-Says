$(document).ready(function() {
  var colors = ['Green', 'Red', 'Yellow', 'Blue'];
  var on = ['#00FF1E', '#FF0029', '#E5FF00', '#0015FF'];
  var off = ['#00660C', '#850015', '#AABD00', '#00074F'];
  var moves = [];
  var clicks = 0;
  var strict = false;
  var functionsArray = [function() {
    Green()
  }, function() {
    Red()
  }, function() {
    Yellow()
  }, function() {
    Blue()
  }]

  function Green() {
    $('#Green').css('background-color', '#00FF1E')
    $('#GreenSound').get(0).play()
    setTimeout(function() {
      $('#Green').css('background-color', '#00660C');
    }, 250)
  }

  function Red() {
    $('#Red').css('background-color', '#FF0029')
    $('#RedSound').get(0).play()
    setTimeout(function() {
      $('#Red').css('background-color', '#850015');
    }, 250)
  }

  function Yellow() {
    $('#Yellow').css('background-color', '#E5FF00')
    $('#YellowSound').get(0).play()
    setTimeout(function() {
      $('#Yellow').css('background-color', '#AABD00');
    }, 250)
  }

  function Blue() {
    $('#Blue').css('background-color', '#0015FF')
    $('#BlueSound').get(0).play()
    setTimeout(function() {
      $('#Blue').css('background-color', '#00074F');
    }, 250)
  }

  function startGame() {
    moves = [];
    $('#count').text('0')
    clicks = 0;
    computersTurn();
  }

  function computersTurn() {
    var move = Math.floor(Math.random() * 4)
    moves.push(move);
   // $('.answerButton').attr('disabled',true)
    setTimeout(function() {
      playSequence(moves)
      playersTurn();
    }, 1000);
  }

  function playersTurn() {
    clicks = 0;
  }

  function checkMove(move) {
    console.log(moves, move, clicks);
    if (moves[clicks] !== move) {
      $('.answerButtons').attr('disabled',true)
      if(strict) {
       startGame() 
      } else {
      console.log('wrong')
      setTimeout(function() {
        playSequence(moves)
      }, 1000)
      }
    } else {
      if (clicks === moves.length - 1) {
        $('.answerButtons').attr('disabled',true)
        $('#count').text(String(clicks+1))
        setTimeout(function() {
          computersTurn()
        }, 1000);
      }
      clicks++;
    }
  }

  function playSequence(arr) {
    console.log('arr', arr)
    var i = 0;
    var index = arr[i]
    var intervalID = setInterval(function() {
      console.log('iplayed', moves,index, arr[i], 'i',i,clicks)
      functionsArray[arr[i]]();
      setTimeout(i++,250);
      if (i === arr.length) {
        clearInterval(intervalID)
       $('.answerButtons').attr('disabled',false)
        clicks = 0;
      }
    }, 700)

  }
  $('#power').click(function() {
    if ($(this).text() === 'ON') {
      $(this).text('OFF')
      playSequence([0, 1, 2, 3])
      $('#start').attr('disabled', false);
      $('#strict').attr('disabled', false);
      $('#count').text('0')
      // $('.answerButtons').css('pointer-events',all)
    } else {
      $('#start').attr('disabled', true);
      $('#strict').attr('disabled', true);
      $('#count').text('')
      strict = false;
      $(this).text('ON')
    }
  })

  $('#start').click(function() {
    startGame();
  });
  
  $('#strict').click(function() {
    strict = true;  
  })

  $('#Green').click(function() {
    Green();
    checkMove(0);
  })
  $('#Red').click(function() {
    Red();
    checkMove(1);
  })
  $('#Yellow').click(function() {
    Yellow();
    checkMove(2);
  })
  $('#Blue').click(function() {
    Blue();
    checkMove(3);
  })

})