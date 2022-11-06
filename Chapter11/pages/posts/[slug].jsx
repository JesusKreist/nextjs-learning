import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData } from "../../lib/posts-util";

const PostDetailPage = ({ post }) => {
  return <PostContent post={post} />;
};

export const getStaticPaths = () => {
  const postFileNames = getPostFiles();
  console.log("post file names is :>>", postFileNames);
  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: true,
  };
};

export const getStaticProps = ({ params }) => {
  const { slug } = params;
  console.log(slug);

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
};

export default PostDetailPage;
