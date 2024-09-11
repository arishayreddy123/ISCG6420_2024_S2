$(document).ready(function() {
    // Exercise 1: Selectors
    $('#ex1DivButton').click(function() {
        $('#demo1 div').css('background-color', 'red');
    });
    $('#ex1ClassButton').click(function() {
        $('.ex1DemoClass').css('background-color', 'green');
    });
    $('#ex1IDButton').click(function() {
        $('#ex1DemoID').css('background-color', 'yellow');
    });

    // Random Color Generator for Exercise 1 (randomized colors)
    function getRandomColour() {
        var num = Math.floor(Math.random() * 10);
        switch (num) {
            case 0: return 'red';
            case 1: return 'green';
            case 2: return 'blue';
            case 3: return 'yellow';
            case 4: return 'orange';
            case 5: return 'pink';
            case 6: return 'purple';
            case 7: return 'brown';
            case 8: return 'gray';
            case 9: return 'black';
            default: return 'white';
        }
    }

    // Exercise 2: Radio Button Selector
    $('input:radio[name="radio-group"]').change(function() {
        $('#ex2Output').html($('input:radio[name="radio-group"]:checked').val());
    });

    // Exercise 3: Click Event
    $('.ex3Click').click(function() {
        $(this).css('background-color', getRandomColour());
    });

    // Exercise 4: Hover Event
    $('#ex4overlay').hide();
    $('.hover').hover(function() {
        var offset = $(this).offset();
        $('#ex4overlay').css({top: offset.top, left: offset.left});
        $('#ex4overlay').html($(this).css('background-color')).show();
    }, function() {
        $('#ex4overlay').hide();
    });

    // Exercise 8: Slide
    $('#ex8').click(function() {
        $('#lightbox').slideToggle(500);
    });

    // Exercise 9: Animation
    var ex9Animated = false;
    $('#ex9 button').click(function() {
        var x = ex9Animated ? '0px' : '700px';
        $('#ex91').animate({left: x}, "fast");
        $('#ex92').animate({left: x}, "slow");
        $('#ex93').animate({left: x}, 1000);
        ex9Animated = !ex9Animated;
    });

    // Exercise 10: Animation Chaining
    $('#ex10 button').click(function() {
        $('#ex10animate').animate({height: '500px', opacity: '0.5'}, "slow")
                         .animate({height: '500px', width: '500px', opacity: '1'}, "slow")
                         .animate({height: '100px', opacity: '0.5'}, "slow")
                         .animate({width: '100px', opacity: '1'}, "slow");
    });

    // Exercise 11: Element Creation
   // Exercise 11: Element Creation
$('#ex11 button').click(function () {
    // Append table row
    $('#ex11 table').append(  // APpend Table Row
       $('<tr>').append(  //Append table data
          
          $('<td>').text( // set text of td
            
            $('#ex11 input:text').val()) // fetch input value from user
       )
    );
 });
 
});
