//var test;
// 全てのもぐらに、クリックイベントを登録する
const moguras = document.querySelectorAll(".mogura");
const iteiMogura = "images/モグ1.png";
const normalMogura = "images/モグ2.png";
setInterval(deruMogura, 1000);

for (let index = 0; index < moguras.length; index++) {
  const element = moguras[index];
  element.onclick = hitMogura;
}

// もぐらが叩かれる
function hitMogura() {
  var mogura = event.target;
  mogura.src = iteiMogura;
  setTimeout(kakureruMogura, 700, mogura);
}

// // もぐらが戻る
// function modoruMogura(mogura){
// 	mogura.src = "images/モグ2.png";
// }

// もぐらが隠れる(消える)
function kakureruMogura(mogura) {
  mogura.src = "";
}

function deruMogura() {
  var random = Math.floor(Math.random() * 9);
  var mogura = moguras[random];
  mogura.src = normalMogura;
  // しばらくしたら隠れる
  setTimeout((mogura) => {
    if (mogura.src.indexOf(normalMogura)) {
      kakureruMogura(mogura);
    }
  }, 600, mogura);
}
