
const { calculatePrice } = require("../calculations/pricingcalculation");

const getPrice = (req, res) => {
  try {
    const { platform, values } = req.body;

    if (!platform || !values) {
      return res.status(400).json({
        success: false,
        message: "Platform and values are required"
      });
    }

    const result = calculatePrice({ platform, values });

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("PRICE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = { getPrice };