export function filterProducts(products, { category, search }) {
  return products.filter(p => {
    const matchesCategory = category === "all" || p.category === category;
    const matchesSearch = search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

export function sortProducts(products, sortBy) {
  const sorted = [...products];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    case "name":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}