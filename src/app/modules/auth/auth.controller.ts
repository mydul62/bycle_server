import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";


const userRegister = catchAsync(async (req, res) => {
  const {password,...remaining} = req.body;
  const result = await AuthService.userRegisterService(password,remaining);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: 200,
    data: result,
  });
});
const userLogin = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.userLoginService(payload);
  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: 200,
    data: result,
  });
});
export const AuthControllers = {
  userRegister,
  userLogin,
};