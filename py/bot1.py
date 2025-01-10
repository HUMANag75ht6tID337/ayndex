import openpyxl as xl
from time import sleep
import os
import math

row = 2        ### нужна для цикла (номер рабочей строки)
end = False    ### нужна для цикла (конец цикла и выход из него при True)
prev = 0       ### нужна для цикла (предыдущее обратываемое значение)
counter = 0    ### нужна для цикла (счетчик)
years = []     ### года для сравнения
dollars = []   ### цена за 1 баррель нефти в долларах по годам
usdrub = []    ### курс доллара к рублю по годам
datastr = []   ### стоимость нефти в рублях по годам [год, цена в рублях]
rub = 0
now = 6029     ### средняя стоимость барелля за 2021 год в рублях (const)

data = xl.open(str(os.getcwd())+"\\data.xlsx", read_only=True)
sheet = data.active

while end != True:                         ### загрузка данных о годах из таблицы
	try:
		years.append(sheet[row][1].value)
		row += 1
		end = False
	except IndexError:
		end = True
		row = 2
		print("years loaded")
end = False
while end != True:                         ### загрузка данных о цене 1 барреля нефти в долларах по годам из таблицы
	try:
		dollars.append(sheet[row][2].value)
		row += 1
		end = False
	except IndexError:
		end = True
		row = 2
		print("dollars loaded")
end = False
while end != True:                         ### загрузка данных о курсе доллара к рублю по годам из таблицы
	try:
		usdrub.append(sheet[row][3].value)
		row += 1
		end = False
	except IndexError:
		end = True
		row = 2
		print("USD/RUB loaded")
end = False

miny = min(years, key=lambda i: int(i))
maxy = max(years, key=lambda i: int(i))

for y in years:
	for d in dollars[years.index(y):years.index(y)+1]:
		for r in usdrub[years.index(y):years.index(y)+1]:
			datastr.append([y, d, r])
for s in datastr:
	s.append(round(s[1]*s[2]))
	del s[1:3]

print("done")



### datastr[] теперь содержит данные о цене за баррель нефти в рублях по годам

### начало телеграм бота

import telebot as tg

yearsstring = "Choose any:\n"   ### переменная списка годов

### для упрощения вместо полного списка можно создать одну строку с минимальным и максимальным годом через тире (если есть все года в период с первого по последний)

for y in years:
	if y == prev+1:
		counter+=1
	prev = y
if counter == len(years)-1:
	yearsstring = yearsstring+str(miny)+"-"+str(maxy)
else:
	for y in years:
		yearsstring = yearsstring+str(y)+"\n"   ### если года идут с пропусками то отобразить их списком

bot = tg.TeleBot('5990513426:AAGQhta58Mw_c7Kp8F67vKjPLKGlRRbFXZ8')

@bot.message_handler(commands=['start'])
def send_hi(msg):
	bot.send_message(msg.chat.id, text="Hi\nI am a telegram bot\nI am here to help you calculate how less is ruble worth now :/\nEnter year and I show you how much we lost since then\nType /help for help\nType /info for more info")

@bot.message_handler(commands=['help'])
def send_help(msg):
	bot.send_message(msg.chat.id, text="Enter date in format: /year yyyy")

@bot.message_handler(commands=['info'])
def send_info(msg):
	bot.send_message(msg.chat.id, text="I am a poor bot {{(>_<)}} made by poor schooler (≧﹏≦) from Russia. \nMy creator ╰(￣ω￣ｏ) is a 16y boy living in Moscow ＜(^－^)＞who has made me with his team ◑﹏◐. \nHe ☜(ﾟヮﾟ☜) made an Excel tab with data for me (>///<)\n\nI can calculate how the ruble fell in price since year in my database\nAll you need is just send me /year and a year in plain text or type /years to get list of all years in database")

@bot.message_handler(commands=['years'])
def send_years(msg):
	bot.send_message(msg.chat.id, text=yearsstring)

@bot.message_handler(commands=['year'])
def send_years(msg):
	try:
		y = msg.text[6:]
		y = int(y)
		if y in years:
			for s in datastr:
				if y in s:
					rub = s[1]
			i = 1
			while math.trunc(6029/rub*i) == 0 : i*=10
			bot.send_message(msg.chat.id, text=str(math.trunc(6029.314/rub*i)/i)+" rubles")
		else:
			bot.send_message(msg.chat.id, text="not found in our database")
	except ValueError:
		bot.send_message(msg.chat.id, text="Year must be a rational number")
print("*****************")
print("*               *")
print("*    started    *")
print("*               *")
print("*****************")
bot.polling()

### конец
### не закрывать окно иначе все пойдет по 3.14