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
    images: string,
    url: string
}

type NotificationUpdate = {
    id: number,
    notified_user: boolean,
    type: 'request' | 'completed'
};
