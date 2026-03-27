# A-Frame Planet Voyager

A-Frame で太陽系を擬似旅行できる Web-VR アプリケーション。

**https://kawajiri34.github.io/aframe-planet-voyager/**

## 概要

ブラウザ上で太陽系の惑星間を自由に飛行し、各惑星を間近で観察できる VR 体験を提供する。
デスクトップ・モバイル・VR ヘッドセットに対応。GitHub Pages で公開する。

## 技術スタック

| カテゴリ | 技術 | バージョン | 備考 |
|---|---|---|---|
| VR フレームワーク | A-Frame | 1.6.0 | WebXR 対応の宣言的 VR フレームワーク（CDN） |
| 3D 描画基盤 | Three.js | A-Frame 内蔵 | A-Frame が内部で利用 |
| パーティクル | aframe-particle-system-component | 1.1.x | 星空・宇宙塵の演出（CDN） |
| 言語 | TypeScript | 5.x | 型安全な開発 |
| ビルドツール | Vite | 8.x | 高速 HMR、静的ビルド出力 |
| ホスティング | GitHub Pages | - | Vite ビルド成果物をデプロイ |
| テクスチャ素材 | Solar System Scope | - | NASA データベースの惑星テクスチャ（CC BY 4.0） |

> A-Frame 本体・プラグインはグローバル `AFRAME` オブジェクトが必要なため CDN の `<script>` タグで読み込み、
> カスタムコンポーネントと惑星データのみ Vite + TypeScript でバンドルする構成。

## 設計

### スケール方針

惑星間の距離・惑星サイズはデフォルメする（リアルスケールでは太陽系が広大すぎて VR 体験に適さないため）。

- **太陽**: 中心に配置、半径 5 単位
- **惑星**: 半径 0.4〜2 単位（実際の比率を緩やかに反映）
- **軌道半径**: 12〜95 単位に圧縮（対数スケール的に配置）

### 惑星データ

以下の天体を配置する:

| 天体 | 配置 |
|---|---|
| 太陽 | 中心、自発光（flat シェーダー + 点光源） |
| 水星 | 軌道 1 |
| 金星 | 軌道 2 |
| 地球 | 軌道 3（月を衛星として追加） |
| 火星 | 軌道 4 |
| 木星 | 軌道 5 |
| 土星 | 軌道 6（リング付き） |
| 天王星 | 軌道 7 |
| 海王星 | 軌道 8 |

各惑星は NASA テクスチャを適用し、自転軸の傾き・自転速度・公転速度を個別に設定。
軌道はリング状のガイド線で可視化。

### 操作方法

A-Frame 組み込みのコントロールで自由移動する。

- **デスクトップ**: WASD キーで移動、マウスドラッグで視点回転
- **VR ヘッドセット**: 頭の向きで視点操作
- **モバイル**: デバイスの傾きで視点操作

### シーン構成

```
a-scene
├── ambient-light      ... 環境光（弱め）
├── point-light        ... 太陽光源
├── camera-rig         ... プレイヤー
│   └── camera         ... 視点（wasd-controls + look-controls）
│       └── info-text  ... HUD（惑星名表示）
├── solar-system       ... 太陽系コンテナ（JS から動的生成）
│   ├── sun            ... 太陽（flat シェーダー + テクスチャ）
│   ├── orbit-wrapper  ... 公転ラッパー × 8
│   │   ├── planet     ... 惑星本体（テクスチャ + 自転）
│   │   ├── ring?      ... 土星リング
│   │   └── satellite? ... 衛星（月）
│   └── ...
├── orbit-ring × 8     ... 軌道ガイドリング
└── particle-system    ... 背景の星空（dust プリセット）
```

### ディレクトリ構成

```
aframe-planet-voyager/
├── index.html              ... エントリーポイント（A-Frame CDN + シーン定義）
├── vite.config.js          ... Vite 設定（GitHub Pages 用 base path）
├── tsconfig.json           ... TypeScript 設定
├── package.json
├── public/
│   └── textures/           ... 惑星テクスチャ画像（2K解像度）
│       ├── sun.jpg
│       ├── mercury.jpg
│       ├── venus.jpg
│       ├── earth.jpg
│       ├── moon.jpg
│       ├── mars.jpg
│       ├── jupiter.jpg
│       ├── saturn.jpg
│       ├── uranus.jpg
│       └── neptune.jpg
├── src/
│   ├── main.ts             ... エントリー（シーン loaded 後に惑星を動的追加）
│   ├── components/         ... A-Frame カスタムコンポーネント
│   │   ├── planet.ts       ... 惑星の自転
│   │   ├── orbit.ts        ... 公転アニメーション
│   │   └── info-panel.ts   ... ホバーで惑星名を HUD 表示
│   ├── data/
│   │   └── planets.ts      ... 惑星データ定義（型付き）
│   ├── types/
│   │   └── aframe.d.ts     ... A-Frame グローバルの型定義
│   └── styles/
│       └── main.css        ... UI スタイル
└── README.md
```

## 開発

```bash
# 依存インストール
npm install

# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## デプロイ

`main` ブランチに push すると GitHub Actions が自動で実行される。

1. `npm ci` → `npm run build` で `dist/` を生成
2. GitHub Pages（Actions 経由）にデプロイ

### 初回セットアップ

GitHub リポジトリの Settings → Pages で **Source** を **GitHub Actions** に設定する。
