//add button listener
$('#sound').click(
    function(){
        audio.pause();
        //reloading the audio file because setting current time doesn't work
        audio.src = audio.src; 
        audio.play();
    });
    
var get_streak_text = function(streak){
    if (streak >= 10) return 'BEYOND GODLIKE!'
    
    switch(streak){
        case 0:
        case 1:
        case 2:
            return streak + ' in a row'
        case 3: return 'Killing spree'
        case 4: return 'Dominating'
        case 5: return 'Mega kill!'
        case 6: return 'Unstoppable!'
        case 7: return 'Wicked sick!'
        case 8: return 'Monster kill!'
        case 9: return 'Godlike!'
    }
}
    
var relabel_score = function(){
    $('#score').text('Score: ' + score);
    $('#streak').text('Streak: ' + get_streak_text(streak));
    $('#guesses').text(guesses + ' guesses left');
}

//choose random sound
var get_random = function(){
    $.getJSON($SCRIPT_ROOT + '/_get_random', {}, function(data) {
        var choices = data.choices;
        correct_choice = Math.floor(Math.random() * choices.length);
        var cur_name = choices[correct_choice];
        audio = new Audio('static/sounds/items/' + cur_name + '.wav');

        //rename choice list and re-enable buttons
        $('.choice').each(function(i, val){
            $(this).attr('src', 'static/icons/items/' + choices[i] + '.png');
            $(this).fadeTo(0, 1.0);
            $(this).prop('disabled', false);
        });
        
        //play sound
        audio.play();        
    });   
}

var game_over = function(){
    alert("Game over!");
}

var answer = function(){
    var is_correct = ($(this).parent().index() == correct_choice);
    
    if (is_correct){
        streak++;   
        score += streak;
        audio.pause();
        get_random();
        
    } else {
        streak = 0;      
        guesses--;
        $(this).fadeTo(0, 0.5);
        $(this).prop('disabled', true);
    }
    
    relabel_score();
    
    if (guesses == 0){
        game_over();
    }
}

//add choice listeners
$('.choice').click(answer);


//INITIALIZE
var audio = null;
var correct_choice = null;

var guesses = 5;
var score = 0;
var streak = 0;
var guesses = 5;

relabel_score();
get_random();

