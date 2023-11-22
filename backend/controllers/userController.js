import asyncHandler from "../middleware/asyncHandler.js";
// import User from "../modals/usertModal.js";

// @desc    Auth user & get Token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
});

// @desc    Register user
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

// @desc    Logout user / clear cookies
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  public
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

// @desc    Update users
// @route   GET /api/users
// @access  Private / ADMIN
const getUsers = asyncHandler(async (req, res) => {
  res.send("get all user profile");
});

// @desc    Get Users by id
// @route   GET /api/users/:id
// @access  Private / ADMIN
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

// @desc    Delete users
// @route   DELETE /api/users/:id
// @access  Private / ADMIN
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user profile");
});

// @desc    Update users by id (admin)
// @route   PUT /api/users/:id
// @access  Private / ADMIN
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
