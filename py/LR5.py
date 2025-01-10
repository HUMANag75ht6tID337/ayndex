print('----- Задание 1 -----')
for i in range(-75, 81+1, 4) :
    print(i, end=' ')
print()
for i in range(81, -75-1, -4) :
    print(i, end=' ')
print()

##################################

print('----- Задание 2 -----')
m = input().split()
n=[]
cn = 0
mx = 0
for i in m :
    if int(i) %2 == 1 : cn += 1
    if int(i) > mx : mx = int(i)
mx = mx / 2
for i in m :
    if int(i) < mx :
        n.append(i)
for i in n :
    m.remove(i)
print(cn, n, m)
