package cc.whyy0u.v2.utils;

import cc.whyy0u.v2.entity.user.DeviceType;

public class OSUtils {

    public static DeviceType getOperatingSystem(String userAgent) {
        System.out.println(userAgent);
        if (userAgent == null) {
            return DeviceType.UnknownOS;
        }
        
        userAgent = userAgent.toLowerCase(); 
        
        if (userAgent.contains("windows")) {
            return DeviceType.Windows;
        } else if (userAgent.contains("mac")) {
            return DeviceType.MacOS;
        } else if (userAgent.contains("x11")) {
            return DeviceType.Unix;
        } else if (userAgent.contains("linux")) {
            return DeviceType.Linux;
        } else if (userAgent.contains("android")) {
            return DeviceType.Android;
        } else if (userAgent.contains("iphone") || userAgent.contains("ipad")) {
            return DeviceType.iOS;
        }
        
        return DeviceType.UnknownOS;
    }
}
