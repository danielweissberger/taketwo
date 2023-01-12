import React from "react";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Dashboard from "./pages/Dashboard.js";
import Login from "./login/pages/Login.js";
import PrivateRoute from "./shared/components/UIElements/PrivateRoute.js";
import PermissionsModal from "./components/PermissionsModal/index.js";
import { MediaStreamProvider } from "./context/mediaStream.js";
function App() {
	return (<MediaStreamProvider>
				<Switch>
					<Route exact path="/login" component={Login}/>
					<PrivateRoute path="/" component={Dashboard}/>
				</Switch>
				<PrivateRoute path="/permissions" component={PermissionsModal}/>
			</MediaStreamProvider>
	);
}

export default App;
