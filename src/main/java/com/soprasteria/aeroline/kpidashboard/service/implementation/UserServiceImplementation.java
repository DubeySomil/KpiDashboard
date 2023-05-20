package com.soprasteria.aeroline.kpidashboard.service.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.soprasteria.aeroline.kpidashboard.dao.ClientRepository;
import com.soprasteria.aeroline.kpidashboard.dao.DURepository;
import com.soprasteria.aeroline.kpidashboard.dao.ProfitCenterRepository;
import com.soprasteria.aeroline.kpidashboard.dao.ProjectRepository;
import com.soprasteria.aeroline.kpidashboard.dao.RoleRepository;
import com.soprasteria.aeroline.kpidashboard.dao.UserRepository;
import com.soprasteria.aeroline.kpidashboard.entity.Client;
import com.soprasteria.aeroline.kpidashboard.entity.Du;
import com.soprasteria.aeroline.kpidashboard.entity.LoginDetails;
import com.soprasteria.aeroline.kpidashboard.entity.ProfitCenter;
import com.soprasteria.aeroline.kpidashboard.entity.Project;
import com.soprasteria.aeroline.kpidashboard.entity.Role;
import com.soprasteria.aeroline.kpidashboard.entity.User;
import com.soprasteria.aeroline.kpidashboard.exception.InvalidPasswordException;
import com.soprasteria.aeroline.kpidashboard.exception.NoAccessException;
import com.soprasteria.aeroline.kpidashboard.exception.ProjectNotFoundException;
import com.soprasteria.aeroline.kpidashboard.exception.ResourceAlreadyExistsException;
import com.soprasteria.aeroline.kpidashboard.exception.RoleNotFoundException;
import com.soprasteria.aeroline.kpidashboard.exception.UserNotFoundException;
import com.soprasteria.aeroline.kpidashboard.exception.WrongPasswordInputException;
import com.soprasteria.aeroline.kpidashboard.payload.AssignDTO;
import com.soprasteria.aeroline.kpidashboard.payload.ClientDTO;
import com.soprasteria.aeroline.kpidashboard.payload.DUDTO;
import com.soprasteria.aeroline.kpidashboard.payload.EmailRequest;
import com.soprasteria.aeroline.kpidashboard.payload.PasswordUpdateDTO;
import com.soprasteria.aeroline.kpidashboard.payload.ProfitCenterDTO;
import com.soprasteria.aeroline.kpidashboard.payload.UserDTO;
import com.soprasteria.aeroline.kpidashboard.payload.UserUpdate;
import com.soprasteria.aeroline.kpidashboard.service.UserService;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private DURepository duRepository;


    @Autowired
    private ProfitCenterRepository profitCenterRepository;

    @Autowired
    private ClientRepository clientRepository;
    
    @Autowired
	private EmailService emailService;


    @Override
    public UserDTO checkUser(LoginDetails loginDetails) {
        Optional<User> findByUserNameAndUserPassword = this.userRepository.findByUserNameAndUserPassword(loginDetails.getLoginName(), loginDetails.getLoginPassword());
        if(!findByUserNameAndUserPassword.isPresent()) {
            throw new InvalidPasswordException();
        } else {
            if(findByUserNameAndUserPassword.get().isUserStatus() == false) {
                throw new NoAccessException();
            }
            else {
                User userDetails = findByUserNameAndUserPassword.get();
                return this.UsertoDTO(userDetails);
            }
        }
    }

    @Override
    public UserDTO getUser(String userName) {
        Optional<User> findByUserName = this.userRepository.findByUserName(userName);
        if (findByUserName == null) {
            throw new UserNotFoundException("User", " username ", userName);
        } else {
            User userDetails = findByUserName.get();
            return this.UsertoDTO(userDetails);
        }
    }

    @Override
    public List<UserDTO> getAllUsers() {

        List<User> userDetails = this.userRepository.findAll();
        List<UserDTO> userDetailsDTO = userDetails.stream().map(user -> this.UsertoDTO(user))
                .collect(Collectors.toList());
        return userDetailsDTO;
    }

    @Override
    public void createUser(UserDTO userDetailsDTO) {
        User dtoToUser = this.dtoToUser(userDetailsDTO);
        Optional<User> findByUserName = this.userRepository.findByUserName(userDetailsDTO.getUserName());
        Optional<User> findByUserEmail = this.userRepository.findByUserEmail(userDetailsDTO.getUserEmail());

        if(findByUserName.isPresent() && findByUserEmail.isEmpty()) {
            throw new ResourceAlreadyExistsException("Username not available");
        } 
        else if(findByUserName.isEmpty() && findByUserEmail.isPresent()) {
            throw new ResourceAlreadyExistsException("User with Email already exists");
        }
        else if(findByUserName.isPresent() && findByUserEmail.isPresent()) {
            throw new ResourceAlreadyExistsException("User already exists");
        }
        else {
            this.userRepository.save(dtoToUser);
            EmailRequest emailRequest = new EmailRequest();
//            emailRequest.setTo(userDetailsDTO.getUserEmail());
            emailRequest.setTo("somil.dubey@soprasteria.com");
            emailRequest.setSubject("New User Registration to the KPI Dashboard Application");
            String username = userDetailsDTO.getUserFirstName() + " " + userDetailsDTO.getUserLastName();
            String message = "Hey Admin, new User with the name of " + userDetailsDTO.getUserName() + " has registered in the application";
            emailRequest.setMessage(message);
            String site = "http://localhost:3000/PrivateRoute/UserDashboard";
            String content = "<html><body><h2>A new user has registered in the application</h2>"
                    + "<p>Account Details:</p>"
                    + "<ul>"
                    + "<li>Username: " + userDetailsDTO.getUserEmail() + "</li>"
                    + "<li>Full Name: " +  username + "</li>"
                    + "</ul>"
                    + "<p>A user has requested access naming you as the sponsor. Please click <a href='" + site + "'>here</a> to confirm or reject the request.</p>"
                    + "</body></html>";
            emailRequest.setContent(content);
            this.emailService.sendEmail(emailRequest.getSubject(), emailRequest.getMessage(), emailRequest.getTo(), emailRequest.getContent());
        }

    }

    @Override
    public void deleteUser(String userName) {
        Optional<User> findByUserName = this.userRepository.findByUserName(userName);
        if (findByUserName == null) {
            throw new UserNotFoundException("User", " username ", userName);
        } else {
            long userId = findByUserName.get().getUserId();
            this.userRepository.deleteById(userId);
        }

    }

    @Override
    public void updateUser(String userName, UserDTO userDetailsDTO) {
        Optional<User> findByUserName = this.userRepository.findByUserName(userName);
        User dtoToUser = this.dtoToUser(userDetailsDTO);
        if (findByUserName == null) {
            throw new UserNotFoundException("User", " username ", userName);
        } else {
            User userDetails = findByUserName.get();
            userDetails.setUserLastName(dtoToUser.getUserLastName());
            userDetails.setUserFirstName(dtoToUser.getUserFirstName());
            userDetails.setUserEmail(dtoToUser.getUserEmail());
            userDetails.setUserId(dtoToUser.getUserId());
            userDetails.setUserPassword(dtoToUser.getUserPassword());
            userDetails.setUserManager(dtoToUser.getUserManager());
            System.out.println("Details are" + userDetails.toString());
            this.userRepository.save(userDetails);
        }
    }

    @Override
    public void assignRole(String userName, int roleId) {
        Optional<Role> findById = this.roleRepository.findById(roleId);
        if (findById == null) {
            throw new RoleNotFoundException("Role", "roleid", roleId);
        } else {
            Optional<User> findByUserName = this.userRepository.findByUserName(userName);
            if (findByUserName == null) {
                throw new UserNotFoundException("User", "username", userName);
            } else {
                User userDetails = findByUserName.get();
                Role roleDetails = findById.get();
                userDetails.setRole(roleDetails);
                this.userRepository.save(userDetails);
            }
        }

    }

    @Override
    public void assignProject(String userName, int projectId) {
        Optional<Project> findById = this.projectRepository.findById(projectId);
        if (findById == null) {
            throw new ProjectNotFoundException("Project", "projectname", projectId);
        } else {
            Optional<User> findByUserName = this.userRepository.findByUserName(userName);
            if (findByUserName == null) {
                throw new UserNotFoundException("User", "username", userName);
            } else {
                Project projectDetails = findById.get();
                User userDetails = findByUserName.get();
                List<Project> projects = userDetails.getProjects();
                projects.add(projectDetails);
                userDetails.setProjects(projects);
                this.userRepository.save(userDetails);
            }
        }

    }

    private UserDTO UsertoDTO(User userDetails) {
        UserDTO userDetailsDTO = this.modelMapper.map(userDetails, UserDTO.class);
        return userDetailsDTO;

    }

    private User dtoToUser(UserDTO userDetailsDTO) {
        User userDetails = this.modelMapper.map(userDetailsDTO, User.class);
        return userDetails;
    }

    @Override
    public void updateUserStatusAndRole(UserUpdate userUpdate) {
        System.out.println("everything is fine here");
        System.out.println("checkbox ki value" + userUpdate.isCheckbox());
        System.out.println("role ki value"+ userUpdate.getRole());
        System.out.println("user ka name" + userUpdate.getUserName());
        Optional<User> findByUserName = this.userRepository.findByUserName(userUpdate.getUserName());
        User user = findByUserName.get();
        Optional<Role> findByRoleName = this.roleRepository.findByRoleName(userUpdate.getRole());
        Role role = findByRoleName.get();
        user.setRole(role);
        user.setUserStatus(userUpdate.isCheckbox());
        
        this.userRepository.save(user);
    }

	@Override
	public void updatePassword(String username, PasswordUpdateDTO passwordupdatedto) {
	  User u = this.userRepository.findByUserName(username).orElseThrow();
	   if(u.getUserPassword().equals(passwordupdatedto.getOldpassword()))
	   {
		   u.setUserPassword(passwordupdatedto.getPassword());
		   this.userRepository.save(u);
		  
	   }
	   else {
		
		 
		   throw new WrongPasswordInputException();
		   
	   }
	  
		
	}

	@Override
	public void checkUserExist(String username) {
	   Optional<User> u =this.userRepository.findByUserName(username);
	      if(u == null) {
	    	 
	      }
	      else {
	    	  throw new ResourceAlreadyExistsException("Username already exists");
	      }
	      
		
	}

    @Override
    public void assign(String userName, AssignDTO assignDTO) {
        
        
        System.out.println("Rajat the user is"+ userName);
        System.out.println("the size is du" + assignDTO.getdUs().size());
        System.out.println("the size is profitcenter" + assignDTO.getProfitCenters().size());
        System.out.println("the size is client" + assignDTO.getClients().size());

        Optional<User> findByUserName = this.userRepository.findByUserName(userName);
        User user = findByUserName.get();
        Optional<Role> findByRoleName = this.roleRepository.findByRoleName(assignDTO.getRole());
        Role role = findByRoleName.get();
        user.setRole(role);
        user.setUserStatus(assignDTO.isCheckbox());
        
        this.userRepository.save(user);
        List<DUDTO> dUs = assignDTO.getdUs();
        List<ProfitCenterDTO> profitCenters = assignDTO.getProfitCenters();
        List<ClientDTO> clients = assignDTO.getClients();
        
        List<Du> dU2 = new ArrayList<>();
        for(int i = 0; i < dUs.size(); i++) {
            DUDTO dudto = dUs.get(i);
            System.out.println("name is" + dudto.getName());
            Optional<Du> findByDUName = this.duRepository.findByDuName(dudto.getName());
            Du du = findByDUName.get();
            dU2.add(du);
        }
        
        List<ProfitCenter> profitCenters2 = new ArrayList<>();
        for(int i = 0; i < profitCenters.size(); i++) {
            ProfitCenterDTO profitCenterDTO = profitCenters.get(i);
            System.out.println("name of profit center is" + profitCenterDTO.getName());
            Optional<ProfitCenter> findByProfitCenterName = this.profitCenterRepository.findByProfitCenterName(profitCenterDTO.getName());
            ProfitCenter profitCenter = findByProfitCenterName.get();
            profitCenters2.add(profitCenter);
        }

        List<Client> clients2 = new ArrayList<>();
        for(int i = 0; i < clients.size(); i++) {
            ClientDTO clientDTO = clients.get(i);
            Optional<Client> findByClientName = this.clientRepository.findByClientName(clientDTO.getName());
            Client client = findByClientName.get();
            clients2.add(client);
        }


        user.setDus(dU2);
        user.setProfitCenters(profitCenters2);
        user.setClients(clients2);

        this.userRepository.save(user);
    }

	@Override
	public String provideAccess(LoginDetails loginDetails) {
		Optional<User> findByUserNameAndUserPassword = this.userRepository.findByUserNameAndUserPassword(loginDetails.getLoginName(), loginDetails.getLoginPassword());
        if(!findByUserNameAndUserPassword.isPresent()) {
            throw new InvalidPasswordException();
        } else {
            if(findByUserNameAndUserPassword.get().isUserStatus() == false) {
            	User user = findByUserNameAndUserPassword.get();
            	EmailRequest emailRequest = new EmailRequest();
                emailRequest.setTo("somil.dubey@soprasteria.com");
                emailRequest.setSubject("Access request from: " + user.getUserEmail());
                String username = user.getUserFirstName() + " " + user.getUserLastName();
                String site = "http://localhost:3000/PrivateRoute/UserDashboard";
                String message = "A user is requesting access to the application\r\n"
                		+ "Account Details\r\n"
                		+ "Username: " + user.getUserEmail() + "\r\n"
                		+ "Full Name: " +  username + "\r\n"
                		+ "A user has requested access naming you as the sponsor. Please click here to confirm or reject the request.";
                String content = "<html><body><h2>A user is requesting access to the application</h2>"
                        + "<p>Account Details:</p>"
                        + "<ul>"
                        + "<li>Username: " + user.getUserEmail() + "</li>"
                        + "<li>Full Name: " +  username + "</li>"
                        + "</ul>"
                        + "<p>A user has requested access naming you as the sponsor. Please click <a href='" + site + "'>here</a> to confirm or reject the request.</p>"
                        + "</body></html>";
                emailRequest.setMessage(message);
                emailRequest.setContent(content);
                this.emailService.sendEmail(emailRequest.getSubject(), emailRequest.getMessage(), emailRequest.getTo(), emailRequest.getContent());
                return "Access request sent";
            }
            else {
                User userDetails = findByUserNameAndUserPassword.get();
                return "User already active";
            }
        }
		
	}

}
