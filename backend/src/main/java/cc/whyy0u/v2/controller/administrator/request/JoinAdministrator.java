package cc.whyy0u.v2.controller.administrator.request;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class JoinAdministrator {

    @NotNull
    @Size(max = 20)
    private String iin;

    @Size(max = 30)
    private String name;
    
    @Size(max = 50)
    private String surname;

    @Size(max = 50)
    private String patronymic;

}
