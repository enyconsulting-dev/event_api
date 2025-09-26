const verifyAPI = (req: any, res: any, next: any) => {
  try {
    const { version } = req.params;

    if (version == "1") {
      next();
      return;
    }

    return res
      .status(401)
      .json({
        success: false,
        error: `Invalid API version v${version}, Refer to the Documentation for more information.`,
      });
  } catch (error) {
    onAPIinvalid(req, res);
  }
};

const APIVerified = (req: any, res: any) => {
  return res
    .status(200)
    .json({
      success: true,
      message: "Welcome 🚀",
    });
};

const onAPIinvalid = (req: any, res: any) => {
  return res
    .status(401)
    .json({
      success: false,
      error: `Invalid use of API, Refer to the Documentation for more information.`,
    });
};

export { verifyAPI, onAPIinvalid, APIVerified };
