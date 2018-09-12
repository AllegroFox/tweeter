console.log("char counter loaded!");

$(document).ready(function() {
  let count = 140

  $(".text-area").on( "keypress", function(event) {
    let textArea = $(this);
    let maxValue = 140;
    let count = this.value.length;

    let counter = maxValue - count;
    textArea.siblings("footer").find(".counter").text(counter);

    if (counter < 0) {
      $('.counter').addClass('counter-over-max');
    } else if (counter >= 0) {
      $('.counter').removeClass('counter-over-max');
    }
  });

});
