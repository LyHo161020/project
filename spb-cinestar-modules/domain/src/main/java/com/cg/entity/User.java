package com.cg.entity;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;


import javax.persistence.*;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "users")
@Entity
@Accessors(chain = true)

public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String username;


    private String password;

    @Column(name = "full_name")
    private String fullName;

    private String phone;

    private String email;

    private String address;

    @Column(name = "date_of_birth")
    private String dateOfBirth;

    @OneToOne (targetEntity = Status.class, fetch = FetchType.EAGER)
    private Status status;

    @OneToOne(targetEntity = Role.class,fetch = FetchType.EAGER)
    private Role role;

    @OneToMany(mappedBy = "customer")
    private Set<Invoice> invoices;

    public User(Long id, String username, String password, String fullName, String phone, String email, String address, String dateOfBirth, Status status, Role role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.status = status;
        this.role = role;
    }
}
