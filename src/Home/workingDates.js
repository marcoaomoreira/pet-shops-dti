import moment from 'moment';
import { gregorian} from '@pacote/computus';


const feriados = ['01/01', 
    '21/04', 
    '01/05', 
    '07/09',
    '12/10',
    '02/11', '15/11',
    '25/12'];

const feriadosVolateis = [];


//CHECA SE É FERIADO E/OU FIM DE SEMANA
export const isHolidayBR = (date) =>
  { 
     const holiday = moment(date,"DD MM YYYY").format('DD/MM');
     const holidayVolatil = moment(date,"DD MM YYYY").format('DD/MM/YYYY');
         
     const ano = moment(date,"DD MM YYYY").format('YYYY');
     const pascoa = gregorian(ano).toLocaleDateString();

     feriadosVolateis.push(pascoa);
     feriadosVolateis.push(moment(pascoa, 'DD MM YYYY').subtract(2, 'days').format('DD/MM/YYYY')); //Sexta-Feira Santa
     feriadosVolateis.push(moment(pascoa, 'DD MM YYYY').subtract(48, 'days').format('DD/MM/YYYY')); //Segunda-Feira Carnaval
     feriadosVolateis.push(moment(pascoa, 'DD MM YYYY').subtract(47, 'days').format('DD/MM/YYYY')); //Carnaval
     feriadosVolateis.push(moment(pascoa, 'DD MM YYYY').add(60, 'days').format('DD/MM/YYYY')); //Corpus-Christ
   
    const foundFeriados = feriados.includes(holiday);
    const foundFeriadosVolateis = feriadosVolateis.includes(holidayVolatil);

    
    if(foundFeriados || foundFeriadosVolateis){
         return true;
     }else{
         return false;        
     }
}

//CHECA SE É FIM DE SEMANA
export const isWeekendBR = (date) =>
  {const day = moment(date).isoWeekday();
    if(day === 6 || day === 7){
        return 'fds';
    }else{
        return 'dianormal';
        
    }}

//CHECA SE HÁ DUPLICIDADE
export const showDupPos = (arr) => {
    var result = [];
    var positions = {};
    // collect all positions
    arr.forEach(function(value, pos) {
      positions[value] = positions[value] || [];
      positions[value].push(pos);
    });
    //check how much of same value in string
    Object.keys(positions).forEach(function(value) {
      var posArray = positions[value];
      if (posArray.length > 1) {
        result = result.concat(posArray);
      }
    });
    return result.sort();
  }

