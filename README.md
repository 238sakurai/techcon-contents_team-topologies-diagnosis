# Team Topologies 診断

SREあるある × チーム特性診断 - 10問 Yes/No で、あなたのチームの特性を診断します。

## 🌐 デモ

https://238sakurai.github.io/techcon-contents_team-topologies-diagnosis/

## 📋 概要

Team Topologies の概念をベースに、SRE / Platform Engineering の文脈で「自分たちのチームがどのタイプに近いか」を診断する Web アプリです。

**所要時間**: 約1〜2分

### 診断結果タイプ

| タイプ | 名称 | 特徴 |
|:---:|:---|:---|
| A | 自律実行型チーム | Stream-aligned 寄り。判断と運用がチーム内で完結しやすい |
| B | 横断イネーブリング型 | Platform/Enabling 寄り。組織横断の依頼や仕組み化が主戦場 |
| C | 分断・属人化ゾーン | あるある枠。判断や情報が人に集中しやすい状態 |

## 📊 設問とスコアリング

### 設問一覧

| # | 設問 | Yes | No |
|:---:|:---|:---:|:---:|
| Q1 | 組織横断的な案件を同時に複数抱えている | B+1 | - |
| Q2 | インフラや運用のコスト削減をミッションとして担っている | B+1 | - |
| Q3 | 他チーム向けに「仕組み・テンプレ・ガイド」を作ることが多い | B+1 | - |
| Q4 | 社内勉強会や知見展開を"役割として"やっている | B+1 | - |
| Q5 | 障害対応は基本的にチーム内で完結する | A+1 | - |
| Q6 | 「この人がいないと詰む」状況がある | C+1 | - |
| Q7 | 自分たちの責任範囲を一言で説明できる | A+1, B+1 | - |
| Q8 | 相談・依頼が常にどこかから飛んでくる | B+1 | - |
| Q9 | 仕事の優先順位を自分たちで決められている | A+1, B+1 | - |
| Q10 | 今の役割について納得感がある | - | C+1 |

### スコアリングロジック

```
判定の優先順位:

1. C_score >= 2 → Type C（分断・属人化ゾーン）
2. B_score >= A_score かつ B_score >= 4 → Type B（横断イネーブリング型）
3. それ以外 → Type A（自律実行型チーム）
```

### スコア範囲

| タイプ | 最大スコア | 判定条件 |
|:---:|:---:|:---|
| A | 3点 | Q5, Q7, Q9 の Yes |
| B | 7点 | Q1, Q2, Q3, Q4, Q7, Q8, Q9 の Yes |
| C | 2点 | Q6 の Yes, Q10 の No |

## 🎨 技術スタック

- **HTML5** - セマンティックマークアップ
- **CSS3** - CSS Variables、Flexbox、Grid
- **Vanilla JavaScript** - フレームワークなし
- **GitHub Pages** - ホスティング

## 📁 ファイル構成

```
.
├── index.html          # メインHTML
├── assets/
│   ├── app.js          # アプリケーションロジック
│   ├── questions.js    # 設問・スコア定義
│   ├── style.css       # スタイルシート
│   └── x-logo.svg      # X (Twitter) ロゴ
├── .nojekyll           # Jekyll無効化
└── README.md           # このファイル
```

## 🚀 機能

- ✅ 10問 Yes/No 形式の診断
- ✅ キーボード操作対応（Y/N キー）
- ✅ プログレスバー表示
- ✅ スクショ映えする結果画面
- ✅ X (Twitter) への投稿機能
- ✅ モバイルフレンドリー（レスポンシブ対応）
- ✅ アクセシビリティ対応（ARIA属性、最小タップ領域44px以上）

## 📱 X 投稿機能

結果画面の「結果をXに投稿」ボタンで、診断結果を X に投稿できます。

**投稿フォーマット例:**
```
チートポ診断：横断イネーブリング型 寄りでした。
横断が増えるほど分断と摩擦が見えやすい。
#srekaigi_dresscode
```

## 🔧 ローカル開発

```bash
# リポジトリをクローン
git clone https://github.com/238sakurai/techcon-contents_team-topologies-diagnosis.git
cd techcon-contents_team-topologies-diagnosis

# ローカルサーバーを起動（Python 3）
python -m http.server 8000

# ブラウザで開く
open http://localhost:8000
```

## 📄 ライセンス

MIT License

## 🏷️ 関連

- [Team Topologies](https://teamtopologies.com/) - Matthew Skelton & Manuel Pais
- [SRE KAIGI](https://srekaigi.jp/) - #srekaigi_dresscode
