
  const getElementsByid=id=>{
    let tempArr=[];
    let arrTags=[];
    Array.from(document.querySelectorAll(`[id=${id}]`)).forEach(function(item) {
         if(tempArr.indexOf(item.tagName)<0){
            tempArr.push(item.tagName);
            arrTags.push(item);
          }
     });
      return arrTags;
  }



const whichMouseButtonPressed= function (e) {
    // Handle different event models
    var e = e || window.event;
    var btnCode;

    if ('object' === typeof e) {
        btnCode = e.button;

        switch (btnCode) {
            case 0:
                alert('left mouse button');
            break;

            case 1:
              alert('middle mouse button');
            break;

            case 2:
                console.log('right mouse button');
            break;

            default:
                console.log('Неопределённое событие: ' + btnCode);
        }
    }
}
document.onmouseup=whichMouseButtonPressed;
document.oncontextmenu=()=>{return false;};




// функция ​ getElementsById(id) ​ из первого задания, которая будет работать асинхронно и возвращать promise

  const getElementsByid2=id=>{
    return new Promise((resolve, reject) => {
       let tempArr=[];
       let arrTags=[];
       Array.from(document.querySelectorAll(`[id=${id}]`)).forEach(function(item) {
            if(tempArr.indexOf(item.tagName)<0){
               tempArr.push(item.tagName);
               arrTags.push(item);
             }
       });
       if (arrTags.length==0) {
              reject("not found any tag with this ID ")
             }
             resolve(arrTags)
       }
   }
