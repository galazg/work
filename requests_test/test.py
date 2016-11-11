import requests
#payload = {'key1': 'value1', 'key2': 'value2'}
#r = requests.get('http://httpbin.org/get', params=payload)
#r = requests.get('http://localhost:8000')
# r = requests.post('http://httpbin.org/post', data = {'key':'value'})


pcoin_contract_address = '0x8dc03da3c476926e620fc9efd4c6137a02417354'
fer =  '0x14c1b2ed09229c2df7c04ec92115ece6d1eabe73'
jon = '0x50dad339ff9cf7e31cf2de1ea55ef54ca29b346c'
user_address = fer
rpc_data = '0x207c64fb000000000000000000000000' + user_address[2:len(user_address)]

print('Contract at: '+pcoin_contract_address)
print('Validate user:' + user_address)

data = '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "' + pcoin_contract_address + '", "data": "'+ rpc_data +'"}, "latest"],"id":1}'
r = requests.post('http://localhost:8001', data=data)

#r = requests.post('http://localhost:8001', data = {"jsonrpc":"2.0","method":"eth_call","params":[{"to": "0x8dc03da3c476926e620fc9efd4c6137a02417354", "data": "0x207c64fb00000000000000000000000014c1b2ed09229c2df7c04ec92115ece6d1eabe73"}, "latest"],"id":1})
#curl localhost:8001 -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "0x8dc03da3c476926e620fc9efd4c6137a02417354", "data": "0x207c64fb00000000000000000000000014c1b2ed09229c2df7c04ec92115ece6d1eabe73"}, "latest"],"id":1}'

print(r.url)
print(r.text)

result = r.text[len(r.text)-4]
print('RightsLevel: ' + result)


#r = requests.get('https://api.github.com/events')
#print(r.url)
#print(r.text)
