import { query } from '../db.query.js';

const DATABASE_NAME = 'inventory-service';

class InventoryRepository {
  static async createInventory({ productId, shopId, quantity }) {
    console.log(productId, shopId, quantity);
    const queryString = {
      text: `
        INSERT INTO "${DATABASE_NAME}" (inven_product_id, inven_shop_id, inven_stock)
        VALUES ($1, $2, $3)
        RETURNING inven_product_id
      `,
      values: [productId, parseInt(shopId), quantity],
    };

    const data = await query(queryString);
    return data[0];
  }

  static async findByProductIdAndShopId({ productId, shopId }) {
    const queryString = `
        SELECT * FROM "${DATABASE_NAME}" 
        WHERE inven_product_id = '${productId}'
          AND
          inven_shop_id = '${shopId}' 
      `;
    const data = await query(queryString);
    return data[0];
  }

  static async increQuantityProduct({ productId, shopId, quantity }) {
    const queryString = `
      UPDATE "${DATABASE_NAME}"
      SET inven_stock = CASE
        WHEN (inven_stock + ${quantity}) > 0 THEN (inven_stock + ${quantity})
        ELSE inven_stock
      END
      WHERE inven_product_id = '${productId}' AND inven_shop_id = '${shopId}'
      RETURNING inven_product_id, inven_stock
    `;
    const data = await query(queryString);
    return data[0];
  }
}

export default InventoryRepository;
