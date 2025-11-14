package com.ssafy.a208.global.security.config;


import com.ssafy.a208.global.security.filter.JwtFilter;
import com.ssafy.a208.global.security.handler.JwtAccessDeniedHandler;
import com.ssafy.a208.global.security.handler.JwtAuthenticationEntryPoint;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    private static final String[] SWAGGER_URLS = {
            "/swagger-ui/**", "/v3/api-docs/**", "/swagger-resources/**", "/webjars/**"
    };
    private static final String LOGIN_URL = "/api/v1/auth/login";
    private static final String SIGNUP_URL = "/api/v1/members/join";
    private static final String MEMBER_DUPLICATE_CHECK_URL = "/api/v1/members";
    private static final String IMAGE_URL = "/api/v1/images";
    private static final String[] CONTEST_URLS = {
            "/api/v1/contests", "/api/v1/contests/*",
            "/api/v1/contests/*/notices", "/api/v1/contests/*/notices/*",
            "/api/v1/contests/*/submissions", "/api/v1/contests/*/submissions/*"
    };
    private static final String[] POST_URLS = {
            "/api/v1/posts", "/api/v1/posts/*"
    };
    private static final String MIGRATION_URL = "/api/v1/admin/**";
    private static final String TAG_URL = "/api/v1/tags/**";
    private static final String CONNECT_ALARM_URL = "/api/v1/alarms/connect";

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http.cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable);

        http.sessionManagement(session
                        -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .logout(AbstractHttpConfigurer::disable);

        http.httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable);

        http.exceptionHandling((exceptionHandling) ->
                exceptionHandling
                        .accessDeniedHandler(new JwtAccessDeniedHandler())
                        .authenticationEntryPoint(new JwtAuthenticationEntryPoint())
        );
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        http.authorizeHttpRequests(auth -> auth
                .requestMatchers(SWAGGER_URLS).permitAll()
                .requestMatchers(LOGIN_URL).permitAll()
                .requestMatchers(IMAGE_URL).permitAll()
                .requestMatchers(HttpMethod.POST, SIGNUP_URL).permitAll()
                .requestMatchers(HttpMethod.GET, MEMBER_DUPLICATE_CHECK_URL).permitAll()
                .requestMatchers(HttpMethod.GET, CONTEST_URLS).permitAll()
                .requestMatchers(HttpMethod.GET, POST_URLS).permitAll()
                .requestMatchers(MIGRATION_URL).permitAll()
                .requestMatchers(TAG_URL).permitAll()
                .requestMatchers(CONNECT_ALARM_URL).permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/error").permitAll()
                .anyRequest().authenticated());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(
                "https://promocean.co.kr",
                "http://localhost:3000",
                "http://localhost:5500"
        ));

        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));

        configuration.setAllowedHeaders(List.of("*"));

        configuration.setExposedHeaders(List.of("Authorization"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}


