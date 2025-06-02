const jwt = require("jsonwebtoken");
const User = require("../models/Usermodel");


//entaha rotes ellam pathukaknumo athukelm intha rotes ai appli pnnipam 


exports.userAuthenticate = async (req, res, next) => {
  const { token } = req.cookies; // requestala anupina cookiesla irunthu toke a edukuram..ithaaccess panumenil cookie-parser middleware thevai atha server.jsla add panuvam
  if (!token) {
    return res
      .status(401)
      .json({ message: "Login first otherwise you canot access" });
  }

  const decodeddata = jwt.verify(token, process.env.JWT_SECRET);
  try {
    req.userrr = await User.findById(decodeddata.id); //idyathane decodepanninam..so encode panum pothu antha id kidachirukum..antha idya vachu usermodela iruthu avarukuriyadatava eduthu athai reqestla oru proprtyname la save panni vaikuram..adutha midlewareku anuppa
    next(); //to call next middleware
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
