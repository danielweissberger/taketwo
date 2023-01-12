import React from "react";
import {Route, Redirect, useLocation} from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const location = useLocation();
	const {isLoggedIn} = useSelector(state => state.user);

	if(!isLoggedIn){
		// return <Redirect to={{pathname:"/login", from:location.pathname}}/>;
	}

	return (
		<Route {...rest} render={(props)=> (<Component {...props} {...rest}/>)}/>
	);
};

export default PrivateRoute;