cad = '/validate&fer'

p = cad.index('&')
function = cad[1:p]
user = cad[p+1:len(cad)]

print(function)
print(user)
