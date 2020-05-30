import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  }
};

const BASE_URL = 'http://localhost:3003/api/product/400/reviews';

export default () => {
  let getReq = http.get(BASE_URL);

  // check(getReq, { 'hello': (resp) =>{ console.log(resp.body === 'hello'); }});

  // check(getReq, { 'hello': (resp) =>{ console.log(resp.body === resp.body); }});

  check(getReq, { 'hello': (resp) =>{ resp.body === resp.body; }});

  sleep(1);
};
