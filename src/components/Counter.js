import "./Counter.css";

function Counter(props) {
  return <p className="liked-count">Liked Tweets: {props.value}</p>;
}

export default Counter;
