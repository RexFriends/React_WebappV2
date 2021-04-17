interface IFriend {
    id: number,
    username?: string,
    first_name?: string,
    last_name?: string,
    name?: string,
    is_user: boolean,
    phone_number: string,
    profile_image: string
}

interface INotification {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    notif_type: 'Request' | 'Completed',
    did_reply: boolean,
    feedback_form_link?: string,
    product_info: IProduct,
    products?: number,
    profile_image: string,
    seen: boolean,
    sent_from_id?: number,
    thumbs_up?: boolean,
    time_responded?: string,
    time_sent?: string,
    time: string
}

interface IProduct {
    id: number,
    name: string,
    brand: string,
    price: string,
    images: string,
    url: string
}

interface ICloset {
    id: number,
    closet_name: string,
    closet_icon: string | null,
    items: Array<IClosetItem>,
    color: string
}

interface IClosetItem {
    product_id: number,
    img: string,
    images: string,
    isWebscraped: boolean
}

interface IFeedback {
    id: number,
    first_name: string,
    last_name: string,
    profile_image: string,
    feedback_text: string,
    thumbs_up?: boolean,
    time: string
}

type NotificationUpdate = {
    id: number,
    notified_user: boolean,
    type: 'request' | 'completed'
};

interface IAppContext {
    notifications: Array<INotification>,
    notificationUnreadCount: number,
    updateNotifications: () => void
}
