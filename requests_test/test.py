import requests
payload = {'key1': 'value1', 'key2': 'value2'}
#r = requests.get('http://httpbin.org/get', params=payload)
r = requests.get('http://localhost:8000')
print(r.url)
print(r.text)

#r = requests.get('https://api.github.com/events')
#print(r.url)
#print(r.text)
