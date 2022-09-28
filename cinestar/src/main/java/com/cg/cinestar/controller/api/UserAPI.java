package com.cg.cinestar.controller.api;

import com.cg.cinestar.mapper.UserMapper;
import com.cg.cinestar.model.Status;
import com.cg.cinestar.model.User;
import com.cg.cinestar.model.dto.UserDTO;
import com.cg.cinestar.model.dto.UserDTOCreate;
import com.cg.cinestar.repository.UserRepository;
import com.cg.cinestar.service.user.IUserService;
import com.cg.cinestar.utils.AppUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserAPI {
    @Autowired
    private IUserService userService;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> showListUser() {
        List<UserDTO> users = userRepository.findAllUserDTO();

        if(users.isEmpty()) {
            return new ResponseEntity<>("danh sach trong", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(users, HttpStatus.OK);
    }



    @GetMapping("/{id}")
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> findUserDTO(@PathVariable Long id) {
        UserDTO userDTO = userService.findUserDTOByID(id);

        if (userDTO == null) {
            return new ResponseEntity<>("Wine ID :" + id + "not found" + "!", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @PostMapping("/create")
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
        public ResponseEntity<?> doCreate(@Validated @RequestBody UserDTOCreate userDTOCreate, BindingResult bindingResult) {


        new UserDTOCreate().validate(userDTOCreate, bindingResult);

        if (bindingResult.hasErrors()) {
            return AppUtils.mapErrorToResponse(bindingResult);
        }

        try {
            User user = userDTOCreate.toUser();

            user.setId(0L);
            user.setStatus(new Status(1L,"ACTIVE"));

            user = userService.create(user);

            UserDTO userDTO = userMapper.toUserDTO(user);

            return new ResponseEntity<>(userDTO, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>("Server ko xử lý được", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/block/{id}")
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> doBlock(@PathVariable Long id){
        Optional<User> user = userService.findById(id);

        if (!user.isPresent()) {
            return new ResponseEntity<>("Không tìm thấy customer có id là:" + id + "!", HttpStatus.NO_CONTENT);
        }


        try{
            if(user.get().getStatus().getId() == 1) {
                userService. blockUser(id);
            }else {
                userService.unlockUser(id);
            }

            user = userService.findById(id);


            return new ResponseEntity<>(userMapper.toUserDTO(user.get()),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Server không xử lý được", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> doUpdateAccount(@PathVariable Long id, @Validated @RequestBody UserDTO userDTO,
                                             BindingResult bindingResult) {
        Optional<User> u = userService.findById(id);

        if (!u.isPresent()) {
            return new ResponseEntity<>("This account is not found!", HttpStatus.NOT_FOUND);
        }


        if (bindingResult.hasErrors()) {
            return AppUtils.mapErrorToResponse(bindingResult);
        }

        try {
            userDTO.setId(id);
            User user = userService.updateUser(userDTO);
            userService.save(user);

            return new ResponseEntity<>(userMapper.toUserDTO(user), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Server error!!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/search")
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> search(@RequestBody String searchInput) {
        searchInput = searchInput.replace('"',' ').trim().toLowerCase();
        List<UserDTO> listSearch = userService.search(searchInput);

        if(listSearch.size() == 0) {
            return new ResponseEntity<>("Danh sach trong", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(listSearch,HttpStatus.OK);
    }

    @GetMapping("/view/{id}")
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> doViewAccount(@PathVariable Long id) {

        try {
            UserDTO account = userService.findUserDTOByID(id);

            if (account == null) {
                return new ResponseEntity<>("This account is not found!", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(account, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Server error!!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
