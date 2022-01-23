#!/bin/bash

if [ $# != 1 ]; then
    echo 開発用イメージ名を指定してください
    exit 1
fi

cd `dirname $(cd $(dirname $0); pwd)`
docker build \
  --target developer \
  --build-arg NODE_VERSION=16.x \
  --build-arg UID=$(id -u) \
  --build-arg UNAME=$(id -un) \
  --build-arg GID=$(id -g) \
  --build-arg GNAME=$(id -gn) \
  -t $1 .
echo "DEV_IMAGE_NAME=$1" >> .env