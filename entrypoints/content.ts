export default defineContentScript({
  matches: ['*://*.google.com/*', '*://*.google.co.jp/*'],
  main() {

    // 配送追跡番号の正規表現
    const trackingPattern = /^[0-9\-]{12,15}$/; // 12桁の数値（ハイフン含む場合は長さが増える可能性あり）

    // 各追跡サービスへのリンク
    const trackingUrls = {
      yamato: {
        name: "ヤマト運輸",
        url: "https://jizen.kuronekoyamato.co.jp/jizen/servlet/crjz.b.NQ0010?id=", // "https://toi.kuronekoyamato.co.jp/cgi-bin/tneko",
      },
      sagawa: {
        name: "佐川急便",
        url: "https://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do?okurijoNo="
      },
      japanPost: {
        name: "日本郵便",
        url: "https://trackings.post.japanpost.jp/services/srv/search/direct?searchKind=S003&locale=ja&SVID=023&reqCodeNo1="
      }
    };

    // 検索キーワードを取得する
    function getSearchQuery(): string | null {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("q") || "";
    }

    // ハイフンを削除して純粋な数値を抽出する
    function normalizeTrackingNumber(query: string | null) {
      if(!query) return "";
      return query.replace(/-/g, ""); // ハイフンをすべて削除
    }

    // 配送追跡番号を検出し、リンクを表示する
    function checkAndDisplayTrackingLinks(query: string | null) {
      if (!query) return;

      const container = document.querySelector("#search");
      if (!container) return;

      // ハイフンを削除した検索クエリ
      const normalizedQuery = normalizeTrackingNumber(query);

      // 正規表現で追跡番号かどうか確認
      if (trackingPattern.test(query) && /^[0-9]{12}$/.test(normalizedQuery)) {
        const linksContainer = document.createElement("div");
        linksContainer.style.marginTop = "20px";
        linksContainer.style.padding = "10px";
        linksContainer.style.border = "1px solid #ccc";
        linksContainer.style.backgroundColor = "#f9f9f9";

        const heading = document.createElement("strong");
        heading.textContent = "配送追跡リンク:";
        linksContainer.appendChild(heading);

        for (const carrier of Object.values(trackingUrls)) {
          const link = document.createElement("a");
          link.href = carrier.url + normalizedQuery;
          link.target = "_blank";
          link.textContent = `${carrier.name}の追跡ページへ`;
          link.style.display = "block";
          linksContainer.appendChild(link);
        }

        container.prepend(linksContainer);
      }
    }

    // 実行
    const query = getSearchQuery();
    checkAndDisplayTrackingLinks(query);

  },
});