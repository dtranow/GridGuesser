#!/usr/bin/env bash

BUCKET=gridguesser-access-logs

aws s3api put-bucket-encryption \
  --bucket "$BUCKET" \
  --server-side-encryption-configuration '{
    "Rules":[
      {
        "ApplyServerSideEncryptionByDefault":{
          "SSEAlgorithm":"AES256"
        }
      }
    ]
  }'

