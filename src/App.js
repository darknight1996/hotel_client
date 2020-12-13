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

import RoomItems from './RoomItems';
import AddRoomItem from './AddRoomItem';
import EditRoomItem from './EditRoomItem';

import RoomOrders from './RoomOrders';
import AddRoomOrder from './AddRoomOrder';

import Orders from './Orders';

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

          <Route path='/rooms/:roomId/items' exact={true} component={RoomItems} />
          <Route path='/rooms/:roomId/item' exact={true} component={AddRoomItem} />
          <Route path='/rooms/:roomId/item/:id' exact={true} component={EditRoomItem} />

          <Route path='/rooms/:roomId/orders' exact={true} component={RoomOrders} />
          <Route path='/rooms/:roomId/order' exact={true} component={AddRoomOrder} />

          <Route path='/orders/all' exact={true} component={Orders} />
      </Switch>
    </Router>
  );
}

export default App;
