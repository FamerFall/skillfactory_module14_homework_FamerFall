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

// let lastLength = +localStorage.getItem('length');
// console.log(lastLength);

if ( localStorage.getItem(1) === null ) {
  console.log('В буфере ничего нет')
  userInfo.innerHTML = '<p>В буфере ничего нет</p>'
} else {
  for (let i=1; i < +localStorage.getItem('length') + 1; i++) {
    // console.log(localStorage.getItem(i));
    userInfo.innerHTML += `<img src='${localStorage.getItem(i)}' alt="картинка ${+i}" class="img ${+i}" style="width: 100px;"> `;
    localStorage.removeItem(i)
  }
}



const useRequest = () => {
  return fetch(`https://picsum.photos/v2/list?page=${+inputNum01.value}&limit=${+inputNum02.value}`)
  .then((response) => {
    const result = response.json();
    // console.log('result', result);
    return result;
  })
  .then((data) => {
    console.log(data);
    // localStorage.setItem('myJSON', `${data}`);
    let a = 0;
    data.forEach(item => {
      a = a + 1;
      userInfo.innerHTML += `<img src='${item.download_url}' alt="картинка ${a}" class="img ${a}" style="width: 100px;"> `;
      localStorage.setItem(a, `${item.download_url}`);
    });
      // console.log(data.length);
      localStorage.setItem('length', `${+data.length}`);
  })

  .catch(() => { console.log('error') });
}


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


buttonClean.addEventListener('click', async () => {
  localStorage.clear()
  userInfo.innerHTML = '';
});
