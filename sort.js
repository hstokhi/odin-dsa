
function mergeSort(array) {
        if (array.length < 2) {
            return array;
        }
        else {
            let mid = Math.floor(array.length/2);
            let left = mergeSort(array.slice(0, mid));
            let right = mergeSort(array.slice(mid));
            return merge(left, right);
    
        }
}
    
    
function merge(l, r, result = []) {
        const both = l.length + r.length;
    
        for (let i = 0; i < both; i++) {
            if (l.length == 0) {
                return result.concat(r);
            }
            if (r.length == 0) {
                return result.concat(l);
            }
        
            if (l[0] < r[0]) {
                result.push(l.shift());
    
            } else { 
                result.push(r.shift());
            }
        }
    
        return result;
}

function removeDuplicates(array, acc = []) {
/*    if (array.length < 1) { return acc }
    if (acc.includes(array[0])) { 
        //console.log(array, acc); 
        removeDuplicates(array.slice(1), acc) 
    }
    else { 
        acc.push(array[0]);
        //console.log(array, acc); 
        removeDuplicates(array.slice(1), acc);
    }
    return acc;
*/
    for (let i = 0; i < array.length; i++) {
        if (!acc.includes(array[i])) {acc.push(array[i])}
    }
    return acc;    
}

export { mergeSort, removeDuplicates }