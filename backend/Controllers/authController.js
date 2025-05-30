const User = require("../models/Usermodel");

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
