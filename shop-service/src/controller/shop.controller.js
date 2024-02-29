import { CREATED } from '../core/success.response.js';
import ShopService from '../service/shop.service.js';

class ShopController {
  static async createNewShop(req, res, next) {
    try {
      const user = req.user;
      const { shop_name } = req.body;
      console.log(user, shop_name);
      const data = await ShopService.createNewShop({
        shop_owner: user.id,
        shop_name,
      });
      return new CREATED(data, 'Register shop successfully!').send(res);
    } catch (err) {
      next(err);
    }
  }
}

export default ShopController;
