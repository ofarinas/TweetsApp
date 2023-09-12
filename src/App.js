import { useEffect, useState } from "react";
import "./App.css";
import Counter from "./components/Counter";
import Title from "./components/Title";
import ToolBar from "./components/Toolbar";
import TweetList from "./components/TweetList";
import { loadTweets } from "./loadTweets";
import { buildTweetId } from "./helpers";

function App() {
  const [tweetsList, setTweets] = useState([]);
  const [counter, setCounter] = useState(0);
  const [showLikedTweets, setShowLikedTweets] = useState(false);
  const [likedTweets, setLikedTweets] = useState([]);
  const THIRTY_SECONDS = 30000;

  const clearTweets = () => {
    setTweets([]);
    setCounter(0);
    setLikedTweets([]);
  };

  const removeTweetsOlderThan30Seconds = () => {
    setTweets((prevtweetsList) => {
      const filteredTweets = prevtweetsList.filter(
        (tweet) => Date.now() - tweet.timestamp <= THIRTY_SECONDS
      );

      setLikedTweets((prevLikedTweetsList) =>
        prevLikedTweetsList.filter((value) =>
          filteredTweets.some((tweet) => buildTweetId(tweet) === value)
        )
      );

      return filteredTweets;
    });

    setCounter(likedTweets.length);
  };

  useEffect(() => {
    const interval = setInterval(
      () => removeTweetsOlderThan30Seconds(),
      THIRTY_SECONDS
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const subscription = loadTweets().subscribe((tweet) => {
      setTweets((prevTweetsList) => [...prevTweetsList, tweet]);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <Title></Title>
      <ToolBar
        clearTweets={clearTweets}
        setShowLikedTweets={(value) => setShowLikedTweets(value)}
      ></ToolBar>
      <Counter value={counter}></Counter>
      <TweetList
        likedTweets={likedTweets}
        setLikedTweets={(value) => setLikedTweets(value)}
        showLikedTweets={showLikedTweets}
        tweets={tweetsList}
        setLikedTweetsCounter={(value) => setCounter(value)}
      ></TweetList>
    </div>
  );
}

export default App;
