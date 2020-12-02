import math

# return char associated with the index
# index 0 -> A, index 1 => B ... index 51 => z
def helper(char_index):
    if (char_index <= 25):
        return chr(char_index + 65)
    else:
        return chr(char_index - 26 + 97)

# get 5 char password at index out of 52^5 -1 indexes
# this version is without loop but one can implement the following code with a loop
def get_password_at_index(index):
    first_char_index = index % 52
    second_char_index = math.floor((index % pow(52,2))/52)
    third_char_index = math.floor((index % pow(52,3))/pow(52,2))
    fourth_char_index = math.floor((index % pow(52,4))/pow(52,3))
    fifth_char_index = math.floor((index % pow(52,5))/pow(52,4))
    first_char = helper(first_char_index)
    second_char = helper(second_char_index)
    third_char = helper(third_char_index)
    fourth_char = helper(fourth_char_index)
    fifth_char = helper(fifth_char_index)

    final_string = fifth_char + fourth_char + third_char + second_char + first_char
    return final_string


# print(get_password_at_index(0)) # should get AAAAA
# print(get_password_at_index(1)) # should get AAAAB
# print(get_password_at_index(pow(52,5) - 1)) # should get zzzzz
print(get_password_at_index(95051009*3)) # should get zzzzy

def increment_string(string):
    char_list = list(string)
    mapped_to_num_list = []
    for char in char_list:
        if ((ord(char) >= 65) and (ord(char) <= 90)):
            mapped_to_num_list.append(ord(char)-65)
        else:
            mapped_to_num_list.append(ord(char)-97+26)
    carry = 1
    for i in range(len(mapped_to_num_list)-1, -1, -1):
        mapped_to_num_list[i] = mapped_to_num_list[i] + carry
        if (mapped_to_num_list[i] > 51):
            carry = 1
            mapped_to_num_list[i] = 0
        else:
            carry = 0
    final_string_char_list = []
    for num in mapped_to_num_list:
        if ((num >= 0) and (num <= 25)):
            final_string_char_list.append(chr(num + 65))
        else:
            final_string_char_list.append(chr(num -26  + 97))
    return "".join(final_string_char_list)

# print(increment_string("AAAzz"))