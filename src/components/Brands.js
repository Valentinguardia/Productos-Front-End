"use client"
const Brands = ({ brands }) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Marcas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <div key={brand.id} className="border p-4 rounded-lg">
            <img src={brand.logo_url} alt={brand.name} className="h-40 w-full object-cover" />
            <h2 className="mt-2 text-lg font-semibold">{brand.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
