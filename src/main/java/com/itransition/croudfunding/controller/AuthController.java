package com.itransition.croudfunding.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.itransition.croudfunding.entity.Role;
import com.itransition.croudfunding.entity.User;
import com.itransition.croudfunding.payload.request.LoginRequest;
import com.itransition.croudfunding.payload.request.SignupRequest;
import com.itransition.croudfunding.payload.response.JwtResponse;
import com.itransition.croudfunding.service.UserDetailsImpl;
import com.itransition.croudfunding.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itransition.croudfunding.payload.response.MessageResponse;
import com.itransition.croudfunding.security.jwt.JwtUtils;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	UserService userService;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt,
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(), 
												 roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		Optional<ResponseEntity<?>> checkResult = checkSignUpRequest(signUpRequest);
		if (checkResult.isPresent()) {
			return checkResult.get();
		}

		User user = new User(signUpRequest.getUsername(),
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()));

		Set<Role> roles = convertToEnumSet(signUpRequest.getRole());

		user.setRoles(roles);
		userService.save(user);
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	private Optional<ResponseEntity<?>> checkSignUpRequest(SignupRequest signUpRequest) {
		if (userService.existsByUsername(signUpRequest.getUsername())) {
			return Optional.of(ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!")));
		}
		if (userService.existsByEmail(signUpRequest.getEmail())) {
			return Optional.of(ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!")));
		}
		return Optional.empty();
	}

	private Set<Role> convertToEnumSet(Set<String> rolesStrings) {
		Set<Role> roles = new HashSet<>();
		if (rolesStrings == null) {
			roles.add(Role.USER);
		} else {
			rolesStrings.forEach(role -> {
				if ("admin".equalsIgnoreCase(role)) {
					roles.add(Role.ADMIN);
				} else {
					roles.add(Role.USER);
				}
			});
		}
		return roles;
	}
}
