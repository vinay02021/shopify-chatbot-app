import { SessionModel } from "../models/Session.js";
import { Session } from "@shopify/shopify-api";

export class MongoSessionStorage {
  async storeSession(session) {
    await SessionModel.findOneAndUpdate(
      { id: session.id },
      {
        id: session.id,
        shop: session.shop,
        state: session.state,
        isOnline: session.isOnline,
        scope: session.scope,
        expires: session.expires,
        accessToken: session.accessToken,
        onlineAccessInfo: session.onlineAccessInfo,
        payload: session.toObject()
      },
      { upsert: true, new: true }
    );

    return true;
  }

  async loadSession(id) {
    const record = await SessionModel.findOne({ id });

    if (!record) {
      return undefined;
    }

    return new Session({
      ...record.payload,
      expires: record.payload.expires ? new Date(record.payload.expires) : undefined
    });
  }

  async deleteSession(id) {
    await SessionModel.deleteOne({ id });
    return true;
  }

  async deleteSessions(ids) {
    await SessionModel.deleteMany({ id: { $in: ids } });
    return true;
  }

  async findSessionsByShop(shop) {
    const records = await SessionModel.find({ shop });
    return records.map(
      (record) =>
        new Session({
          ...record.payload,
          expires: record.payload.expires ? new Date(record.payload.expires) : undefined
        })
    );
  }
}
