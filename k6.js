import http from 'k6/http';
import {sleep} from 'k6';

export default function() {
  const id = Math.floor(Math.random() * 1000001);
  http.get(`http://localhost:3002/api/product/${id}/reviews`);
  // http.get('http://localhost:3002/hi');
  sleep(0.01);
}