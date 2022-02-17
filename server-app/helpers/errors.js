/**
 * Custom error messages
 */

export const ERRORS = {
  NOT_FOUND: () => ({'error':`One of the products was removed from your basket.`}),
  OUT_OF_STOCK: ({name, sku}) => ({'error':`Product ${name}-${sku} is out of stock. Please remove it from you basket`}),
  LOW_STOCK: ({name, sku, stockLevel}) => ({'error':`Product ${name}-${sku} is low in stock. Available ${stockLevel} items`}),
}