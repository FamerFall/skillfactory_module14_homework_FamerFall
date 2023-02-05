let inputNum01 = document.querySelector(".inputNum01");
let inputNum02 = document.querySelector(".inputNum02");
let userInfo = document.querySelector('.userInfo');

let button = document.querySelector("button");

inputNum01.onclick = function() {
    inputNum01.value = '';
}

inputNum02.onclick = function() {
  inputNum02.value = '';
}

const useRequest = () => {
  return fetch(`https://picsum.photos/v2/list?page=${+inputNum01.value}&limit=${+inputNum02.value}`)
  // https://picsum.photos/v2/list?page=1&limit=10
  .then((response) => {
    // Объект ответа на запрос
    // console.log('response', response);
    // Превращаем объект в JSON. Мы не можем его сразу прочитать,
    // надо отдать в следующий then
    const result = response.json();
    // console.log('result', result);
    return result;
  })
  .then((data) => {
    // Объект результата в формате JSON
    console.log(data);
    data.forEach(item => {
      userInfo.innerHTML += `<img src='${item.download_url}' alt="картинка ${item}" class="img ${item}" style="width: 100px;"> `;
    });
  })

  .catch(() => { console.log('error') });
}


button.addEventListener('click', async () => {
  console.log('start');
  if ( (+inputNum01.value <= 10 && +inputNum01.value >= 1) && (+inputNum02.value <= 10 && +inputNum02.value >= 1) ) {
    userInfo.innerHTML = '';
    const requestResult = await useRequest();
    console.log('requestResult', useRequest);
  } else if ( +inputNum01.value <= 10 && +inputNum01.value >= 1 ) {
    userInfo.innerHTML = '<p>Номер страницы вне диапазона от 1 до 10</p>';
  } else if ( +inputNum02.value <= 10 && +inputNum02.value >= 1 ) {
    userInfo.innerHTML = '<p>Лимит вне диапазона от 1 до 10</p>';
  } else {
    console.log('Нужно ввести значение от 1 до 10');
    userInfo.innerHTML = '<p>Номер страницы и лимит вне диапазона от 1 до 10</p>';
  };
  console.log('end');
});