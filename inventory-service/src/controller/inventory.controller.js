import { CREATED, OK } from '../core/success.response.js';
import InventoryService from '../service/inventory.service.js';

class InventoryController {
  static async createInventoryForProduct(req, res, next) {
    try {
      const { productId, shopId, quantity } = req.body;
      console.log('Run');
      return new CREATED(
        await InventoryService.createInventoryForProduct({
          productId,
          shopId,
          quantity,
        }),
        'Create success!'
      ).send(res);
    } catch (err) {
      next(err);
    }
  }

  static async increQuantity(req, res, next) {
    try {
      const { productId, shopId, quantity } = req.body;
      return new OK(
        await InventoryService.increQuantityProduct({
          productId,
          shopId,
          quantity,
        }),
        'Create success!'
      ).send(res);
    } catch (err) {
      next(err);
    }
  }
}

export default InventoryController;
