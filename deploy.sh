#!/usr/bin/env bash
set -e

cd GridGuesser
npm ci
npm run build
cd ..

BUCKET=gridguesser-app
echo "Syncing ./GridGuesser/dist → s3://$BUCKET"
aws s3 sync GridGuesser/dist s3://"$BUCKET" \
  --delete \
  --acl public-read

CF_ID=E2TTR3UXR8AD08
echo "Invalidating CloudFront distribution $CF_ID"
aws cloudfront create-invalidation \
  --distribution-id "$CF_ID" \
  --paths "/*"

echo " Deployment complete."


