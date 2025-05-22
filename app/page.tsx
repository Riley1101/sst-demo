import { Suspense } from "react";

async function getData() {
  return await fetch("https://dummyjson.com/products?limit=1000").then((res) =>
    res.json(),
  );
}

interface Product {
  title: string;
  id: number;
}

interface Res {
  products: Product[];
}

export default async function Home() {
  const data: Res = await getData();
  return (
    <div className="p-4 font-serif">
      <Suspense
        fallback={
          <ul className="pl-4 flex flex-col gap-2">
            {Array.from({ length: 50 })
              .fill("a")
              .map((_e, i) => (
                <li
                  key={i}
                  className="bg-gray-800 border-gray-800 h-4 w-1/2 border rounded-md "
                ></li>
              ))}
          </ul>
        }
      >
        <ul className="pl-4 flex flex-col gap-2">
          {data.products.map((e) => (
            <li key={e.id}>{e.title}</li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
}
