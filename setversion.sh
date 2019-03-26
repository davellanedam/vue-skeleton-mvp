#!/bin/bash
# Gets version from package.json
# Version key/value should be on his own line
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

# Insert version to version.manifest file
echo $PACKAGE_VERSION > dist/version.manifest
