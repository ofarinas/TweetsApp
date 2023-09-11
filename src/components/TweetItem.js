import "./TweetItem.css";

function TweetItem(props) {
  const buildTweetId = (value) => value.tweet.timestamp + value.tweet.content;

  const likeTweet = (props) => {
    if (!props.likedTweets?.includes(buildTweetId(props))) {
      props.setLikedTweets((prevTweetsList) => [
        ...prevTweetsList,
        buildTweetId(props),
      ]);
    } else {
      const updatedLikedTweets = props.likedTweets.filter(
        (id) => id !== buildTweetId(props)
      );
      props.setLikedTweets(updatedLikedTweets);
    }
  };

  return (
    <li
      key={props.id}
      className={`tweet-item ${
        props.likedTweets?.includes(buildTweetId(props)) ? "liked" : ""
      }`}
    >
      <p className="tweet-text">{props.tweet.content}</p>
      <button
        className={`like-button ${
          props.likedTweets?.includes(buildTweetId(props)) ? "liked" : ""
        }`}
        onClick={() => likeTweet(props)}
      >
        {props.likedTweets?.includes(buildTweetId(props)) ? "Unlike" : "Like"}
      </button>
    </li>
  );
}

export default TweetItem;
