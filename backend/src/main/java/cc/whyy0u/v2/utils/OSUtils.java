package cc.whyy0u.v2.utils;

import cc.whyy0u.v2.entity.user.DeviceType;

public class OSUtils {

    public static DeviceType getOperatingSystem(String userAgent) {
        if (userAgent == null) {
            return DeviceType.UnknownOS;
        }
        if (userAgent.contains("Windows")) {
            return DeviceType.Windows;
        } else if (userAgent.contains("Mac")) {
            return DeviceType.MacOS;
        } else if (userAgent.contains("X11")) {
            return DeviceType.Unix;
        } else if (userAgent.contains("Linux")) {
            return DeviceType.Linux;
        } else if (userAgent.contains("Android")) {
            return DeviceType.Android;
        } else if (userAgent.contains("iPhone")) {
            return DeviceType.iPhone;
        }
        
        return DeviceType.UnknownOS;
    }
}
