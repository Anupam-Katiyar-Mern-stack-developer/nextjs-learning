import ProductsNav from "./ProductsNav";

export default function ProductsLayout({ children }) {
  return (
    <div>
      <header className="bg-blue-600 p-4 flex items-center justify-between">
        <h2 className="text-white">My Product Store</h2>

        <ProductsNav />
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}