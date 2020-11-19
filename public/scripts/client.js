/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]
  
  const renderTweet = function(data) {
    let $userTweet = "";
    $(".tweet-container").empty();
    for (const tweet of data) {
      $userTweet = createTweetElement(tweet);
      $(".tweet-container").prepend($userTweet);
    }
  };
  
  const createTweetElement = function(data) {
    let date = new Date(data["created_at"]);
    date = date.toDateString();
    const $tweet = $(`        <article class="tweet">
    <header>
      <div>
      <img src=${data["user"]["avatars"]}>
      <p>${data["user"]["name"]}</p></div>
      <p class="user">${data["user"]["handle"]}</p>
    </header>
    <section class="past-posts">
      ${data["content"]["text"]}
    </section>
    <hr/>
    <footer class="tweet">
      <p class="data-stamp">${date}</p>
      <p class="share-links">share links</p>
    </footer>
  </article>`);
    return $tweet;
  };

  $("#button").on("click", function(event) {
    event.preventDefault();
    let newtweets = $("#tweet-text").serialize();
    console.log(newtweets.length)
    if (newtweets.length > 203) { //including the serials
      alert("Your tweet has exceeded the max character count! Please revise your post.");
      return;
    }
    if (newtweets.length === 5) { //text=
      alert("The input field is empty! Please write a message.");
      return;
    }
    $.post("/tweets", newtweets)
    .then(function (data) {
      $("form").trigger("reset");
      loadTweets(data);
    })
  })

  const loadTweets = function() {
    $.get("/tweets")//array of json tweets
    .then(function(data) {
      return renderTweet(data)
      //console.log(data)
    })
  };
  loadTweets();
});