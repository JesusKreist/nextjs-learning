import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "../../lib/posts-util";

const PostDetailPage = ({ post }) => {
  // console.log(post);
  return <PostContent post={post} />;
};

export const getStaticPaths = () => {
  const postFileNames = getPostFiles();
  console.log("post file names is :>", postFileNames);
  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));

  console.log(slugs);
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: true,
  };
};

export const getStaticProps = ({ params }) => {
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
};

export default PostDetailPage;
