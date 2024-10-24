import Images from "@/components/product/Images";
import Info from "@/components/product/Info";
import Carousel from "@/components/common/Carousel";
import { Path, getData } from "@/components/utils";

interface SizeData {
  id: number;
  UK: number;
  EU: number;
  US: number;
  price: {
    GBP: number;
    EUR: number;
    USD: number;
  };
}

const jsData = {
  sizes: [
    // ['id', 'UK', 'EU', {'price': ["GBP", "EUR"]}],
    ["id", "UK", "EU", ["GBP", "EUR"]],
    [
      [33, 3.3, 36, [130, 160]],
      [41, 4.0, 37, [140, 180]],
    ],
  ],
  sizes1: {
    columns: ["id", "uk", "eu", { price: ["gbp", "eur"] }],
    data: [
      [33, 3.3, 36, [130, 160]],
      [41, 4.0, 37, [140, 180]],
    ],
  },
  ////////////////////////////////////////////////////
  sizesf: [
    ["id", "UK", "EU", { price: ["GBP", "EUR"] }],
    [33, 3, 36, [130, 150]],
    [41, 4, 37, [140, 160]],
    [52, 5, 38, [150, 180]],
  ],
  old_sizes: [
    { id: 33, UK: 3, EU: 36, price: { GBP: 130, EUR: 150 } },
    { id: 41, UK: 4, EU: 37, price: { GBP: 140, EUR: 160 } },
    { id: 52, UK: 5, EU: 38, price: { GBP: 150, EUR: 180 } },
  ],
  description: {
    ru: "фывафоыва",
    eu: "asdfasfas",
  },
};

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(`product/${params.slug}/`);
  const carouselData = await getData(Path.related_products);

  return (
    <div className="w-[1184px] px-5 max-w-full mx-auto">
      <div className="flex items-start">
        {/* предпоказ слева */}
        <Images images={data.images} />
        {/* инфа справа */}
        {data && <Info data={data} sizeData={data.sizes} />}
      </div>
      {carouselData && (
        <Carousel data={carouselData} title="related products" />
      )}
    </div>
  );
}
