
const pricingdata = {
  instagram: {
    likes: { baseQty: 100, price: 5.0 },
    views: { baseQty: 1000, price: 2.8 },
    followers: { baseQty: 100, price: 2.70 },
    comments: { baseQty: 100, price: 4.0 },
    shares: { baseQty: 1000, price: 2.5}   
  },
  youtube: {
    likes: { baseQty: 200, price: 4.0 },
    views: { baseQty: 4000, price: 4.5 },
    subscribers: { baseQty: 100, price: 5.7 },
    comments: { baseQty: 100, price: 3.5 },
    shares:{ baseQty: 1000, price: 4.5 }
  },
  tiktok: {
    likes: { baseQty: 300, price: 2.6 },
    views: { baseQty: 2500, price: 3.5 },
    comments: { baseQty: 100, price: 2.5 },
    followers: { baseQty: 200, price: 3.7 },
    shares: { baseQty: 1000, price: 3.5 }
  },
  facebook: {
    likes: { baseQty: 100, price: 1.5 },
    views: { baseQty: 1000, price: 0.8 },
    followers: { baseQty: 200, price: 2.5 },
    shares: { baseQty: 1000, price: 1.2 }
  }
};

const calculatePrice = ({ platform, values }) => {
  let total = 0;
  const items = {};

  Object.keys(values).forEach((type) => {
    const qty = values[type];

    const config = pricingdata[platform]?.[type];
    if (!config || qty <= 0) return;

    const { baseQty, price } = config;

    const unitPrice = price / baseQty;

    let totalPrice;

    // 🔥 Minimum base price logic
    if (qty < baseQty) {
      totalPrice = price;
    } else {
      totalPrice = qty * unitPrice;
    }

    items[type] = {
      quantity: qty,
      baseQty,
      unitPrice: Number(unitPrice.toFixed(5)),
      price: Number(totalPrice.toFixed(2))
    };

    total += totalPrice;
  });

  return {
    items,
    total: Number(total.toFixed(2))
  };
};

module.exports = { calculatePrice };