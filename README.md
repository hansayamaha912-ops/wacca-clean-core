# WACCA CLEAN CORE

Shopify/Oxygen を完全に切り離したピュアRemix (v2) アプリ。
Stripe審査用の最小3画面構成。

## ページ構成
| ルート | 内容 |
|--------|------|
| `/` | トップ + 購入導線モック |
| `/policies` | 特定商取引法に基づく表記 |

## ローカル起動
```bash
npm install
npm run dev
```

## Vercelデプロイ手順

### 1. GitHubリポジトリを作成してpush
```bash
git init
git add .
git commit -m "init: wacca clean core"
git remote add origin https://github.com/YOUR_USERNAME/wacca-clean-core.git
git push -u origin main
```

### 2. Vercel Import
1. https://vercel.com/new を開く
2. 作成したGitHubリポジトリをインポート
3. Framework Preset が **Remix** になっていることを確認
4. 環境変数は不要 → そのまま **Deploy**

### vercel.json について
`buildCommand` を `npx remix vite:build` に設定済み。
Oxygen/Shopifyの検知を完全に排除。
