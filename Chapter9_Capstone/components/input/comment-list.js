import useSWR from "swr";
import classes from "./comment-list.module.css";

function CommentList({ eventId }) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/comment?eventId=" + eventId, fetcher);

  return (
    <ul className={classes.comments}>
      {data &&
        data.map((comment) => (
          <li key={comment._id}>
            <p>{comment.text}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default CommentList;
