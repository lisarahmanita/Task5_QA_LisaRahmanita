import http from 'k6/http';
import { check, sleep, group } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
const URL = 'https://reqres.in'

export const options = {
    vus: 1000,
    iterations: 3500,
    thresholds: {
        http_req_duration: ['avg < 2000'], // response API max 2s
        http_req_failed: ['rate < 0.1'], 
        },
    
    };
    export default function (){
        group('API Create with valid request', function(){
            const URL_PARAMS = URL + '/api/users';
            const payload = JSON.stringify({
                name : 'morpheus', 
                job :  'leader'
            })
            const params = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            let res = http.post(URL_PARAMS, payload, params);
    
            check (res, {
                'response code was 201': (res) => res.status == 201,
            });
        });
        sleep(1);
    
        group('API Update with valid request', function(){
            const URL_PARAMS = URL + '/api/users/2';
            const payload = JSON.stringify({
                name : 'morpheus', 
                job :  'zion resident'
            })
            const params = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            let res = http.put(URL_PARAMS, payload, params);
    
            check(res, {
                'response code was 200': (res) => res.status == 200,
                });  
        });
        sleep(1);
    }
    export function handleSummary(data) {
        return {
          "PostandPutPerformanceReport.html": htmlReport(data),
        };
      }
      