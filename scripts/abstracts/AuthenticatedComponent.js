import React from 'react';
import {connect} from 'react-redux';
import {routeActions} from 'react-router-redux'

export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth() {
            if (!this.props.authed) {
                let nextPathname = this.props.location.pathname;
                //this.props.dispatch(pushState(null, `/login?next=${redirectAfterLogin}`));
                this.props.dispatch(routeActions.push(`/login?next=${nextPathname}`));
            }
        }

        render() {
            return (
                    <div>
                      {this.props.authed === true
                        ? <Component {...this.props}/>
                        : null}
                    </div>
                    
            )

        }
    }

    const mapStateToProps = (state) => ({
        authed: state.auth.user.authed
    });

    return connect(mapStateToProps)(AuthenticatedComponent);

}