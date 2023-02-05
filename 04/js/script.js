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
  return fetch(`https://picsum.photos/${+inputNum01.value}/${+inputNum02.value}`)
    .then((response) => {
      // console.log(response.url);
      
      return response.url;
    })
    // .then((json) => { console.log(json); })
    .catch(() => { console.log('error') });
}


button.addEventListener('click', async () => {
  console.log('start');
  if ( (+inputNum01.value <= 300 && +inputNum01.value >= 100) && (+inputNum02.value <= 300 && +inputNum02.value >= 100) ) {
      const requestResult = await useRequest();
      // userInfo.innerHTML = '';
      userInfo.innerHTML = `<img src='${requestResult}' alt="<текст>" />`;
    console.log('requestResult', requestResult);
  } else {
    console.log('Нужно ввести значение от 100 до 300');
    // let userInfo = document.querySelector('.userInfo');
    userInfo.innerHTML = '<p>Нужно ввести значение от 100 до 300</p>';
  };
  console.log('end');
});