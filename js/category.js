const categoriesUrl =
  'https://openapi.programming-hero.com/api/news/categories';
fetch(categoriesUrl)
  .then((res) => res.json())
  .then((data) => loadCategories(data.data.news_category))
  .catch((error) => console.log(error));

const loadCategories = (categories) => {
  const categoriesContainer = document.getElementById('categories_container');
  categories.forEach((category) => {
    const categoryElement = document.createElement('li');
    categoryElement.classList.add('nav-item');
    categoriesContainer.appendChild(categoryElement);
    categoryElement.innerHTML = `<a id="category_link" onclick="loadNewses('${category.category_id}')" class="nav-link fw-semibold" aria-current="page" href="#"
    >${category.category_name}</a>`;
  });
};
