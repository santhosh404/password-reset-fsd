
# Password Reset with User Authentication

The is the Full Stack Project, Which contains all the user Authentication including forgot password and reset password Features.

#### Key Features:

1. Signup User: Creation of user with specific details.
2. Signin User: Signin with created credentials.
3. Forgot password: Getting Reset Password link via email.
4. Reset Password: Reset old password with the new password.

**Note:** Password reset link in mail will not works, if the password changed successfully

## API Reference

##### Base url = https://password-reset-fsd.onrender.com

#### Create or Signup Users

```http
POST /api/v1/auth/users/sign-up
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `first_name` | `string` | **Required** |
| `last_name` | `string` | **Required** |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Login or Signin Users

```http
POST /api/v1/auth/users/sign-in
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Forgot Password

```http
POST /api/v1/auth/users/forgot-password
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** |

#### Reset Password

```http
POST /api/v1/auth/users/reset-password
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `new_password` | `string` | **Required** |

## Documentation

[Postman API documentation](https://documenter.getpostman.com/view/19527033/2sA3Qwbpj1)



## Deployment

Front End Deployed URL

https://password-reset-fsd.netlify.app/sign-in


