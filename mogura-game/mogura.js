{
  'use strict';

  //----------------------------------------
  // グローバル変数
  //----------------------------------------
  const moguras = document.querySelectorAll('.mogura'); // モグラの画像一覧を取得
  let preRandom = 0; // 一つ前のランダム初期値
  let count = 0; // 秒数カウント
  let hits = 0; // モグラが叩かれた数


  //----------------------------------------
  // ●kakureruMogura●
  // モグラが隠れる時の関数
  // [引数]
  //   e : イベントオブジェクト
  // [戻り値]
  //   なし：
  //----------------------------------------
  const kakureruMogura = mogura => mogura.src = '';


  //----------------------------------------
  // ●modoruMogura●
  // モグラが普通の顔に戻る時の関数
  // [引数]
  //   mogura : 叩かれたモグラのオブジェクト
  // [戻り値]
  //   なし：
  //----------------------------------------
  // const modoruMogura = mogura => mogura.src = 'images/モグ2.png';


  //----------------------------------------
  // ●deruMogura●
  // モグラが出る時の関数
  // [引数]
  //   なし：
  // [戻り値]
  //   なし：
  //----------------------------------------
  const deruMogura = () => {
    let random = 0;
    do{
      random = Math.floor(Math.random() * moguras.length);
    } while(random === preRandom);
    preRandom = random;
    moguras[random].src = 'images/モグ2.png';
    setTimeout(kakureruMogura, 700, moguras[random]);
  }


  //----------------------------------------
  // ●stopMogura●
  // モグラ叩きを終了する時の関数
  // [引数]
  //   startMogura: derumoguraのsetInterval関数
  // [戻り値]
  //   なし：
  //----------------------------------------
  const stopMogura = (startMogura, count) => {
    clearInterval(startMogura);
    clearInterval(count);
    alert(`モグラが叩かれた数：${hits}`);
    startMogura();
  }


  //----------------------------------------
  // ●hitMogura●
  // モグラを叩いた時の関数
  // [引数]
  //   e : 叩かれたモグラのオブジェクト
  // [戻り値]
  //   なし：
  //----------------------------------------
  const hitMogura = e => {
    e.target.src = 'images/モグ1.png';
    hits++;
  };


  //----------------------------------------
  // モグラを押下したときの処理
  //----------------------------------------
  for(let i = 0; i < moguras.length; i++) {
    moguras[i].addEventListener('click', hitMogura);
  }


  //----------------------------------------
  // ●startMogura●
  // モグラ叩きスタートの関数
  // [引数]
  //   なし :
  // [戻り値]
  //   なし：
  //----------------------------------------
  function startMogura () {
    if(confirm('モグラ叩きやりますか？')) {
      let countId = setInterval(countUp, 1000);
      const moguraId = setInterval(deruMogura, 1000);

      //----------------------------------------
      // ●countUp●
      // 秒数カウントの関数
      // [引数]
      //   なし :
      // [戻り値]
      //   なし： 30秒経つとstopMogura関数
      //----------------------------------------
      function countUp() {
        count++;

        if(count === 5) {
          stopMogura(moguraId, countId);
        }
      };
    }
  }

  //----------------------------------------
  // モグラ叩きスタート
  //----------------------------------------
  startMogura();

}
