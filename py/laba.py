import pickle
from datetime import datetime

def info_from_file():
    print("При загрузке CSV-файла учитывается только первое вхождение\n  номера строки во избежания конфликтов")
    global nom
    nom = -1
    eq = []
    data = open("equipment.csv", 'r+',encoding='utf-8')
    for i in data.readlines() :
        eq.append(i.split(sep=';'))
    a = {}
    for i in range(0, len(eq)) :
        fnom = int(eq[i].pop(0))
        if fnom in a : continue
        nom = max(nom, fnom)
        name = eq[i].pop(0)
        model = eq[i].pop(0)
        purchase_date = eq[i].pop(0)
        owner_str = eq[i].pop(0)
        state = eq[i].pop(0).replace('\n', '')
        a[fnom] = [f"{name}", f"{model}", f"{purchase_date}", f"{owner_str}", f"{state}"]
    data.close()
    return a
              
def show(equipment) :
    print('№'.ljust(4), 'Название'.ljust(12), 'Модель'.ljust(10), 'Дата покупки'.ljust(16), 'Владелец'.ljust(10), 'Состояние'.ljust(10))
    for i in equipment:
        print(str(i).ljust(4), str(equipment[i][0]).ljust(12), str(equipment[i][1]).ljust(10), str(equipment[i][2]).ljust(16), str(equipment[i][3]).ljust(10), str(equipment[i][4]).ljust(10))
    return 0



def add_equipment(equipment):
    global nom
    name = input("Введите название оборудования: ")
    for i in equipment :
        if equipment[i][0] == name:
            print("Оборудование с таким названием уже существует.")
            return equipment, nom

    model = input("Введите модель оборудования: ")
    while True:
        try:
            purchase_date_str = input("Введите дату приобретения (ГГГГ-ММ-ДД): ")
            purchase_date = datetime.strptime(purchase_date_str, "%Y-%m-%d").date()
            break
        except ValueError:
            print("Неверный формат даты. Пожалуйста, используйте формат ГГГГ-ММ-ДД.")
    owner_str = input("Введите владельца: ")
    state = input("Введите состояние оборудования: ")
    nom+=1
    equipment[nom] = [f"{name}", f"{model}", f"{purchase_date}", f"{owner_str}", f"{state}"]
    print("Оборудование добавлено.")
    return equipment, nom ### почему-то если я не возвращаю его обратно в глобал оно не работает, хотя должно просто за счет global nom (если я правильно понял)
                                                                                                                            ###   
                                                                                                                            ###    если принтить значения то
                                                                                                                            ###    они как бы сохраняются но
                                                                                                                            ###    почему то без print(nom) не работает
                                                                                                                            ###
                                                                                                                            ###             (я нубас)
                                                                                                                            ###                                        

def delete_equipment(equipment):
    global nom
    name = input("Введите название оборудования для удаления: ")
    for i in equipment :
        if equipment[i][0] == name:
            equipment.pop(i)
            print("Оборудование удалено.")
            return equipment
    print("Оборудование не найдено.")
    return equipment

def modify_equipment(equipment):
    name = input("Введите название оборудования для изменения: ")
    for i in equipment :
        if equipment[i][0] == name:
            print("Текущие данные: ")
            show({f"{i}": equipment[i]})
            while True:
                field = input("Введите поле для изменения (или ничего для отмены): ")
                if field.lower() in ["модель", "дата покупки", "состояние", "владелец", "название"]:
                    if field.lower() == "название":
                        new_value = input(f"Введите новое значение для {field.upper()}: ")
                        equipment[i][0] = new_value
                    if field.lower() == "модель":
                        new_value = input(f"Введите новое значение для {field.upper()}: ")
                        equipment[i][1] = new_value
                    if field.lower() == "дата покупки":
                        while True:
                            try:
                                new_value = input(f"Введите новое значение для {field.upper()}: ")
                                new_value = datetime.strptime(new_value, "%Y-%m-%d").date()
                                break
                            except ValueError:
                                print("Неверный формат даты. Пожалуйста, используйте формат ГГГГ-ММ-ДД.")
                        equipment[i][2] = new_value
                    if field.lower() == "владелец":
                        new_value = input(f"Введите новое значение для {field.upper()}: ")
                        equipment[i][3] = new_value
                    if field.lower() == "состояние":
                        new_value = input(f"Введите новое значение для {field.upper()}: ")
                        equipment[i][4] = new_value
                    print("Данные изменены.")
                    break
                elif field == "" or field.replace(' ', '') == '':
                    break
                else:
                    print("Неверное поле.")
            return equipment
    print("Оборудование не найдено.")
    return equipment



def search_equipment(equipment):
    m = ["название", "модель", "дата покупки", "владелец", "состояние"]
    try :
        search_field = m.index(input("Введите поле для поиска: ").lower())
    except ValueError :
        search_field = 0
    search_term = input("Введите подстроку для поиска: ")
    results = []
    for i in equipment :
        if search_term in str(equipment[i][search_field]) :
            results.append(i)

    if results:
        print("Результаты поиска:")
        for n in results:
            print(f"Поле: {m[search_field].upper()}, Совпадение: {equipment[n][0]} - {equipment[n][search_field]}")
    else:
        print("Оборудование не найдено.")



def filter_by_date(equipment):
    while True:
        try:
            date_str = input("Введите дату (ГГГГ-ММ-ДД): ")
            date = datetime.strptime(date_str, "%Y-%m-%d").date()
            break
        except ValueError:
            print("Неверный формат даты. Пожалуйста, используйте формат ГГГГ-ММ-ДД.")
    print("Оборудование, приобретенное после указанной даты:")
    m = {}
    for i in equipment :
        if date < datetime.strptime(equipment[i][2], "%Y-%m-%d").date() :
            m[i] = equipment[i]
    show(m)



def change_equipment_state(equipment):
    name = input("Введите название оборудования: ")
    for i in equipment :
        if name == equipment[i][0] :
            new_state = input("Введите новое состояние: ")
            equipment[i][4] = new_state
            print("Состояние оборудования изменено.")
            return equipment
    print("Оборудование не найдено.")
    return equipment



def sort_equipment(equipment):
    a = {}
    b = {}
    m = ["название", "модель", "дата покупки", "владелец", "состояние"]
    try :
        sort_field = m.index(input("Введите поле для сортировки (по умолчанию №): ").lower())
    except ValueError :
        sort_field = "id"
    if sort_field == "id" :
        for i in sorted(equipment) :
            a[i] = equipment[i]
        show(a)
        return a
    for i in equipment :
        a[i] = equipment[i][sort_field]
    b = {k: v for k, v in sorted(a.items(), key=lambda item: item[1])}
    a = {}
    for i in b.keys() :
        a[i] = equipment[i]
    show(a)
    return a



def save_equipment(equipment, filename="equipment.dat"):
    with open(filename, "wb") as f:
        pickle.dump(equipment, f)
        f.close()
        print("Данные сохранены.")

def load_equipment(equipment, filename="equipment.dat"):
    with open(filename, "rb") as f:
        equipment = pickle.load(f)
        f.close()
        print("Данные загружены.")
        return equipment



def print_menu():
    print("\nМеню:")
    print("1. Вывести оборудование")
    print("2. Добавить оборудование")
    print("3. Удалить оборудование")
    print("4. Изменить данные об оборудовании")
    print("5. Найти оборудование")
    print("6. Отфильтровать по дате")
    print("7. Изменить состояние оборудования")
    print("8. Отсортировать оборудование")
    print("9. Сохранить данные в .dat-файл")
    print("10. Загрузить данные из .dat-файла")
    print("0. Выход")

def main():
    equipment = info_from_file()

    while True:
        print_menu()
        choice = input("Выберите действие: ")
        if choice == "1":
            show(equipment)
        elif choice == "2":
            equipment, nom = add_equipment(equipment)
        elif choice == "3":
            equipment= delete_equipment(equipment)
        elif choice == "4":
            equipment = modify_equipment(equipment)
        elif choice == "5":
            search_equipment(equipment)
        elif choice == "6":
            filter_by_date(equipment)
        elif choice == "7":
            equipment = change_equipment_state(equipment)
        elif choice == "8":
            equipment = sort_equipment(equipment)
        elif choice == "9":
            save_equipment(equipment)
        elif choice == "10":
            equipment = load_equipment(equipment)
        elif choice == "0":
            break
        else:
            print("Неверный выбор.")


main()