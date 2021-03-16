# ゆめみ課題

## デプロイ先

<https://ten986-yumemi-kadai.vercel.app/>

にて動いています。

## 動かし方

```bash
git clone git@github.com:ten986/yumemi_kadai.git
cd yumemi_kadai
npm install
```

RESAS-API の API キーが必要なので、
<https://opendata.resas-portal.go.jp/> で利用登録し、API キーを取得する。

※ API キーは外部に漏らさないようにすること。

`.env.local` に API キーを記述する。

```bash
touch .env.local
```

`.env.local`

```env
X-API-KEY="your-api-key"
```

以上を実行すると、`npm run dev` で development server が起動し、`http://localhost:3000/` にて内容が確認できる。

## npm script

### デバッグ用に、development server を起動する

```bash
npm run dev
```

### production ビルドする

```bash
npm run build
```

### production server を起動する(production ビルドしたものの配信)

```bash
npm run start
```

### テスト

```bash
npm run test
```

### テストで、スナップショットを更新する場合

```bash
npm run test:update
```

### 型検査

```bash
npm run type-check
```

### lint

```bash
npm run lint
```
