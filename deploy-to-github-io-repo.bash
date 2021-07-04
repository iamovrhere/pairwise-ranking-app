#/bin/bash
# Builds and copies the build over the iamovrhere.github.io repo
# for demoing.
set -e

SCRIPT_DIR=$(cd "$( dirname "$0" )" && pwd)
APP="pairwise-ranking-app"
DST_DIR="$SCRIPT_DIR/../iamovrhere.github.io/$APP"

PUBLIC_URL="https://iamovrhere.github.io/$APP/" yarn build
rm -rf $DST_DIR/*
cp -r build/* $DST_DIR/

[[ -z "$1" ]] && echo "Skipping commit" && exit || true

cd $DST_DIR
BRANCH="iamovrhere/${APP}-release-$(date +"%Y%m%d")"
git checkout $BRANCH || git checkout -b $BRANCH
git add . && git commit -m "$1"

echo "Commit ready to be reviewed, merged, and push!"
