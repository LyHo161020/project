package com.cg.dto;

import com.cg.ValidDateUtils;
import com.cg.entity.Role;
import com.cg.entity.Status;
import com.cg.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Calendar;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)

public class UserDTO implements Validator {
    private Long id;

    @NotNull(message = "Vui lòng nhập tên đăng nhập!")
    @Size(min = 8, max = 32, message = "Tên đăng nhập chỉ từ 8-32 kí tự!")
    private String username;


    @Column(name = "full_name")
    @NotNull(message = "Vui lòng nhập mật khẩu")
    @Size(min = 5, max = 50, message = "Tên phải gồm 5-50 kí tự!")
    private String fullName;


    @NotBlank(message = "Vui lòng nhập số điện thoại!")
    private String phone;

    @NotNull(message = "Vui lòng nhập email!")
    @Size(min = 5, max = 32, message = "Email phải gồm 5-32 kí tự!")
    @Pattern(regexp = ValidDateUtils.EMAIL_REGEX, message = "Vui lòng nhập đúng đinh dạng email!")
    private String email;

    @NotBlank( message = "Vui lòng nhập địa chỉ!")
    private String address;


    @Column(name = "date_of_birth")
    private String dateOfBirth;

    @OneToOne(targetEntity = Status.class, fetch = FetchType.EAGER)
    private Status status;

    @OneToOne(targetEntity = Role.class,fetch = FetchType.EAGER)
    private Role role;



//    public UserDTO(Long id, String username, String fullName, String phone, String email, String address, String dateOfBirth, Status status, Role role) {
//        this.id = id;
//        this.username = username;
//        this.fullName = fullName;
//        this.phone = phone;
//        this.email = email;
//        this.address = address;
//        this.dateOfBirth = dateOfBirth;
//        this.status = status;
//        this.role = role;
//    }

    public User toUser() {
        return new User()
                .setId(id)
                .setUsername(username)
                .setFullName(fullName)
                .setPhone(phone)
                .setEmail(email)
                .setAddress(address)
                .setDateOfBirth(dateOfBirth)
                .setStatus(status)
                .setRole(role);
    }

    @Override
    public String toString() {
        return id + " " + username + " " + fullName + " " + phone + " " + email + " " + address + " " + dateOfBirth + " " + status.getStatusName() + " " + role.getName();
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return UserDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object o, Errors errors) {
        UserDTO userDTO = (UserDTO) o;
        String dateOfBirth = userDTO.getDateOfBirth();



        if(dateOfBirth == null || dateOfBirth.equals("")) {
            errors.rejectValue("dateOfBirth","400", "Vui lòng nhập ngày sinh!");
        }else {
            int year = Integer.parseInt(dateOfBirth.substring(0,4));
            int month = Integer.parseInt(dateOfBirth.substring(5,7));
            int day = Integer.parseInt(dateOfBirth.substring(8));

            Calendar calendar = Calendar.getInstance();
            calendar.setTimeInMillis(System.currentTimeMillis());

            int currentYear = calendar.get(Calendar.YEAR);
            int currentMonth = calendar.get(Calendar.MONTH) + 1;
            int currentDay = calendar.get(Calendar.DAY_OF_MONTH);


            if(year > currentYear) {
                errors.rejectValue("dateOfBirth","400", "Ngày sinh không hợp lệ!");
            }else if(year == currentYear) {
                if(month > currentMonth) {
                    errors.rejectValue("dateOfBirth","400", "Ngày sinh không hợp lệ!");
                }else if(month == currentMonth) {
                    if (day > currentDay){
                        errors.rejectValue("dateOfBirth","400", "Ngày sinh không hợp lệ!");
                    }
                }
            }
        }

    }
}
