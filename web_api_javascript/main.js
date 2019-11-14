//----------------------------------------
// グローバル変数
//----------------------------------------
const button = document.getElementById('button'); // 検索ボタン取得
const mainBlock = document.getElementById('main-block'); // 親要素取得
const formElement = document.getElementById('seachForm'); // フォーム取得
const genre = document.getElementById('genre'); // 入力フォーム（ジャンル）取得
const place = document.getElementById('place'); // 入力フォーム（場所）取得
const smoke = formElement.smoke; // ラジオボタン（喫煙）取得
const areaSelect = document.getElementById('areaSelect');
const areaList = [
  {name: '北海道', area: 'AREA150'},
  {name: '東北', area: 'AREA160'},
  {name: '関東', area: 'AREA110'},
  {name: '北陸', area: 'AREA170'},
  {name: '中部', area: 'AREA130'},
  {name: '関西', area: 'AREA120'},
  {name: '中国', area: 'AREA180'},
  {name: '四国', area: 'AREA190'},
  {name: '九州', area: 'AREA140'},
  {name: '沖縄', area: 'AREA200'},
]; // エリア一覧

// エリアセレクタのoptionタグ作成
areaList.forEach( value => {
  const optionNode = document.createElement('option');
  optionNode.setAttribute('value', value.area);
  optionNode.textContent = value.name;
  areaSelect.appendChild(optionNode);
});

//----------------------------------------
// ●addRestData●
// DOMを動的に生成する関数
// [引数]
//   rest : ぐるなびAPIのレストラン一覧の配列データ
// [戻り値]
//   なし：h3とimageタグの一覧を生成
//----------------------------------------
function addRestData(rest) {
  // 検索時、子要素あった場合は削除
  while(mainBlock.firstChild) {
    mainBlock.removeChild(mainBlock.firstChild);
  }

  // DOMを生成
  for(let i = 0; i < rest.length; i++) {
    // h3タグを生成
    const textNode = document.createElement('h3');
    textNode.textContent = rest[i].name;
    mainBlock.appendChild(textNode);

    // imgタグを生成
    const imageNode = document.createElement('img');
    imageNode.src = rest[i].image_url.shop_image1;
    mainBlock.appendChild(imageNode);
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
  // 禁煙席の判定
  !smoke.checked ? smoke.value = 0 : smoke.value = 1;

  // アクセスするURLを設定
  const url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=247dd41d27fa26430698cbee3f81168d&freeword=${genre.value}&no_smoking=${smoke.value}&area=${areaSelect.value}`;

  // XMLHttpRequestオブジェクトを生成
  const request = new XMLHttpRequest();
  // どのHTTPリクエストメソッド（GET / POST）を使ってリソースをネットワークから取得するかのURLを指定
  request.open('GET', url);
  // httpリクエストの指示を出す
  request.send();

  // 受信成功した場合の処理
  request.onload = () => {
    // responseプロパティでレストランデータの配列を取得
    // 取得したデータをJSON形式に変換
    const result = JSON.parse(request.response).rest;
    addRestData(result);
  }
}

// 検索開始
button.addEventListener('click', send_request);
