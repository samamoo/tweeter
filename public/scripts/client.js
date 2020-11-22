/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  $("#button").on("click", handleClick);
  loadTweets();

  $("#compose").on("click", function () {
    $("#new-tweet").toggle("slow");
  });

  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $("#to-top:hidden").stop(true, true).fadeIn();
    } else {
      $("#to-top").stop(true, true).fadeOut();
    }
  });
  $("label").html(newQuote());
  newQuote();
  
  const header = document.querySelector(".header");
  const profile = document.querySelector("#profile-pic");
  tl.fromTo(header, 1.2, {y: "-110%"}, {y: "0%", ease: Power2.easeInOut})
  tl.fromTo(profile, 0.7, {opacity: 0}, {opacity: 1, ease: Power2.easeInOut});
});

//~~~ FUNCTIONS ~~~~//

//Loads the newly created tweet
const loadTweets = function () {
  $.get("/tweets").then(function (data) {
    return renderTweet(data);
  });
};

//Creates a new tweet
const createTweetElement = function (data) {
  let date = new Date(data["created_at"]);
  date = date.toDateString();
  //Escape user's input to avoid Cross-Site Scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const safeHTML = `<p>${escape(data["content"]["text"])}</p>`;

  const $tweet = $(`<article class="tweet">
  <header>
    <div>
    <img src=${data["user"]["avatars"]}>
    <p>${data["user"]["name"]}</p></div>
    <p class="user">${data["user"]["handle"]}</p>
  </header>
  <section class="past-posts">
    ${safeHTML}
  </section>
  <hr/>
  <footer class="tweet">
    <p class="data-stamp">${date}</p>
    <p class="share-links">
    <span>&#9873;</span>
    <span>&#9850;</span>
    <span>&#10084;</span>
    </p>
  </footer>
  </article>`);
  return $tweet;
};

//Adds new tweet to existing tweets
const renderTweet = function (data) {
  let $userTweet = "";
  for (const tweet of data) {
    $userTweet = createTweetElement(tweet);
    $(".tweet-container").prepend($userTweet);
  }
};

//Creates a tweet if input field is neither empty or over max character count
const handleClick = function (event) {
  event.preventDefault();
  let newtweets = $("#tweet-text").serialize();
  if (newtweets.length > 203) {
    $("#error").slideDown().delay(5000).fadeOut("slow");
    return;
  }
  if (newtweets.length === 5) {
    $("#error-empty").slideDown().delay(5000).fadeOut("slow");
    return;
  }
  $.post("/tweets", newtweets).then(function (data) {
    $("#error").hide();
    $("#error-empty").hide();
    $("form").trigger("reset");
    loadTweets(data);
  });
};

//Picks a new prompt for user text field
const newQuote = function () {
  const quotes = [
    "What are you raven about today?",
    "What's ruffling your feathers, today?",
    "Share something fowl...",
    "What are you cock-a-doodle-doing?",
    "What you are cuckoo about today?",
    "Speak your beak...",
    "What are you chirping about?",
    "What are you humming about?",
    " *Cheep! * Cheep! * ...translates to..."
  ];
  let pick = Math.floor(Math.random() * quotes.length);
  return quotes[pick];
};

const tl = new TimelineMax();