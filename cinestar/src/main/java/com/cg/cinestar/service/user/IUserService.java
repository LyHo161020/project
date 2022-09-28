package com.cg.cinestar.service.user;

import com.cg.cinestar.model.User;
import com.cg.cinestar.model.dto.UserDTO;
import com.cg.cinestar.service.IGeneralService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

public interface IUserService extends IGeneralService<User>, UserDetailsService {

    User getByUsername(String username);

    void blockUser(Long id);

    void unlockUser(Long id);

    User updateUser(UserDTO userDTO);

    User create(User user);

    List<UserDTO> search(String searchInput);


    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    UserDTO findUserDTOByID(Long id);

    Optional<UserDTO> findUserDTOByUsername(String username);
}
