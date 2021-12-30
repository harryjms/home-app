import Head from "next/head";
import React from "react";
import Item, { Item as IItem } from "../components/Item";
import getIcon from "../helpers/getIcon";
import fs from "fs";
import path from "path";

interface Category {
  name: string;
  items: IItem[];
}

const Homepage: React.FC<{ categories: Category[] }> = ({ categories }) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className="container grid md:grid-cols-3 gap-2 p-2 md:p-0 md:pt-2">
        {categories?.map((category) => (
          <div key={category.name} className="flex flex-col gap-1">
            <h3>{category.name}</h3>
            {category.items.map((item) => (
              <Item item={item} key={item.url} />
            ))}
          </div>
        ))}
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const sites = fs
    .readFileSync(path.join(__dirname, "../../../sites.json"))
    .toString();

  const categories: Category[] = JSON.parse(sites) as Category[];

  let categoriesWithIcons = await Promise.all(
    categories.map(async (category) => ({
      ...category,
      items: await Promise.all(
        category.items.map(async (item) => ({
          ...item,
          icon: item.icon ? item.icon : (await getIcon(item.url)) || null,
        }))
      ),
    }))
  );

  return {
    props: { categories: categoriesWithIcons },
  };
}

export default Homepage;
