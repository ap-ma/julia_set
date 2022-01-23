#!/bin/bash

if [ $# != 1 ]; then
    echo 本番用イメージ名を指定してください
    exit 1
fi

cd `dirname $(cd $(dirname $0); pwd)`
docker build -t $1 .
echo "PROD_IMAGE_NAME=$1" >> .env