# Go, Next.jsサンプルアプリ
Go(バックエンド)とNext.jsを使ってTwitter風のサンプルアプリを作成  
<div><video controls src="https://user-images.githubusercontent.com/88636666/196084074-138df647-0194-49aa-9d3f-cdf3006d4fcd.mp4"></video></div>

Heroku + Vercelでデプロイしたデモ  
https://next-sample-kappa-lime.vercel.app

## 使用技術
- Typescript
- Tailwind.css

## 機能一覧
- Cookieによるユーザー認証(JWT)
- ツイート機能
- フォロー機能
- タイムライン機能
- ページネーション機能

## 追加情報
- タイムラインはuseSWRを使いクライアント側で表示
- User一覧、Tweet一覧はgetServerSidePropsで表示
- バックエンドのレポジトリ(Go)
https://github.com/ikeda1729/fiber-sample