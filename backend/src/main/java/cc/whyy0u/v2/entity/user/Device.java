package cc.whyy0u.v2.entity.user;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Device {
    private String ipAddress;
    private DeviceType deviceType;
    
    public Device(String ipAddress, DeviceType deviceType) {
        this.ipAddress = ipAddress;
        this.deviceType = deviceType;
    }
}