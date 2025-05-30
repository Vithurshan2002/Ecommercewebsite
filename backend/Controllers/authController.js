const User = require("../models/Usermodel");
const sendEmail = require("../utils/email");

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;
    const data = await User.create({
      name,
      email,
      password,
      avatar,
    });

    const token = data.getJWTToken(); // naam munku scemala create panan token generationkkan functiona mela nam data entra veriable ka userdatavudan and antha methodum irukum. so namea vachu antha methoda call pani token ccreate panuram
    //setting cookie.. reqesta token vachu anupi routesa protexct panuvathai viada kookela anupina athu iinum safe
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000 // Date.now() means ipavulla timela irunthu evalavu neram cookies expiresa irukanum enapathai plus poddu milli secondla kudukanum.. so 7daythan token expire time so cookieim 7 naal thn irukanum enpataal 7 naali milli secondala kudukuram
      ),
      httpOnly: true, //  intha cookiea http requesta than usepananum javascipt objectla use panna mudiyathu enpathaum kudukuram
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json({ message: data, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Password or Email is empty" });
  }
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Password / Email is invalid" });
    }

    //check password corect or not
    const ismatch = await user.isValidPassword(password);
    console.log(ismatch);
    if (!ismatch) {
      return res.status(401).json({ message: "Password / Email is invalid" });
    }
    const token = user.getJWTToken();
    //setting cookie.. reqesta token vachu anupi routesa protexct panuvathai viada kookela anupina athu iinum safe
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000 // Date.now() means ipavulla timela irunthu evalavu neram cookies expiresa irukanum enapathai plus poddu milli secondla kudukanum.. so 7daythan token expire time so cookieim 7 naal thn irukanum enpataal 7 naali milli secondala kudukuram
      ),
      httpOnly: true, //  intha cookiea http requesta than usepananum javascipt objectla use panna mudiyathu enpathaum kudukuram
    };

    //cookieya anupa cookie() metho d iruku athanul muthavathu parametr entha data vaanupaporamio atha objecta keyai muthal parametr e aka kudupam,next parmeter athan value ,next optionsa
    res
      .status(200)
      .cookie("token", token, options)
      .json({ message: user, token: token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

//logout panumenlil naam vachiturkum tokena illmal panile locout paninathuku samam
exports.logoutUser = (req, res, next) => {
  res
    .cookie("token", null, {
      //cooke anupeka enna sehamo athepolathan but antha cookela token valueva null a kuduthu viduram
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({ message: "logout" });
};

/* ithakaka  new  rout create pananum authrouteka */

//reset password
exports.forgetPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }); // emaila user kusuthuthane forget password seivar so antha eamla vankuram
  try {
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with ths email " });
    }
    console.log(user);
    const resettoken = user.getresetToken(); // getusertoken funvction runa akum pothu resettoken and expiresdatea generate pannidu atahi databasela add pannidu tokenaium return pannum .. but atha nanm inum databasela store pannala ..atha store pannanum..so atha seiya save methoda keela call panuran
    await user.save({ validateBeforeSave: false }); // save pannum pothu entah oru validation errorum vanthida koodathu enpthall athakaka oru propery kudukamm..eennne nan entha oru errorhandling workum inku seiyala like try catch pontra like other dtabase methods

    //create a reset url
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/password/reset/${resettoken}`; //req.protocaol en kuduthu http enpathai edukalam..and req.get('host') call pani hots ip ai edukalam

    //message that is sent to email
    const message = `Your password reset url is as follows\n\n
    ${resetUrl} \n\n if you have not requested this email,then ignore it`;

    sendEmail({
      email: user.email,
      subject: "Ultrashop password recovery",
      message: message,
    });

    res.status(200).json({ message: `Email send to ${user.email}` });
  } catch (err) {
    //email poavthul ethum error vantha ..antha avrukaka crate panan token exiredate thevajil databasela atha remove opanidu thirupma save paani vidyvam
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({ message: err.message });
  }
};
