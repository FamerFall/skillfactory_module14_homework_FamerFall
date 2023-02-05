let inputNum = document.querySelector(".inputNum");
let button = document.querySelector("button");

inputNum.onclick = function() {
    inputNum.value = '';
}

button.onclick = function() {
    let inputUser = +inputNum.value;
    if ( inputUser <= 10 && inputUser >= 1 ) {
        useRequest('https://picsum.photos/v2/list?limit=10', displayResult);
    } else {
        console.log('число вне диапазона от 1 до 10');
    }
}

function useRequest(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  
    xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
};

const resultNode = document.querySelector('.j-result');


function displayResult(apiData) {
  let cards = '';
//   console.log('start cards', cards);
  
   for (let i=0; i < +inputNum.value; i++) {
    let b = apiData[i];
    const cardBlock = `
      <div class="card">
        <img
          src="${b.download_url}"
          class="card-image"
        />
        <p>${b.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  };
  
//   console.log('end cards', cards);
    
  resultNode.innerHTML = cards;
}