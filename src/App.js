import './App.css';
import Home from './Home';

import Hotels from './Hotels';
import AddHotel from './AddHotel';
import EditHotel from './EditHotel';

import Guests from './Guests';
import AddGuest from './AddGuest';
import EditGuest from './EditGuest';

import Rooms from './Rooms';
import AddRoom from './AddRoom';
import EditRoom from './EditRoom';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
          <Route path='/' exact={true} component={Home} />

          <Route path='/hotels' exact={true} component={Hotels} />
          <Route path='/hotels/add' exact={true} component={AddHotel} />
          <Route path='/hotels/edit/:id' exact={true} component={EditHotel} />

          <Route path='/guests' exact={true} component={Guests} />
          <Route path='/guests/add' exact={true} component={AddGuest} />
          <Route path='/guests/edit/:id' exact={true} component={EditGuest} />

          <Route path='/hotels/:hotelId/rooms' exact={true} component={Rooms} />
          <Route path='/hotels/:hotelId/room' exact={true} component={AddRoom} />
          <Route path='/hotels/:hotelId/room/:id' exact={true} component={EditRoom} />
      </Switch>
    </Router>
  );
}

export default App;
