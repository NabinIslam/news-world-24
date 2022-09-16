const loadNewsDetails = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsDetails(data.data))
    .catch((error) => console.log(error));
};

const displayNewsDetails = (details) => {
  const modalTitle = document.getElementById('exampleModalLabel');
  const modalBody = document.getElementById('modal_body');
  details.forEach((detail) => {
    modalTitle.innerText = `${detail.title}`;
    modalBody.innerHTML = `<p>${detail.details}</p>
    <p><b>Published date:</b> ${
      detail.author.published_date
        ? detail.author.published_date
        : 'No published date found'
    }</p>
    <p><b>Author:</b> ${
      detail.author.name ? detail.author.name : 'No author found'
    }</p>
    <p><B>Rating:</B> ${
      detail.rating.number ? detail.rating.number : 'No rating found'
    }</p>
    <p><b>Total views:</b> ${
      detail.total_view ? detail.total_view : 'No views amount found'
    }</p>`;
  });
};
