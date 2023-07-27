#!/bin/bash

export JWT_ISSUE_TIME=$(date +%s)
export TEAM_ID=<Your ID HERE>
export AUTH_KEY_ID=<AUTH_KEY_ID>
export JWT_HEADER=$(printf '{ "alg": "ES256", "kid": "%s" }' "${AUTH_KEY_ID}" | openssl base64 -e -A | tr -- '+/' '-_' | tr -d =)
export JWT_CLAIMS=$(printf '{ "iss": "%s", "iat": %d }' "${TEAM_ID}" "${JWT_ISSUE_TIME}" | openssl base64 -e -A | tr -- '+/' '-_' | tr -d =)
export JWT_HEADER_CLAIMS="${JWT_HEADER}.${JWT_CLAIMS}"
export TOKEN_KEY_FILE_NAME=<PATH_TO_P8_FILE>
export JWT_SIGNED_HEADER_CLAIMS=$(printf "${JWT_HEADER_CLAIMS}" | openssl dgst -binary -sha256 -sign "${TOKEN_KEY_FILE_NAME}" | openssl base64 -e -A | tr -- '+/' '-_' | tr -d =)
export AUTHENTICATION_TOKEN="${JWT_HEADER}.${JWT_CLAIMS}.${JWT_SIGNED_HEADER_CLAIMS}"
export DEVICE_TOKEN=<DEVICE_TOKEN>
export APNS_HOST_NAME=api.sandbox.push.apple.com
export BUNDLE_ID=<BUNDLE_ID>
export TIME_STAMP=$(date +%s)
export END_TIME=$(date -d "@$(($TIME_STAMP + 20))" +%s)


echo "JWT ISSUE TIME: $JWT_ISSUE_TIME"
echo "Team ID: $TEAM_ID"
echo $AUTH_KEY_ID
echo "JWT HEADER $JWT_HEADER"
echo $JWT_CLAIMS
echo $JWT_HEADER_CLAIMS
echo "FILE PATH: $TOKEN_KEY_FILE_NAME"
echo $JWT_SIGNED_HEADER_CLAIMS
echo $AUTHENTICATION_TOKEN
echo "DEVICE TOKEN $DEVICE_TOKEN"
echo $TIME_STAMP
echo $END_TIME

curl -v \
--header "apns-topic:$BUNDLE_ID.push-type.liveactivity" \
--header "apns-push-type:liveactivity" \
--header "authorization: bearer $AUTHENTICATION_TOKEN" \
--data '{"aps": {
   "timestamp":1690441321,
   "event": "update",
   "content-state": {
      "title": "Go to Gate A25",
      "description": "Tap here 123"
    },
   "alert": {
      "title": "Track Update",
      "body": "Tony Stark is now handling the delivery!"
   }
}}' \
--http2 \
"https://$APNS_HOST_NAME/3/device/$DEVICE_TOKEN"
