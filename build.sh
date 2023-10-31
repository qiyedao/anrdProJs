#!/bin/bash
rm -rf ./dist
rm -rf dist.zip
echo $(pwd)
pnpm run build
bz c  ./dist.zip ./dist
explorer .
