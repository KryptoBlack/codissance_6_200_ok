#!/bin/sh

curl "localhost:5555/api/mint/polygon" \
    -H "content-type: application/json" \
    -H "cookie: token=82f152c025bef19ed1cd773830e280857ea15df007fa4732d662332afa65fdf0d412fbe5282b417c7d4a40735b58423973e828ed0eb1cfa5b5d49e7574738815858956f685e722b27aa78883950c8c21181a5253f8ffd38b40bc9df3441760cb7f42ac58d7348a4beb0273d0721c18afdf64d7cb4559eced8b06e78c79cd2aa6" \
    --data '{
        "eid": "townscript-run-for-rivers",
        "recipient": "0xcBA7AAc651048Dde816c47F496aB598AF4b17eD1"
    }'