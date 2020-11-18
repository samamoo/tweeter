$(document).ready(function() {

  // console.log(chars)
  
  $("textarea").on("input", function(event) { //keypress or input
    const chars = $(this).val();
    const counter = $(this).parent().find("#counter");
    let remaining = 140 - chars.length;
    counter.text(remaining);
    if (remaining < 0) {
      counter.addClass("counter-red");
    } else {
      counter.removeClass("counter-red");
    }
  });
});