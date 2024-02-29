import {
  BadRequestError,
  InternalServerError,
} from '../core/error.response.js';
import { CREATED } from '../core/success.response.js';
import ShopRepository from '../pg/repository/shop.repository.js';

class ShopService {
  static createNewShop = async ({ shop_owner, shop_name }) => {
    const shopExist = await ShopRepository.findByShopOwnerOrShopName({
      shop_owner,
      shop_name,
    });
    if (shopExist) throw new BadRequestError('Shop of user already exist!');
    const newShop = await ShopRepository.createNewShop({
      shop_owner,
      shop_name,
    });
    if (!newShop) {
      throw new InternalServerError('DB error!');
    }
    return new CREATED('Create shop successfully!', newShop);
  };
}

export default ShopService;
