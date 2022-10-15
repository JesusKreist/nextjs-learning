import { buildFeedbackPath, extractFeedback } from "../api/feedback";

const FeedbackPage = ({ feedbackItems }) => {
  const [feedbackData, setFeedbackData] = useState();
  const handleLoadFeedback = (id) => {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbackData(data.feedback));
  };
  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}{" "}
            <button onClick={() => handleLoadFeedback(item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getStaticProps = async () => {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: { feedbackItems: data },
  };
};

export default FeedbackPage;
