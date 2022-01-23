# Julia Set

発表資料用に作成。  
WebAssemblyを用いてジュリア集合を計算し、Canvasに描画するアプリケーションです。  
パフォーマンス比較用にJavaScript(TypeScript)でも同様の実装を行っています。  

環境構築用に、以下ファイルを用意しています。
  * `setup/docker-dev-build.sh` … 開発用イメージの作成、引数でイメージ名を指定。
  * `setup/docker-dev-run.sh` … 開発用コンテナの起動。
  * `setup/docker-prod-build.sh` … 実行用イメージの作成、引数でイメージ名を指定。
  * `setup/docker-prod-run.sh` … 実行用コンテナの起動。

Ubuntu 20.04.3(WSL2)環境でのみ動作確認を行っています。必要に応じて内容を調整してください。  

※ 動作確認方法  

以下を実行後、ブラウザで [`http://localhost`](http://localhost) にアクセスし、動作を確認してください。
```sh
bash /project_path/setup/docker-prod-build.sh wasm
bash /project_path/setup/docker-prod-run.sh
```

## ソースについて
このプロジェクトは [`rust-webpack-template`](https://github.com/rustwasm/rust-webpack-template) を使用して作成しています。  

また、実装に関して、以下を参考にさせていただいています。  
* 鈴木 圭. “Canvas のピクセル操作 API でフラクタル図形を描く”. TECHSCORE BLOG. 2012/10/15. https://www.techscore.com/blog/2012/10/15/drawing-fractals/, (参照 2022/01/23)  
* 石立 喬. “ジュリア集合の色付けを工夫して芸術的なフラクタル図形を描く”. CodeZine. 2006/02/03. https://codezine.jp/article/detail/310, (参照 2022/01/23)  

## 開発環境で使用可能なコマンド

### 依存パッケージのインストール

```sh
npm install
```

### 開発モードで起動
プロジェクトに変更が入ると自動的にビルド/リロードが実行されます。  
[`http://localhost:8080`](http://localhost:8080) にアクセスし、動作を確認してください。
```sh
npm start
```

### リリースモードでビルド
プロジェクトをビルドし、`dist`フォルダに配置します。

```sh
npm run build
```