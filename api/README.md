# trueblocks api

Instructions:

```
cd api
npm install
npm run dev
```

The API expects an array of JSON. Here is an example of the POST request data the application expects.

```javascript
[{
    "blockNumber": "2010110",
    "txIndex": "10",
    "traceId": "1",
    "address": "0xbfec54132780398423cdb7d27c1ec8e43f332050",
    "reason": "garbage"
  },
  {
    "blockNumber": "33333333",
    "txIndex": "10",
    "traceId": "1",
    "address": "0xbfec5413d2780398423cdb7d27c1ec8e43f332050",
    "reason": "garbage5"
  }]
```

I will give 2 examples of how this data can be POSTed from an application.

cURL:

```sh
curl -X POST \
  http://localhost:8000 \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: e4a7ac26-12d3-46cf-8746-546761779bec' \
  -d '[{
    "blockNumber": "2010110",
    "txIndex": "10",
    "traceId": "1",
    "address": "0xbfec541d2780398423cdb7d27c1ec8e43f332050",
    "reason": "garbage"
  },
  {
    "blockNumber": "33333333",
    "txIndex": "10",
    "traceId": "1",
    "address": "0xbfec541d2780398423cdb7d27c1ec8e43f332050",
    "reason": "garbage5"
  }]'
```



Libcurl:

```c
CURL *hnd = curl_easy_init();

curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "POST");
curl_easy_setopt(hnd, CURLOPT_URL, "http://localhost:8000");

struct curl_slist *headers = NULL;
headers = curl_slist_append(headers, "Postman-Token: 984a5ef1-b321-4840-81d0-0eb74ef47ee1");
headers = curl_slist_append(headers, "Cache-Control: no-cache");
headers = curl_slist_append(headers, "Content-Type: application/json");
curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);

curl_easy_setopt(hnd, CURLOPT_POSTFIELDS, "[{\n    \"blockNumber\": \"2010110\",\n    \"txIndex\": \"10\",\n    \"traceId\": \"1\",\n    \"address\": \"0xbfec541d2780398423cdb7d27c1ec8e43f332050\",\n    \"reason\": \"garbage\"\n  },\n  {\n    \"blockNumber\": \"33333333\",\n    \"txIndex\": \"10\",\n    \"traceId\": \"1\",\n    \"address\": \"0xbfec541d2780398423cdb7d27c1ec8e43f332050\",\n    \"reason\": \"garbage5\"\n  }]");

CURLcode ret = curl_easy_perform(hnd);
```
