import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  name: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.]{8,}$/,
      "Password must be at least 8 characters long and contain at least 1 letter, 1 number, and 1 special character"
    )
    .required(),
});

const SignupPage: React.FC = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:9890/users/signup",
        data
      );
      if (response.status == 201) {
        toast.success("Signed Up! Please Login");
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Signup
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
          />
          <Button
            sx={{ mt: 2 }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Signup
          </Button>

          <Typography mt={3}>
            Already Signed Up? <Link to="/login">Login</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default SignupPage;
