let api = "https://quotes-api-self.vercel.app/quote";
let quotetext = document.querySelector(".box-quote");
let athor = document.querySelector(".box-by-athor");
let buttonNewQueto = document.querySelector(".box--buttons__new-quote");
let buttonTweet = document.querySelector(".box--buttons__tweet");

buttonTweet.addEventListener("click", Tweet);

function Tweet() {
  window.open(
    "https://twitter.com/intent/tweet?text=" + quotetext.innerHTML,
    "Tweet window",
    "width = 600,height = 300"
  );
}

async function getUrl(url) {
  let response = await fetch(url);
  let data = await response.json();
  quotetext.innerHTML = data.quote;
  athor.innerHTML = data.author;
  console.log(data);

  // Створюємо лінію і додаємо її після елемента
  const line = document.createElement("div");
  line.style.position = "absolute";
  line.style.backgroundColor = "rgb(94, 169, 219)";
  line.style.height = "1px";
  line.style.width = "20px"; // ширина лінії
  line.style.top = "17%";
  line.style.right = "120px"; // Закріплюємо лінію віднизу

  // Додаємо лінію до контейнера автора
  athor.style.position = "relative"; // Робимо контейнер `athor` відносним, щоб лінія була відносно нього
  athor.appendChild(line);

  //   Оновлюємо позицію лінії кожного разу, коли змінюється розмір тексту автора
  function updateLinePosition() {
    // Отримуємо розміри елемента з текстом (athor) та його позицію
    const rect = athor.getBoundingClientRect();

    // Отримуємо ширину елемента, враховуючи зовнішні маржі та padding
    const authorWidth = athor.offsetWidth; // Це дасть точну ширину елемента без врахування додаткових відступів
    const containerWidth = athor.parentElement.offsetWidth; // Ширина контейнера, в якому знаходиться athor

    // Обчислюємо позицію лінії праворуч від тексту (додаємо відступ)
    const linePosition = rect.left + authorWidth + -720; // додаємо відступ 20px
    // Встановлюємо лінію на правильну позицію (пікселі, а не відсотки)
    line.style.left = `${linePosition}px`; // Відстань від лівого краю елемента athor
  }

  // Викликаємо функцію для початкового розміщення лінії
  updateLinePosition();

  // Відслідковуємо зміни в розмірі автора
}

buttonNewQueto.addEventListener("click", () => {
  getUrl(api);
});
