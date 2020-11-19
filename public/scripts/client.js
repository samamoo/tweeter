/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//<script>alert("Hey")</script>
$(document).ready(function() {
  
  const renderTweet = function(data) {
    let $userTweet = "";
    //$(".tweet-container").empty();
    for (const tweet of data) {
      $userTweet = createTweetElement(tweet);
      // $(".tweet-container").text($userTweet)
      $(".tweet-container").prepend($userTweet);
    }
  };
  
  const createTweetElement = function(data) {
    let date = new Date(data["created_at"]);
    date = date.toDateString();

    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
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
      <p class="share-links">share links</p>
    </footer>
    </article>`);
    // $("<section>").text(data["content"]["text"]);
    return $tweet;
  };

  $("#button").on("click", function(event) {
    event.preventDefault();
    let newtweets = $("#tweet-text").serialize();
    $("<form>").text(newtweets)///////
    if (newtweets.length > 203) {
      alert("Your tweet has exceeded the max character count! Please revise your post.");
      return;
    }
    if (newtweets.length === 5) {
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
    })
  };
  loadTweets();
});