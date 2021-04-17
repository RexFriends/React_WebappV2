import React, { Component } from 'react';
import APIURL from '../../assets/URL';

const AppContext = React.createContext<IAppContext>({
    notifications: [],
    notificationUnreadCount: 0,
    updateNotifications: () => null
});

export interface IAppContextComponentProps {
    children: Array<JSX.Element>
}

class AppContextComponent extends Component<IAppContextComponentProps, IAppContext> {
    constructor(props: IAppContextComponentProps) {
        super(props);

        this.state = {
            notifications: [],
            notificationUnreadCount: 0,
            updateNotifications: this.fetchNotifications
        };
    }

    componentDidMount() {
        this.fetchNotifications();
        window.addEventListener('focus', this.fetchNotifications);
    }

    fetchNotifications = () => {
        const rexUID = localStorage.getItem('rexUID');
        fetch(`${APIURL}/api/get_notif?uid=${rexUID}`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    notificationUnreadCount: json.notifications.amount,
                    notifications: json.notifications.notifications
                });
            });
    };

    render() {
        const { children } = this.props;

        return (
            <AppContext.Provider value={this.state}>
                {children}
            </AppContext.Provider>
        );
    }
}

export { AppContextComponent };

export default AppContext;
