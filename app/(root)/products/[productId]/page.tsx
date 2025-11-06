import Gallery from "@/components/gallery";
import ProductInfo from "@/components/products/productInfo";
import { getProductDetails } from "@/lib/actions";

const ProductDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const { productId } = await params;
  const productDetails = await getProductDetails(productId);
  return (
    <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
      <Gallery productMedia={productDetails.media} />
      <ProductInfo productInfo={productDetails} />
    </div>
  );
};

export default ProductDetails;
