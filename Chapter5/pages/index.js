import fs from "fs/promises";
import path from "path";

function HomePage({ products }) {
  return (
    <ul>
      {products.map(({ title, id }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
}

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
  };
};

export default HomePage;
