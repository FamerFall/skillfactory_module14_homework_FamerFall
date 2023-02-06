let inputNum01 = document.querySelector(".inputNum01");
let inputNum02 = document.querySelector(".inputNum02");
let userInfo = document.querySelector('.userInfo');

let buttonReq = document.querySelector(".btnReq");
let buttonClean = document.querySelector(".btnClean");

inputNum01.onclick = function() {
    inputNum01.value = '';
}

inputNum02.onclick = function() {
  inputNum02.value = '';
}


//Проверка, есть ли в памяти браузера свойство с ключом 1. 
//Я записываю все свойства с ключами в виде цифр от 1 до n.
//А свойства значения - ссылки на картинки.
if ( localStorage.getItem(1) === null ) {
  console.log('В буфере ничего нет')
  userInfo.innerHTML = '<p>В буфере ничего нет</p>'
} else {
  //цикл достаёт из памяти значения-ссылки, записанные мной ранее, чтобы при обнавлении страницы, они остались
  //Количество итераций 'length' равно длине масива, полученног по ссылки +1
  for (let i=1; i < +localStorage.getItem('length') + 1; i++) {
    // console.log(localStorage.getItem(i));
    userInfo.innerHTML += `<img src='${localStorage.getItem(i)}' alt="картинка ${+i}" class="img ${+i}" style="width: 100px;"> `;
    // localStorage.removeItem(i) //думал ещё чистить память, чтобы не засорялась. Но передумал.
  }
}


//функция, запускающаяся после нажатия кнопки "запрос"
const useRequest = () => {
  return fetch(`https://picsum.photos/v2/list?page=${+inputNum01.value}&limit=${+inputNum02.value}`)
  .then((response) => {
    const result = response.json(); //обезьянничаю с примера курса и что-то делаю
    // console.log('result', result);
    return result;
  })
  .then((data) => {
    console.log(data);
    // localStorage.setItem('myJSON', `${data}`); //афтался добавить в память запись, как объект, но видимо, поскольку данные не в виде объекта, не получилось.
    let a = 0; //добавляю переменную для счётчика, она же будет у меня в качестве ключа в памяти браузера для ссылок
    data.forEach(item => {
      a = a + 1; //это будет ключом в памяти браузера
      userInfo.innerHTML += `<img src='${item.download_url}' alt="картинка ${a}" class="img ${a}" style="width: 100px;"> `;
      //добавляю ключ от 1 до n и в качестве свойства - ссылку на картинку.
      localStorage.setItem(a, `${item.download_url}`); 
    });
      // console.log(data.length);
      //добавляю в память длину массива, получаемого по ссылки в память браузера с ключом 'length'.
      //Я использую его в цикле выше, когда извлекаю из памяти браузера фотографии.
      //Он нужен, чтобы знать, сколько фотографий извлечь из памяти и сколько их было добавлено ранее.
      localStorage.setItem('length', `${+data.length}`); //
  })

  .catch(() => { console.log('error') });
}

//Функция кнопки тут проверяю, чтобы поля были заполнены корректно, "слушая" инпуты
buttonReq.addEventListener('click', async () => {
  console.log('start');
  if ( (+inputNum01.value <= 10 && +inputNum01.value >= 1) && (+inputNum02.value <= 10 && +inputNum02.value >= 1) ) {
    userInfo.innerHTML = '';
    const requestResult = await useRequest();
    // console.log('requestResult', useRequest);
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

//Добавил кнопку для отчистки памяти браузера от ранее записанных значений, 
//и отчискти <div> в HTML, в который вывожу информацию.
buttonClean.addEventListener('click', async () => {
  localStorage.clear()
  userInfo.innerHTML = '';
});
