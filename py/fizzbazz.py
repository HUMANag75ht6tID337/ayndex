from time import sleep
for i in range(1, 100) :
	if i % 3 == 0 :
		if i % 5 == 0 :
			print("FizzBazz")
		else : 
			print("Fizz")
	else :
		if i % 5 == 0 :
			print("Bazz")
		else : 
			print(i)
sleep(100)
