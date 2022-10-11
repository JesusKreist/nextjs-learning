const UserIdPage = ({ id }) => {
  return <h1>{id}</h1>;
};

export default UserIdPage;

export const getServerSideProps = async ({ params }) => {
  const userId = params.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
};
