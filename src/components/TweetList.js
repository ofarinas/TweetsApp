import { useEffect } from "react";
import TweetItem from "./TweetItem";
import "./TweetList.css";

function TweetList(props) {
  useEffect(() => {
    props.setLikedTweetsCounter(props.likedTweets.length);
  }, [props.likedTweets]);

  return (
    <ul className="tweet-list">
      {props.tweets
        .filter((tweet) =>
          props.showLikedTweets
            ? props.likedTweets.includes(tweet.timestamp)
            : true
        )
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((tweet) => (
          <TweetItem
            key={tweet.timestamp}
            tweet={tweet}
            likedTweets={props.likedTweets}
            setLikedTweets={(value) => props.setLikedTweets(value)}
          ></TweetItem>
        ))}
    </ul>
  );
}

export default TweetList;
