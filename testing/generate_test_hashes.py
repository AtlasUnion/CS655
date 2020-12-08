import random
import string
from hashlib import md5
import base64


# adapted from: https://pynative.com/python-generate-random-string/

# 1000 passwords
passwords =[]

def get_random_string(length):
    letters = string.ascii_lowercase + string.ascii_uppercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    passwords.append( "A" + result_str)


for i in range(1000):
	get_random_string(4)

#print(passwords)

# and 1000 hashes
hashes = []

for i in range(len(passwords)):
	pwd_bytes = passwords[i].encode('utf-8')
	pw_hash = md5(pwd_bytes).digest()
	pw_hash64 = base64.b64encode(pw_hash)
	hashes.append(str(pw_hash64.decode('utf-8')))



with open('hashes1000.txt', 'w') as f:
	for i in range(len(passwords)):
		f.write(str(i) +') PW: ' + passwords[i] + '   HASH: ' + hashes[i] + '\n')

#print('1000 HASH LIST')
print()
#print(hashes)
#print('\n\n\n\n')
print('100 HASH LIST')
print()
print(hashes[:100])
print()


