export const nameRegex = /^[A-Za-z0-9 _-]{2,30}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const validateName = (name: string) => {
  const value = name.trim();

  if (!value) return "";
  if (!nameRegex.test(value)) {
    return "Name must be 2-30 characters and can contain letters, numbers, spaces, _ and -";
  }

  return "";
};

export const validateEmail = (email: string) => {
  const value = email.trim().toLowerCase();

  if (!value) return "";
  if (!emailRegex.test(value)) {
    return "Please enter a valid email";
  }

  return "";
};

export const validatePassword = (password: string) => {
  if (!password) return "";
  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters and include uppercase, lowercase and a number";
  }

  return "";
};
