#!/bin/bash
# Gets version from package.json
# Version key/value should be on its own line
PACKAGE_VERSION=$(grep version < package.json \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

# Insert version to version.manifest file
echo $PACKAGE_VERSION > dist/version.manifest
