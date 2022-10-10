import fs from "fs/promises";
import path from "path";
import Link from "next/link";

function HomePage({ products }) {
  return (
    <ul>
      {products.map(({ title, id }) => (
        <li key={id}>
          <Link href={`/${id}`}>{title}</Link>
        </li>
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
    revalidate: 10,
  };
};

export default HomePage;
