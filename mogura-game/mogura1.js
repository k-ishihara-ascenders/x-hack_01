// ここにJavaScriptを書く
'use strict';

let count = 0;
let hits = 0;

const moguras = document.getElementsByClassName('mogura');


for (let i = 0; i < moguras.length; i++) {
  const element = moguras[i];
  element.onclick = hitMogura;
}

function hitMogura() {
  const mogura = event.target;
  mogura.src = 'images/モグ1.png';

  setTimeout(kakurerumogura, 200, mogura);
  hits++;
}

// function modoruMogura(mogura) {
// 	mogura.src = 'images/モグ2.png';
// }

function kakurerumogura(mogura) {
  mogura.src = '';
}

let preRandom = 0;

function derumogura() {
  let random = 0;
  do {
    random = Math.floor(Math.random() * moguras.length);
  } while(preRandom === random);
  moguras[random].src = 'images/モグ2.png';

  setTimeout(kakurerumogura, 700, moguras[random]);
  preRandom = random;
}

if(confirm('ゲームスタート')) {
  const countId = setInterval(countup, 1000);
  const moguraId = setInterval(derumogura, 1000);

  function countup(moguraId) {
    count++;
    if(count === 30) {
      clearInterval(moguraId);
      clearInterval(countId);
      alert(`もぐらを${hits}回叩きました`);
    }
  }
}
