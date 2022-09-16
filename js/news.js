const loadNewses = (category_id) => {
  toggleSpinner(true);

  const newsUrl = `https://openapi.programming-hero.com/api/news/category/${category_id}`;

  fetch(newsUrl)
    .then((res) => res.json())
    .then((data) => displayNews(data.data))
    .catch((error) => console.log(error));

  const displayNews = (newses) => {
    newses.sort((a, b) => {
      return b.total_view - a.total_view;
    });

    const newsContainer = document.getElementById('news_container');
    newsContainer.textContent = '';

    if (newses.length === 0) {
      document.getElementById('no_news_msg').classList.remove('d-none');
    } else {
      document.getElementById('no_news_msg').classList.add('d-none');
    }

    const itemCountMessageContainer = document.getElementById('item_count_msg');
    itemCountMessageContainer.textContent = '';
    const itemCountMessage = document.createElement('h5');
    itemCountMessageContainer.appendChild(itemCountMessage);
    itemCountMessage.innerText = `${newses.length} items found for this category`;

    newses.forEach((news) => {
      const newsCard = document.createElement('div');
      newsContainer.appendChild(newsCard);
      newsCard.classList.add('card', 'mb-3', 'rounded-4');
      newsCard.style.width = '100%';
      newsCard.innerHTML = `<div class="row g-0">
    <div class="col-md-2">
      <img src="${
        news.thumbnail_url
      }" class="img-fluid h-100 w-100" alt="..." />
    </div>
    <div class="col-md-10">
    <div class="card-body h-100 d-flex flex-column justify-content-evenly">
    <h5 class="card-title">${news.title}</h5>
    <p class="card-text">
      ${news.details.slice(1, 350)}...
    </p>
    <p class="card-text">
      <small class="text-muted">Published date: ${
        news.author.published_date
          ? news.author.published_date
          : 'No published date found'
      }</small>
    </p>
    <div class="info d-flex align-items-center justify-content-between">
      <div className="author_info" style="width: 60%">
        <img src="${
          news.author.img
        }" class="rounded-circle" width="40" alt="" />
        <span class="fw-semibold">${
          news.author.name ? news.author.name : 'No author name found'
        }</span>
      </div>
      <div class="news_views" style="width: 20%">
       <span><i class="fa-regular fa-eye"></i> ${
         news.total_view ? news.total_view : 'No views found'
       }</span>
      </div>
      <div class="detail_button text-right" style="width: 20%">
        <a class="border p-2 rounded-circle shadow-sm" href="" onclick="loadNewsDetails('${
          news._id
        }')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </div>
  </div>
    </div>
  </div>`;
    });

    toggleSpinner(false);
  };
};

const toggleSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading_spinner');
  if (isLoading === true) {
    loadingSpinner.classList.remove('d-none');
  } else {
    loadingSpinner.classList.add('d-none');
  }
};
