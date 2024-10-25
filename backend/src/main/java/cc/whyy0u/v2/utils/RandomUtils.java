package cc.whyy0u.v2.utils;
import java.util.Random;

public class RandomUtils {
    
    public static String generateRandomPinCode(int length) {
        StringBuilder pinCode = new StringBuilder(length);
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            int digit = random.nextInt(0, 10);
            pinCode.append(digit); 
        }
        return pinCode.toString();
    }
}
