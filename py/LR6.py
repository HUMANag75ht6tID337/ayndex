# -- ввод такого текста с клавиатуры :/
s = input().split()
# -- пункт б
s.remove(s.pop())
s = list(map(lambda x: x[:(len(x)//2)]+x[(len(x)//2+1):] if len(x)%2==1 else x, s))
print(s)
