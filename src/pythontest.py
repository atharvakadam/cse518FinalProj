
arr = [-4, -3, 0, 1, 2, 5]

# O(n)
for i in range(len(arr)):
    arr[i] = arr[i]**2

arr.sort() #O(nlogn)

left = 0
right = len(arr) - 1
while left < right:
    if abs(left) > abs(right):
        temp = arr[left]
        arr[left] = arr[right] ** 2
        arr[right] = temp ** 2
        left += 1
    else:
        arr[right] = arr[right]**2
        right -= 1

# [0 1 4 9 16 25]