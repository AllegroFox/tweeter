
//builds the HTML structure of a new tweet
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

  let $content = $("<p>").text(content).addClass("tweet-content");

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


//loops through the tweets in the database and renders them
function renderTweets(tweets) {
  for (const i in tweets) {
    let $tweet = createTweetElement(tweets[i]);
    $('#tweet-container').prepend($tweet);

  }
}

//makes the GET request to the database of tweets
function loadTweets() {
  $.ajax('/tweets', { method: 'GET' })
  .then(function (tweets) {
    console.log('Success: ', tweets);
    renderTweets(tweets)
  });
};


//handles form submission and errors for new tweets
$(document).ready(function(){
  $(function() {

      $( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        const text = $(this).serialize();
        console.log(text.length);
        $( ".error-message" ).slideUp( 400 );
        if (text.length < 6){
          $( "#empty" ).slideDown( 400 );
        } else if (text.length > 146){
          $( "#too-long" ).slideDown( 400 );
        } else {
          $.ajax({
            url: '/tweets',
            method: 'POST',
            data: text
          })
          .then(function (tweet) {
            $("form")[0].reset();
            $('#tweet-container').prepend(createTweetElement(tweet));
            console.log('Success: ', text);
          });
        }
      });
    });
  loadTweets();
});





