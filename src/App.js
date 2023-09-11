import { useState, useEffect } from "react";
import "./App.css";
import TweetList from "./components/TweetList";
import Counter from "./components/Counter";
import ToolBar from "./components/Toolbar";
import Title from "./components/Title";
import { loadTweets } from "./loadTweets";

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

  useEffect(() => {
    const interval = setInterval(() => {
      const filteredTweets = tweetsList.filter(
        (tweet) => Date.now() - tweet.timestamp <= 30000
      );
      setTweets(filteredTweets);
    }, 30000);
    const subscription = loadTweets().subscribe((tweet) => {
      setTweets((prevTweetsList) => [...prevTweetsList, tweet]);
    }, []);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  });

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
