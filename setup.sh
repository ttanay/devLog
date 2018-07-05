#!/bin/bash

ABSOLUTEPATH=$(dirname $(readlink -f $0))

sudo echo "alias devlog='node $ABSOLUTEPATH/app.js'" >> ~/.bash_aliases
. ~/.bash_aliases
