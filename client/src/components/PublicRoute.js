import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'

const PublicRouteComponent = ({ isAuth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => isAuth ? <Redirect to='/' /> : <Component {...props} />}
        />
    )
}

const mapStateToProps = ({ auth }) => {
    return {
        isAuth: auth.isAuth
    };
};

const PublicRoute = connect(mapStateToProps)(PublicRouteComponent);

export { PublicRoute };