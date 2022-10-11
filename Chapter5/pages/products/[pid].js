import { getData } from "../../components/utils/getData";

const ProductDetailPage = ({ loadedProduct }) => {
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const { pid } = params;
  const data = await getData();

  const product = data.products.find((product) => product.id === pid);
  if (!product) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
};

export default ProductDetailPage;
