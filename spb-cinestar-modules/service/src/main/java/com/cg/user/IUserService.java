package com.cg.user;

import com.cg.IGeneralService;
import com.cg.dto.UserDTO;
import com.cg.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

public interface IUserService extends IGeneralService<User>, UserDetailsService {

    User getByUsername(String username);

    void blockUser(Long id);

    Optional<UserDTO> unlockUser(Long id);

    User updateUser(UserDTO userDTO);

    User create(User user);

    List<UserDTO> search(String searchInput);


    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    UserDTO findUserDTOByID(Long id);

    Optional<UserDTO> findUserDTOByUsername(String username);
}
