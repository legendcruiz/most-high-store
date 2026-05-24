import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="product-card bg-white rounded-lg shadow p-3">
      
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          className="h-40 w-full object-cover rounded"
        />
      </Link>

      <h2 className="mt-2 font-semibold line-clamp-1">
        {product.name}
      </h2>

      <p className="text-sm text-gray-500 line-clamp-2">
        {product.description}
      </p>

      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-orange-500">
          ₦{product.price}
        </span>

        <Link
          to={`/product/${product.id}`}
          className="bg-black text-white px-3 py-1 rounded text-sm"
        >
          View
        </Link>
      </div>
    </div>
  );
}