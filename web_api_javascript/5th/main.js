'use strict';

// foundationを使うための記述
$(document).foundation();

//----------------------------------------
// グローバル変数
//----------------------------------------

// 本来はサーバー側で処理してユーザーからは見えないようにする
// apikeyを入力 注意：gitにapikeyを上げないように！！
const API_KEY = "247dd41d27fa26430698cbee3f81168d";
const mainBlock = document.getElementById("main-block"); // リスト表示用の親要素習得
let _url = ''; // URLの生成用
let xhttp = ''; // XMLHttpRequestオブジェクトを作成
const FAVORITE_SHOP_KEY = "favorite_shop"; // お気に入りの店をローカルストレージを保存する際のkeyの名前を格納
let favorite_shop = ''; // ローカルストレージのkeyのfavorite_shopの値を格納

//----------------------------------------
// 検索ボタンをクリックした時の処理
//----------------------------------------
function clickSearch() {
  getFavoriteList();
  loadUrl();
  getRequest();
}

//----------------------------------------
// お気に入り表示ボタンをクリックした時の処理
//----------------------------------------
function clickFavorite() {
  getFavoriteList();
  loadUrl();
  getFavoriteRequest();
}

//----------------------------------------
// ●loadUrl●
// XMLHttpRequestオブジェクト生成
// [引数]
//   なし：
// [戻り値]
//   なし：
//----------------------------------------
function loadUrl() {
  // 全ての子要素を削除する
  while (mainBlock.firstChild) mainBlock.removeChild(mainBlock.firstChild);

  // 検索ワードを取得する
  let searchData = document.getElementById("search-id").value;

  // URLの生成 本来はサーバー側で処理すべき(apikeyがユーザーに見えてしまうので)
  _url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${API_KEY}&freeword=${searchData}`;

  // Ajax(XMLHttpRequest)処理
  xhttp = new XMLHttpRequest();
}

//----------------------------------------
// ●getRequest●
// データ取得
// [引数]
//   なし：
// [戻り値]
//   なし：
//----------------------------------------
function getRequest() {
  // 通信が終わった時の処理
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // APIを実行して結果のJSONデータを加工している
      let res = JSON.parse(xhttp.responseText);
      for (let i = 0; i < res.rest.length; i++) {
        addCardItem(res.rest[i]);
      }
    }
  };
  // データ取得開始
  xhttp.open("GET", _url, true);
  xhttp.send();
}

//----------------------------------------
// ●getFavoriteRequest●
// お気に入りのデータのみ取得
// [引数]
//   なし：
// [戻り値]
//   なし：
//----------------------------------------
function getFavoriteRequest() {
  // 通信が終わった時の処理
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let res = JSON.parse(xhttp.responseText);
      for (let i = 0; i < res.rest.length; i++) {
        if(favorite_shop.indexOf(res.rest[i].id) !== -1) {
          addCardItem(res.rest[i]);
        }
      }
    }
  };
  // データ取得開始
  xhttp.open("GET", _url, true);
  xhttp.send();
}

//----------------------------------------
// ●addCardItem●
// 飲食店のカラム生成の関数
// [引数]
//   item :飲食店のデータ
// [戻り値]
//   なし： DOMを生成
//----------------------------------------
function addCardItem(item) {
  var node = document.createElement("div"); // カラム用のdivタグを生成
  node.setAttribute("class", "column"); // 生成したdivタグにclassプロパティにcolumnの値をセット
  let link_node = document.createElement("a"); // aタグを生成
  let icon_node = generateIcon(item.id); // お気に入りボタンのアイコンボタンを生成
  let p_node = document.createElement("p"); // pタグを生成
  p_node.textContent = item.name; // pタグに飲食店の名前を挿入
  let img_node = document.createElement("img"); // imgタグを生成
  img_node.src = item.image_url.shop_image1; // imgタグに飲食店の画像

  node.append(icon_node); // カラムにアイコン挿入
  node.append(link_node); // カラムにaタグを挿入
  link_node.append(p_node); // aタグ内にpタグを挿入
  link_node.append(img_node); // aタグ内にimgタグを挿入
  mainBlock.appendChild(node); // 親要素にカラムを挿入
}

function getFavoriteList() {
  favorite_shop = localStorage.getItem(FAVORITE_SHOP_KEY); // ローカルストレージのkeyのfavorite_shopの値を取得

  if(!(favorite_shop)) {
    favorite_shop = [];
  } // 値がなかった場合、配列を新たに生成

  if(favorite_shop.length > 0) {
    favorite_shop = favorite_shop.split(',');
  } // 値があった場合、テキストデータを , で区切って配列データ生成
}

//----------------------------------------
// ●generateIcon●
// お気に入りアイコン生成の関数
// [引数]
//   shop_id :飲食店のid
// [戻り値]
//   icon_node： お気に入りアイコン
//----------------------------------------
function generateIcon(shop_id) {
  let icon_node = document.createElement("i"); // iタグ生成
  const ICON_STATUS = {
    NORMAL: 0,
    FAVORITE: 1,
  } // お気に入りのステータス
  if(favorite_shop.indexOf(shop_id) !== -1) {
    icon_node.style.color = "red";
    icon_node.status = ICON_STATUS.FAVORITE;
  } else {
    icon_node.style.color = "grey"; // colorをgreyにセット
    icon_node.status = ICON_STATUS.NORMAL;
  }
  icon_node.shop_id = shop_id; // 飲食店のIDをセット
  icon_node.classList.add("fa"); // faクラスをセット
  icon_node.classList.add("fa-star"); // fa-starクラスをセット
  icon_node.classList.add("fa-3x"); //fa-3xクラスをセット

  //----------------------------------------
  // ●onclick●
  // お気に入りアイコン生成の関数
  // [引数]
  //   なし：
  // [戻り値]
  //   なし：
  //----------------------------------------
  icon_node.onclick = function() {
    console.log(favorite_shop.length);

    if(icon_node.status === 0 && favorite_shop.length < 10) {
      icon_node.style.color = "red";
      icon_node.status = 1;
      favorite_shop.push(this.shop_id); //飲食店のIDを配列に追加
    } else if(icon_node.status === 0) {
      alert('お気に入りの数は10個までです');
    } else {
      icon_node.style.color = "grey";
      icon_node.status = 0;
      favorite_shop = favorite_shop.filter(function(value) {
        return value !== icon_node.shop_id;
      });
    } // アイコンのステータスと色変更

    localStorage.setItem(FAVORITE_SHOP_KEY, favorite_shop); // ローカルストレージのkey:favorite_shopに値をセット
  }

  return icon_node; // アイコンNodeを返す
}
