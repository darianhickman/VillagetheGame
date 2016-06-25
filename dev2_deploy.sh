#!/bin/bash
./compile.sh
cp config-dev.yaml config.yaml 

if [ "$APPCFG" = "" ]; then
    if which appcfg.py; then
        APPCFG=appcfg.py
    else
        APPCFG=/Users/darianhickman/google-cloud-sdk/platform/google_appengine/appcfg.py

    fi
fi

./synclibs.sh
$APPCFG update --application=villagegamedev2 --oauth2 . 2>&1 | grep -v 'Cannot upload both <filename>\.py and <filename>\.pyc' | grep -v 'Could not guess mimetype for'
