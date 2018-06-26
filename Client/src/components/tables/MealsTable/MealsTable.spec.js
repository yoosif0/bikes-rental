import React from "react";
import ReactDOM from "react-dom";
import MealsTable  from './MealsTable';
// import App from '../../../App';

// App
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  // <MealsTable
  //   users={[{name: 'asd', role: 'manager', email: 'dasd@dsjk.com'}]} 
  // />

  // <App/>
  <MealsTable/>
  
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
