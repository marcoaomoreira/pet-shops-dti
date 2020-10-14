import React from 'react';
import { Switch , Route, BrowserRouter} from 'react-router-dom';
import Home from './Home';
import Repositores from './Results';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                 <Route path='/repositories' component = {Repositores} /> 
            </Switch>
        </BrowserRouter>
    )

}