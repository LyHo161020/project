package com.cg.user;

import com.cg.UserRepository;
import com.cg.entity.User;
import com.cg.dto.UserDTO;
import com.cg.entity.UserPrinciple;
import com.cg.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User getById(Long id) {
        return null;
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void remove(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public void blockUser(Long id) {
        userRepository.blockUser(id);
    }

    @Override
    public Optional<UserDTO> unlockUser(Long id) {
        userRepository.unlockUser(id);
        return null;
    }

    @Override
    public User create(User user) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String encodedPassword = encoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
        return user;
    }

    @Override
    public List<UserDTO> search(String searchInput) {
        List<UserDTO> users = userRepository.findAllUserDTO();
        List<UserDTO> listSearch = new ArrayList<>();

        for(UserDTO userDTO : users){
            if(userDTO.toString().toLowerCase().contains(searchInput)){
                listSearch.add(userDTO);
            }
        }

        return listSearch;
    }



    @Override
    public User updateUser(UserDTO userDTO) {

    User user = findById(userDTO.getId()).get();

        return new User()
                .setId(userDTO.getId())
                .setUsername(user.getUsername())
                .setPassword(user.getPassword())
                .setFullName(userDTO.getFullName())
                .setPhone(userDTO.getPhone())
                .setEmail(userDTO.getEmail())
                .setAddress(userDTO.getAddress())
                .setDateOfBirth(userDTO.getDateOfBirth())
                .setStatus(user.getStatus())
                .setRole(user.getRole());

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException(username);
        }
        return UserPrinciple.build(userOptional.get());
    }

    public UserDTO findUserDTOByID(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(value -> userMapper.toUserDTO(value)).orElse(null);

    }

    @Override
    public Optional<UserDTO> findUserDTOByUsername(String username) {
        return userRepository.findUserDTOByUsername(username);
    }

    @Override
    public User getByUsername(String username) {
        return userRepository.getByUsername(username);
    }
}
