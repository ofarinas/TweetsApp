import "./TweetItem.css";

function TweetItem(props) {
  const likeTweet = (props) => {
    if (!props.likedTweets?.includes(props.tweet.timestamp)) {
      props.setLikedTweets((prevTweetsList) => [
        ...prevTweetsList,
        props.tweet.timestamp,
      ]);
    } else {
      const updatedLikedTweets = props.likedTweets.filter(
        (timestamp) => timestamp !== props.tweet.timestamp
      );
      props.setLikedTweets(updatedLikedTweets);
    }
  };

  return (
    <li
      key={props.tweet.timestamp}
      className={`tweet-item ${
        props.likedTweets?.includes(props.tweet.timestamp) ? "liked" : ""
      }`}
    >
      <p className="tweet-text">{props.tweet.content}</p>
      <button
        className={`like-button ${
          props.likedTweets?.includes(props.tweet.timestamp) ? "liked" : ""
        }`}
        onClick={() => likeTweet(props)}
      >
        {props.likedTweets?.includes(props.tweet.timestamp) ? "Unlike" : "Like"}
      </button>
    </li>
  );
}

export default TweetItem;
