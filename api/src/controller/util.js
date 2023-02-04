const newTiposTemp= (array)=>{
    const newTemperamento=[];
    while (array.length > 0) {
        let newArray=array.shift()
        if (newArray) {
            while (newArray.length > 0) {
                let newArray3=newArray.shift()
                if (!newTemperamento.includes(newArray3)) {
                    newTemperamento.push(newArray3)
                }
            }
        }
    }
    return newTemperamento.sort()
}

module.exports={
    newTiposTemp
}