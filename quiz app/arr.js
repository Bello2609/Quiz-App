
    let arr = [10, 11, 14, 15, 16, 17, 18];

// console.log(Math.max.apply(null, arr));
let max_value = arr[0];
for (let i = 0; i < arr.length; i++) {
    const current_value = arr[i];
    if(current_value > max_value){
        max_value = current_value;
        
    }
   
    
}