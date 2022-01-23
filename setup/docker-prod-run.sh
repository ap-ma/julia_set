#!/bin/bash

cd `dirname $(cd $(dirname $0); pwd)`
source ./.env
docker run \
  -it \
  --rm \
  -p 80:80 \
  --name wasm_prod \
  $PROD_IMAGE_NAME