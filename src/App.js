import { useState, useEffect } from "react";
import { interval, map, merge } from "rxjs";
import "./App.css";
import TweetList from "./components/TweetList";
import Counter from "./components/Counter";
import ToolBar from "./components/Toolbar";

function App() {
  const [tweetsList, setTweets] = useState([]);
  const [counter, setCounter] = useState(0);
  const [showLikedTweets, setShowLikedTweets] = useState(false);
  const [likedTweets, setLikedTweets] = useState([]);

  const clearTweets = () => {
    setTweets([]);
    setCounter(0);
    setLikedTweets([]);
  };

  const createTweetSource = (frequency, account, attribute) => {
    return interval(frequency).pipe(
      map((i) => ({
        account,
        timestamp: Date.now(),
        content: `${attribute} Tweet number ${i + 1}`,
      }))
    );
  };

  const tweets = merge(
    createTweetSource(5000, "AwardsDarwin", "Facepalm"),
    createTweetSource(3000, "iamdevloper", "Expert"),
    createTweetSource(5000, "CommitStrip", "Funny")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const filteredTweets = tweetsList.filter(
        (tweet) => Date.now() - tweet.timestamp <= 30000
      );
      setTweets(filteredTweets);
    }, 30000);
    const subscription = tweets.subscribe((tweet) => {
      setTweets((prevTweetsList) => [...prevTweetsList, tweet]);
    }, []);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  });

  return (
    <div className="App">
      <h1>Tweets App</h1>
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
