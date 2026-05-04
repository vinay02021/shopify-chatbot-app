import mongoose from "mongoose";

const shopSettingSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true,
    unique: true,
  },

  chatEnabled: {
    type: Boolean,
    default: false,
  },
});

export const ShopSetting = mongoose.model("ShopSetting", shopSettingSchema);