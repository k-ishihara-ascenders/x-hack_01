'use strict';

//----------------------------------------
// グローバル変数
//----------------------------------------
const moguras = document.getElementsByClassName('mogura'); // キャラクター用画像ノードの一覧
const body = document.getElementById('game'); // body要素取得
let score = 0; // スコア初期値
let random = 0; // ランダムの数
let preRandom = 0; // 一つ前にランダムの数


//----------------------------------------
// ハンマーで叩いた時の処理
//----------------------------------------
body.addEventListener('click', () => {
  body.classList.add('hit');
  setTimeout(() => {
    body.classList.remove('hit');
  },100);
});

// それぞれのモグラのイメージ画像にmoguraObjのプロパティ・関数をセット
for(let i = 0; i < moguras.length; i++) {
  moguraObj(moguras[i]);
}

//----------------------------------------
// ●startMogura●
// モグラ叩きゲームをスタートした時の関数
// [引数]
//   なし :
// [戻り値]
//   なし： モグラを表示・非表示させる
//----------------------------------------
function startMogura() {
  do {
    random = Math.floor(Math.random() * moguras.length);
  }while(random === preRandom);
  preRandom = random;
  moguras[random].showMogura();
  setTimeout(moguras[random].hideMogura, 800);
}

//----------------------------------------
// ●start●
// モグラ叩きゲームをスタートさせる関数
// [引数]
//   なし :
// [戻り値]
//   なし： モグラ叩きのスタート・終了
//----------------------------------------
function start() {
  const interval = setInterval(startMogura,800);
  setTimeout(function() {
    clearTimeout(interval);
    alert(`ゲーム終了　スコア:${score}回`);
  },30000);
}

// モグラ叩きスタート
confirm('モグラ叩きスタートしますか？')) {
  start();
}

//----------------------------------------
// ●start●
// キャラクター画像にプロパティ・関数をセットさせる関数
// [引数]
//   image : キャラクター画像ノード
// [戻り値]
//   なし： キャラクター画像にプロパティ・関数をセット
//----------------------------------------
function moguraObj(image) {
  const NORMAL_MOGURA = 'images/モグ2.png'; // 普通のモグラ画像
  const PRESS_MOGURA = 'images/モグ1.png'; // 普通のモグラが叩かれた画像
  const SUPER_MOGURA = 'images/モグ3.png'; // イケメンモグラ画像
  const PRESS_SUPER_MOGURA = 'images/モグ4.png'; // イケメンモグラが叩かれた画像
  const GOBLIN = 'images/ゴブ1.png'; // ゴブリン画像
  const PRESS_GOBLIN = 'images/ゴブ2.png'; // ゴブリンが叩かれた画像
  const characters = [NORMAL_MOGURA, SUPER_MOGURA, GOBLIN]; // キャラクター画像一覧

  const STATUS = {
    HIDE: 0,
    SHOW: 1,
  } // 表示・非表示のステータス

  image.status = STATUS.HIDE; // デフォルトは非表示

  //----------------------------------------
  // ●onclick●
  // キャラクターを叩いた時の関数
  // [引数]
  //   なし :
  // [戻り値]
  //   なし： キャラクターがそれぞれ叩かれた時の画像表示
  //----------------------------------------
  image.onclick = () => {
    if(image.status === 1) {
      switch(true) {
        case image.src.indexOf(encodeURI(NORMAL_MOGURA)) > -1:
          image.src = PRESS_MOGURA;
          score++;
          break;
        case image.src.indexOf(encodeURI(SUPER_MOGURA)) > -1:
          image.src = PRESS_SUPER_MOGURA;
          score += 3;
          break;
        case image.src.indexOf(encodeURI(GOBLIN)) > -1:
          image.src = PRESS_GOBLIN;
          score --;
          break;
      }

      setTimeout(image.hideMogura,300);
    }
  }

  //----------------------------------------
  // ●hideMogura●
  // キャラクターを引っ込める関数
  // [引数]
  //   なし :
  // [戻り値]
  //   なし：
  //----------------------------------------
  image.hideMogura = () => {
    image.status = STATUS.HIDE;
    image.src = '';
  }

  //----------------------------------------
  // ●hideMogura●
  // キャラクターをランダムで表示させる関数
  // [引数]
  //   なし :
  // [戻り値]
  //   なし：
  //----------------------------------------
  image.showMogura = () => {
    if(image.status === 0) {
      image.status = STATUS.SHOW;
      const randomCharacterNum = Math.floor(Math.random() * characters.length);
      image.src = characters[randomCharacterNum];
    }
  }
}
