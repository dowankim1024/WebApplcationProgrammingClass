//undefined => "값"
//[1, undefine], [undefine, 1]
type Order = 'asc' | 'desc';
export function simpleSort(arr: number[], order: Order = 'asc'): number[] {

    const sortedArr: number[] = [...arr];
    const isAsc: boolean = order === 'desc';
    for (let i = 0; i < sortedArr.length - 1; i++) {
        for (let j = 0; j < sortedArr.length - i - 1; j++) {
            const left = sortedArr[j]!;
            const right = sortedArr[j + 1]!;
            const needSwap = isAsc ? left < right : left > right;
            if (needSwap) {
                [sortedArr[j], sortedArr[j + 1]] = [right, left];
            }
        }
    }
    return sortedArr;
}