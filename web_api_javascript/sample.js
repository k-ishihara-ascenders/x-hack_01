// イベントとは？
// イベント登録方法の説明
// 色々なイベントを試してみる
// chromeのdevツールを使おう
// ステップ実行を試す

//----------------------------------------
// グローバル変数
//----------------------------------------
const button = document.querySelector('.button'); // 検索ボタンを取得
const mainBlock = document.getElementById("main-block"); // 親要素を取得
const genre = document.getElementById("genre"); // 入力フォーム（ジャンル）を取得
const place = document.getElementById("place"); // 入力フォーム（場所）を取得


//----------------------------------------
// ●addCardItem●
// DOMを動的に生成する関数
// [引数]
//   rest : ぐるなびAPIのレストラン一覧のデータ
// [戻り値]
//   なし：h3とimageタグの一覧を生成
//----------------------------------------
function addCardItem(rest) {
  // const img_node = document.createElement("img");
  // img_node.src = "https://grapee.jp/wp-content/uploads/32187_main2.jpg";
  // mainBlock.appendChild(img_node);
  for(let i = 0; i < rest.length; i++) {
    const text_node = document.createElement('h3');
    text_node.textContent = rest[i].name;
    mainBlock.appendChild(text_node);

    const img_node = document.createElement("img");
    img_node.src = rest[i].image_url.shop_image1;
    mainBlock.appendChild(img_node);
  }
}

//----------------------------------------
// ●send_request●
// ぐるなびAPIのレストランデータを表示させる関数
// [引数]
//   なし :
// [戻り値]
//   なし：ぐるなびAPIのレストランデータを取得して一覧表示
//----------------------------------------
function send_request() {
  // 検索時、子要素があった場合は削除
  while(mainBlock.firstChild) {
    mainBlock.removeChild(mainBlock.firstChild);
  }

  // アクセスするurlを設定（keyIDは自分のぐるなびAPIキーにする）
  const url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=247dd41d27fa26430698cbee3f81168d&address=${place.value}&freeword=${genre.value}`;
  // XMLHttpRequestオブジェクト生成
  const request = new XMLHttpRequest();
  // どのHTTPリクエストメソッド（GET / POST）を使ってリソースをネットワークから取得するかなどのURLを指定
  request.open("GET", url);
  // httpリクエストの指示をだす
  request.send();

  // 受信成功した場合の呼び出し
  request.onload = function() {
    // レスポンスデータはresponseプロパティで取得できる
    // jsonファイルに変換（テキストデータで取得してるので）
    const result = JSON.parse(request.response).rest;
    addCardItem(result);
  }
}

// button.onclick = addCardItem;

// 検索ボタン
button.addEventListener('click', send_request);
