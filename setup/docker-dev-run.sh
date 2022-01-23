#!/bin/bash

cd `dirname $(cd $(dirname $0); pwd)`
source ./.env
docker run \
  -it \
  --rm \
  -v $(pwd):/app \
  -p 8080:8080 \
  -u $(id -u):$(id -g) \
  --name wasm_dev \
  $DEV_IMAGE_NAME \
  /bin/bash