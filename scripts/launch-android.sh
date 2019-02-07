#!/bin/bash

EMULATOR_HOME=~/Library/Android/sdk/emulator
AVD_NAME=`${EMULATOR_HOME}/emulator -list-avds | head -n 1`

if [ $# -gt 0 ]; then
  AVD_NAME=$1
  shift
fi

pushd ${EMULATOR_HOME} > /dev/null
./emulator -avd ${AVD_NAME} $* &
popd > /dev/null

react-native run-android
