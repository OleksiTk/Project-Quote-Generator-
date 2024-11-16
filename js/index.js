let api = "https://quotes-api-self.vercel.app/quote";
let quotetext = document.querySelector(".box-quote");
let athor = document.querySelector(".box-by-athor__text");
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
  quotetext.innerHTML = `"${data.quote}"`;
  athor.innerHTML = data.author;
  console.log(data);

  // Створюємо лінію і додаємо її після елемента
  const line = document.createElement("div");
  line.style.position = "absolute";
  line.style.backgroundColor = "rgb(94, 169, 219)";
  line.style.height = "1px";
  line.style.width = "20px"; // ширина лінії
  line.style.top = "50%";
  line.style.right = "120px";
  // Закріплюємо лінію віднизу

  // Додаємо лінію до контейнера автора
  athor.style.position = "relative"; // Робимо контейнер `athor` відносним, щоб лінія була відносно нього
  athor.appendChild(line);

  //   Оновлюємо позицію лінії кожного разу, коли змінюється розмір тексту автора
  function updateLinePosition() {
    // Отримуємо розміри елемента з текстом (athor) та його позицію
    const authorWidth = athor.offsetWidth; // Можна використовувати `offsetWidth` для точних вимірів

    line.style.right = `${authorWidth * 1.15}px`; // Задаємо відступ лінії від правого краю автора
  }

  // Викликаємо функцію для початкового розміщення лінії
  updateLinePosition();

  // Відслідковуємо зміни в розмірі автора
}

buttonNewQueto.addEventListener("click", () => {
  getUrl(api);
});
