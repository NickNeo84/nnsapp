module.exports = parseNumber;

function parseNumber(number, unit = 0) {
    if (typeof (number) === 'string') {
        // custom application error
        var numb = '';
        if (number.length > 2){
            var thrid = number.substr(number.length-3,1);
            numb = thrid;  
          };
          if (number.length > 1){
              var second = number.substr(number.length-2,1);
              numb +=  second;
          };
          if (number.length > 0){
               var first = number.substr(number.length-1,1); 
               numb +=  first;
          };

          if (unit == 1){
                return first; 
          } else if(unit == 2){
                return second; 
          } else if(unit == 3){
                return thrid; 
          } else {
                return numb; 
          }
        
    }
}