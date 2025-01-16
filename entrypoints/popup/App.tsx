import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="text-center">
        <img src="icon/128.png" alt="" />
        <br />
        <strong>検索結果ページに追跡ページリンク</strong>
      </div>
      <br />
      <div>
        Googleで、12桁の数値（ハイフンありなしどちらでも）を検索した場合、ヤマト運輸、佐川急便、日本郵便の荷物追跡ページへのリンクを検索結果ページに追加します。
      </div>
      <br />
      <div>
        Developed by k-tanaka in{" "}
        <a href="https://www.changing.jp/" target="_blank">
          Changing, LLC.
        </a>
      </div>
      <br />
      <div>
        Think Extension is Open Source. Let's develop with us, go to{" "}
        <a
          href="https://github.com/changing-k-tanaka/web-extenstion-shipping-tracking-in-search-result"
          target="_blank"
        >
          Github Page
        </a>
      </div>
      <br />
      <div>
        アイコンは、
        <a
          href="https://icon-rainbow.com/%e9%85%8d%e9%80%81%e3%83%88%e3%83%a9%e3%83%83%e3%82%af%e3%81%ae%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b3%e7%b4%a0%e6%9d%90-2/"
          target="_blank"
        >
          こちら
        </a>
        のものを利用させていただいています。
      </div>
    </>
  );
}

export default App;
