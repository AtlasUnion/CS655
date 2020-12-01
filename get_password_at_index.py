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


print(get_password_at_index(0)) # should get AAAAA
print(get_password_at_index(1)) # should get AAAAB
print(get_password_at_index(pow(52,5) - 1)) # should get zzzzz
print(get_password_at_index(pow(52,5) - 2)) # should get zzzzy