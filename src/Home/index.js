import React, {useState} from 'react';
import * as S from './styled';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import {showDupPos,isHolidayBR} from './workingDates';
import {fetchPetShops} from '../API';
import {Petz} from '../data';

function App() {

  const history = useHistory();
  const [usuario, setUsuario] = useState('');  
  const [erro, setErro] = useState(false);
  const valores = [];


  

  
  function handlePesquisa(){

    const dadosPetShop = usuario.split(' ');
    const caosPequenos = dadosPetShop[1];
    const caosGrandes = dadosPetShop[2];
    
    let data = Petz;
    //let data = fetchPetShops();
    
    //console.log(data);

    var result = data;
    
    //data.then(function(result) {
      
      
        for(let i=0; i<result.length; i++){
          if(isHolidayBR(dadosPetShop[0])){
          var valorTotal = caosPequenos*result[i].caoPequenoFDS + caosGrandes*result[i].caoGrandeFDS;
          valores[i] = valorTotal;
                    
        }else{
          var valorTotal = caosPequenos*result[i].caoPequeno + caosGrandes*result[i].caoGrande;
          valores[i] = valorTotal;
          
        }    

      }

      if(!!showDupPos(valores)){

        var nomeMenor = result[valores.lastIndexOf(Math.min(...valores))].nome;
        var valorMenor = Math.min(...valores);
        
      }else{
        var distancia = [];
        var indicesduplos = showDupPos(valores);
        for(let j=0; j< showDupPos(valores).length;j++){
          distancia[j] = result[indicesduplos[j]];
        }

        var nomeMenor = result[valores.lastIndexOf(Math.min(...distancia))].nome;
        var valorMenor = Math.min(...valores);
    
    }
    localStorage.setItem('repositoriesName', JSON.stringify(nomeMenor + " no valor de R$"+ valorMenor));
    setErro(false);
    history.push('/Repositories');
            
       
   //)}
   
    
  }

return (   
    <S.HomeContainer> 
      <S.Content>
          <S.Input className = "usuarioInput" placeholder="Usuário" value={usuario} onChange={e => setUsuario(e.target.value)} />
          <S.Button type="button" onClick={handlePesquisa}> Pesquisar</S.Button>
      </S.Content>
      <S.Content>

      </S.Content>
      {erro ? <S.ErrorMsg> Ocorreu um erro. Tente novamente! </S.ErrorMsg> : ''}
      
    </S.HomeContainer>
  );
}

export default App;