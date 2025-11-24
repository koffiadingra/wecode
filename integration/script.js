
const collectionSelect = document.getElementById('collection');
const colorSelect = document.getElementById('color');
const categorySelect = document.getElementById('category');
const priceRange = document.getElementById('price');

const products = document.querySelectorAll('.product-card');

function filterProducts() {
  const collection = collectionSelect.value;
  const color = colorSelect.value;
  const category = categorySelect.value;
  const maxPrice = parseInt(priceRange.value, 10);

  products.forEach((product) => {
    const productCollection = product.getAttribute('data-collection');
    const productColor = product.getAttribute('data-color');
    const productCategory = product.getAttribute('data-category');
    const productPrice = parseInt(product.getAttribute('data-price'), 10);

    const matchesCollection = collection === 'all' || productCollection === collection;
    const matchesColor = color === 'all' || productColor === color;
    const matchesCategory = category === 'all' || productCategory === category;
    const matchesPrice = productPrice <= maxPrice;

    if (matchesCollection && matchesColor && matchesCategory && matchesPrice) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}


collectionSelect.addEventListener('change', filterProducts);
colorSelect.addEventListener('change', filterProducts);
categorySelect.addEventListener('change', filterProducts);
priceRange.addEventListener('input', filterProducts);

filterProducts();
