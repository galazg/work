import requests
#payload = {'key1': 'value1', 'key2': 'value2'}
#r = requests.get('http://httpbin.org/get', params=payload)
#r = requests.get('http://localhost:8000')
# r = requests.post('http://httpbin.org/post', data = {'key':'value'})
import time


while True:

    r = requests.get('http://35.160.136.196:8084/reset&mike')
    print(r.text)
    time.sleep(5) # delays for 5 seconds

#r = requests.post('http://localhost:8001', data = {"jsonrpc":"2.0","method":"eth_call","params":[{"to": "0x8dc03da3c476926e620fc9efd4c6137a02417354", "data": "0x207c64fb00000000000000000000000014c1b2ed09229c2df7c04ec92115ece6d1eabe73"}, "latest"],"id":1})
#curl localhost:8001 -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "0x8dc03da3c476926e620fc9efd4c6137a02417354", "data": "0x207c64fb00000000000000000000000014c1b2ed09229c2df7c04ec92115ece6d1eabe73"}, "latest"],"id":1}'



#r = requests.get('https://api.github.com/events')
#print(r.url)
#print(r.text)
