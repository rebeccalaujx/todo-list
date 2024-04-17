import { notification } from "antd";

export const useNotifications = () => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message: String) => {
        api.open({
          message: message,
        });
      };
      return {
        openNotification,
        contextHolder
      }
}