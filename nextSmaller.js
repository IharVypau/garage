
function fac(n){
    return(n<1)?1:fac(n-1)*n;
}

function nextSmaller(n) {
  let str=n.toString();
  let source=str.split('');// массив ещё не задействованных элементов
  let elemCount=str.length;//количесво эдементов
  let resIdexArr;
  const repNumber=fac(elemCount);
  const groupNumber=fac(elemCount-1);
  let results=[];
  let el;
  for(let i=0;i<repNumber;i++){
    results[i]=[];
    for(let j=elemCount;j>0;j--){
      resIdexArr=Math.floor(i/fac(j-1))%j;
      el=source.splice(resIdexArr,1);
     results[i].push(el[0]);
    //console.log(results[i]);  
    }
    //console.log(results[i]);
    source=results[i].slice(0);
    results[i]=results[i].join('');
   
  }
//  return results; ...
}
 // console.log(nextSmaller(970));
