
function createTweetElement(data) {
  const avatar = data.user.avatars["regular"];
  const username = data.user["name"];
  const handle = data.user["handle"];
  const content = data.content["text"];
  const currentDate = Date.now();
  const createdAt = data["created_at"];
  const timeAgo = Math.floor(((currentDate - createdAt) / 1000) / (60 * 60));

  let $tweet = $("<article>").addClass("tweet");

  let $header = $("<header>");
  let $section = $("<section>").addClass("tweet-body");
  let $footer = $("<footer>");

  let $headerImg = $(`<img src = ${avatar}>`).addClass("user-img");
  let $username = $("<h2>").addClass("username").append(username);
  let $handle = $("<span>").addClass("handle").append(handle);

  let $content = $("<p>").append(content).addClass("tweet-content");

  let $time = $("<span>").addClass("days-old").append(timeAgo + " minutes ago");
  let $flag = $(`<img src=./images/flag.png>`).addClass("icon");
  let $retweet = $(`<img src=./images/arrow-refresh-reload.png>`).addClass("icon");
  let $heart = $(`<img src=./images/heart.png>`).addClass("icon");

  $header.append($headerImg, $username, $handle);
  $section.append($content);
  $footer.append($time, $flag, $retweet, $heart);

  $tweet.append($header, $section, $footer);

  return $tweet;
  }



function renderTweets(tweets) {
  for (const i in tweets) {
    let $tweet = createTweetElement(tweets[i]);
    $('#tweet-container').append($tweet); // to add it to the page

  }
}

function loadTweets() {
  $.ajax('/tweets', { method: 'GET' })
  .then(function (tweets) {
    console.log('Success: ', tweets);
    renderTweets(tweets)
  });
};

$(document).ready(function(){
  loadTweets();
});


