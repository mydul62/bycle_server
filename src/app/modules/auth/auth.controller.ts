import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";



const userRegister = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await AuthService.userRegisterService(body);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: 200,
    data: result,
  });
});
const userLogin = catchAsync(async (req, res) => {
  const body = req.body;
  const data = await AuthService.userLoginService(body);
  const { accessToken, refreshToken } = data;

  res.cookie('refreshToken', refreshToken, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: 200,
  data: accessToken,
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshTokenService(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});
const AlluserGet = catchAsync(async (req, res) => {
  const result = await AuthService.AlluserGet();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All user retrieved succesfully!',
    data: result,
  });
});
const UpdateRole = catchAsync(async (req, res) => {
  const result = await AuthService.UpdateRole(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All user retrieved succesfully!',
    data: result,
  });
});
const DeletedUser = catchAsync(async (req, res) => {
  const result = await AuthService.DeletedUser(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Deleted user succesfully!',
    data: result,
  });
});
export const AuthControllers = {
  userRegister,
  userLogin,
  refreshToken,
  AlluserGet,
  UpdateRole,
  DeletedUser
};