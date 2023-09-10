import { useEffect, useState } from "react";
import "./Toolbar.css";

function ToolBar(props) {
  const [showLikedTweets, setShowLikedTweets] = useState(false);

  useEffect(() => {
    props.setShowLikedTweets(showLikedTweets);
  }, [showLikedTweets]);

  return (
    <div className="center">
      <button className="clear-button" onClick={() => props.clearTweets()}>
        Clear Tweets
      </button>
      <button
        className="toggle-button"
        onClick={() => setShowLikedTweets(!showLikedTweets)}
      >
        {showLikedTweets ? "Show All Tweets" : "Show Liked Tweets"}
      </button>
    </div>
  );
}

export default ToolBar;
