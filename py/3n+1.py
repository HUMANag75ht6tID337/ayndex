from time import sleep

a = 12342
ii = 0
consume = 0
s = 1000000000001
highestval = 0
highestnum = 0

def EvOrOdd(number) :
	if number%2 == 0 :
		return True
	else :
		return False

for i in range (s) :
	if i > 4 :
		a = i
		ii = 0
		while a != 1 :
			if EvOrOdd(a) :
				a /= 2
				#print(i, a)
				ii += 1
			else :
				a = a*3+1
				#print(i, a)
				ii += 1
				if a > highestval :
					highestval = a
					highestnum = i
		print("NUMBER ", i, " DONE IN ", ii, " STEPS")
		consume += 1
if consume == s - 5 :
	print("NUBERS DONE: ", s, " HIGHEST VALUE: ", highestval, "REACHED ON: ", highestnum)
else :
	print(s - 5 - consume, " TROUBLE(s)")

sleep(100)