#!/bin/bash

cd $USER_DIR

yarn cache clean
NODE_ENV=development yarn install
yarn add "statusfy@$STATUSFY_VERSION"

npx statusfy build
npx statusfy start
