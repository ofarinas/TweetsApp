import { buildTweetId } from "../helpers";
import "./TweetItem.css";

function TweetItem(props) {
  const likeTweet = (props) => {
    if (!props.likedTweets?.includes(buildTweetId(props.tweet))) {
      props.setLikedTweets((prevTweetsList) => [
        ...prevTweetsList,
        buildTweetId(props.tweet),
      ]);
    } else {
      const updatedLikedTweets = props.likedTweets.filter(
        (id) => id !== buildTweetId(props.tweet)
      );
      props.setLikedTweets(updatedLikedTweets);
    }
  };

  return (
    <li
      key={props.id}
      className={`tweet-item ${
        props.likedTweets?.includes(buildTweetId(props.tweet)) ? "liked" : ""
      }`}
    >
      <p className="tweet-text">{props.tweet.content}</p>
      <button
        className={`like-button ${
          props.likedTweets?.includes(buildTweetId(props.tweet)) ? "liked" : ""
        }`}
        onClick={() => likeTweet(props)}
      >
        {props.likedTweets?.includes(buildTweetId(props.tweet))
          ? "Unlike"
          : "Like"}
      </button>
    </li>
  );
}

export default TweetItem;
