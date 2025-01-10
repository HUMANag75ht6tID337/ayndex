from time import sleep
code = "A8 42 0 62 64 CA AA E7 EC 11 44 72 4A 43 CA 3A 3D 8B DB 57 9F 3B F4 FC 9E D6 5A 6D CE E4 5F C0 F end"
decode = []
result = []
num = []
res = 0
prev = 1
for word in code:
	if word != " ":
		try:
			num.append(int(word))
		except ValueError:
			if word == "A":
				num.append(10)
			if word == "B":
				num.append(11)
			if word == "C":
				num.append(12)
			if word == "D":
				num.append(13)
			if word == "E":
				num.append(14)
			if word == "F":
				num.append(15)
	else:
		print(list(reversed(num)))
		result.append(list(reversed(num)))
		num = []
for n in result:
	for i in n:
		print(i, ' ', n.index(i))
		if n.index(i) == prev:
			res += i*(16**(n.index(i)+1))
		else:
			res += i*(16**n.index(i))
		prev = n.index(i)
	decode.append(res)
	res = 0
print(decode)
sleep(50)