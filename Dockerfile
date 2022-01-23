# 開発ステージ
FROM rust:1.57 as developer

ARG NODE_VERSION=16.x
ARG UID=1000
ARG UNAME=julia
ARG GID=${UID}
ARG GNAME=${UNAME}

RUN apt-get update && apt-get install -y curl
RUN groupadd -g ${GID} ${GNAME} && useradd -u ${UID} -g ${GNAME} -om ${UNAME}

# wasm ビルド タスクランナー
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# PPAでnode.jsを導入 (nodeでなくnodejsとなるので注意)
RUN curl -sL https://deb.nodesource.com/setup_${NODE_VERSION} | bash && \
  apt-get install -y nodejs

WORKDIR /app

# ビルドステージ
FROM developer as builder
COPY . .
RUN npm ci && npm run build

# 本番ステージ
FROM nginx:1.21.5-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]