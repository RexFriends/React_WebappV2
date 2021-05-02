import React, { Component } from 'react';
import APIURL from '../../assets/URL';

const AppContext = React.createContext<IAppContext>({
    notifications: [],
    notificationTotal: 0,
    notificationUnreadCount: 0,
    loadNextNotifications: () => new Promise<void>(resolve => resolve()),
    updateNotifications: () => null
});

export interface IAppContextComponentProps {
    children: Array<JSX.Element>
}

class AppContextComponent extends Component<IAppContextComponentProps, IAppContext> {
    private currentLoadedNotificationIndex = 0;
    private allNotificationsLoaded = false;

    constructor(props: IAppContextComponentProps) {
        super(props);

        this.state = {
            notifications: [],
            notificationTotal: 0,
            notificationUnreadCount: 0,
            loadNextNotifications: this.loadNextNotifications,
            updateNotifications: this.updateNotifications
        };
    }

    componentDidMount() {
        this.getNotifications(0, 10);
        window.addEventListener('focus', () => this.updateNotifications());
    }

    private getNotifications = (index: number, length: number, concat = false): Promise<void> => {
        const rexUID = localStorage.getItem("rexUID");
        if (rexUID !== null) {
        const { notifications } = this.state;

        this.currentLoadedNotificationIndex = index + length;
        const rexUID = localStorage.getItem('rexUID');
        return fetch(`${APIURL}/api/get_notif?uid=${rexUID}&index=${index}&length=${length}`)
            .then(res => res.json())
            .then(json => {
                let notifs: Array<INotification>;
                if (concat) notifs = notifications.concat(json.notifications.notifications);
                else notifs = json.notifications.notifications;

                this.setState({
                    notificationUnreadCount: json.notifications.amount,
                    notificationTotal: json.notifications.total_count,
                    notifications: notifs
                });
                if (json.notifications.total_count <= this.currentLoadedNotificationIndex) {
                    this.currentLoadedNotificationIndex = json.notifications.total_count;
                    this.allNotificationsLoaded = true;
                } else this.allNotificationsLoaded = false; // in case new notifications come in
            })
            .catch(console.error);
        }
    };

    loadNextNotifications = () => {
        if (!this.allNotificationsLoaded)
            return this.getNotifications(this.currentLoadedNotificationIndex, 10, true);

        return new Promise<void>(resolve => resolve());
    };

    updateNotifications = () => {
        this.getNotifications(0, this.currentLoadedNotificationIndex);
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
