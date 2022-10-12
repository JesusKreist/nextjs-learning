import React from "react";

const UserProfilePage = ({ username }) => {
  return <h1>{username}</h1>;
};

export default UserProfilePage;

export const getServerSideProps = async ({params, req, res}) => {
  return {
    props: {
      username: "Max",
    },
  };
};
