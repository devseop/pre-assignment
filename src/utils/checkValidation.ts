import { IUser } from 'src/types/types';

const validators = {
  email: validateEmail,
  password: validatePassword,
  checkPassword: (value: string, input: IUser) =>
    validatePasswordConfirmation(input.password!, value),
  username: validateUsername,
  phone: validatePhoneNumber,
  businessNumber: validateBusinessNumber,
};

function checkValidation(input: IUser): boolean {
  let isValid = true;

  if (input.email !== undefined) {
    isValid = isValid && validateEmail(input.email);
    console.log('email:', isValid);
  }
  if (input.password !== undefined) {
    isValid = isValid && validatePassword(input.password);
    console.log('pw:', isValid);
  }
  if (input.checkPassword !== undefined) {
    isValid =
      isValid &&
      validatePasswordConfirmation(input.password!, input.checkPassword);
    console.log('check pw:', isValid);
  }
  if (input.username !== undefined) {
    isValid = isValid && validateUsername(input.username);
    console.log('username:', isValid);
  }
  if (input.phone !== undefined) {
    isValid = isValid && validatePhoneNumber(input.phone);
    console.log('phone:', isValid);
  }
  if (input.businessNumber !== undefined) {
    isValid = isValid && validateBusinessNumber(input.businessNumber);
    console.log('business:', isValid);
  }

  return isValid;
}

// 각 입력 필드의 검사 함수
function validateEmail(email: string): boolean {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  return emailRegex.test(email);
}

function validatePassword(password: string): boolean {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  return passwordRegex.test(password);
}

function validatePasswordConfirmation(
  password: string,
  checkPassword: string,
): boolean {
  return password === checkPassword;
}

function validateUsername(username: string): boolean {
  const nameRegex = /^[가-힣a-zA-Z\s]+$/;
  return nameRegex.test(username);
}

function validatePhoneNumber(phoneNumber: string): boolean {
  const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;
  return phoneRegex.test(phoneNumber);
}

function validateBusinessNumber(businessNumber: string): boolean {
  const businessRegex = /^\d{3}-\d{2}-\d{5}$/;
  return businessRegex.test(businessNumber);
}

export default checkValidation;
