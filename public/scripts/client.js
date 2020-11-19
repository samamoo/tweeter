/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  // const $tweet = $(`<article class="tweet">Hello world fdlanf oeijofewncdos ewiojfdlnflkajeoi </article>`);
  
  const renderTweet = function(data) {
    let $userTweet = "";
    for (const tweet of data) {
      // calls createTweetElement for each tweet
      $userTweet = createTweetElement(tweet);
      $(".tweet-container").append($userTweet);
    }
    // takes return value and appends it to the tweets container
  };
  
  const createTweetElement = function(data) {
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
    <p class="data-stamp">${data["created_at"]}</p>
    <p class="share-links">share links</p>
  </footer>
</article>`);
    return $tweet;
  };

  renderTweet(data)


});