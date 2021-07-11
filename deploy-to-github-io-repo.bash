#/bin/bash
# Builds and copies the build over the iamovrhere.github.io repo
# for demoing.
set -e

SCRIPT_DIR=$(cd "$( dirname "$0" )" && pwd)
APP="pairwise-ranking-app"
DST_DIR="$SCRIPT_DIR/../iamovrhere.github.io/$APP"

PUBLIC_URL="/$APP/" yarn build
rm -rf $DST_DIR/*
cp -r build/* $DST_DIR/

[[ -z "$1" ]] && echo "Skipping commit" && exit || true

# Tag current repo before leaving. Tagged in UTC.
git tag -a $(date -u +"%Y%m%d-%H%M") -m "$1"

cd $DST_DIR
BRANCH="iamovrhere/${APP}-release-$(date +"%Y%m%d-%H%M")"
git checkout $BRANCH || git checkout -b $BRANCH
git add . && git commit -m "$1"

echo "Commit ready to be reviewed, merged, and push!"
