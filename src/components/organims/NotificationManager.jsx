import { useEffect } from "react";
import { useSelector } from "react-redux";
import { requestUserPermission } from "../../assets/utils/helperPushNotification";
import { updateFCMToken } from "../../assets/api/fetchNotifications";
import { Storage } from "../../assets/services/storage.service";
import { userConnectState } from "../../assets/api/auth.api";

export const NotificationManager = () => {
  //
  const { user, token: tokenUser } = useSelector((s) => s.authState);

  useEffect(() => {
    (async () => {
      await userConnectState(tokenUser);
      const token = await requestUserPermission();

      if (token) {
        const payload = {
          tokenfcm: token,
          id_user: user?.id,
        };
        const { err } = await updateFCMToken(payload);
        if (!err) {
          await Storage.setItem("fcmToken", token);
        }
      }
    })();
  }, [user]);

  return null;
};
