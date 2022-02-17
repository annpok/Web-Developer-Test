export const MENU = [
  {title: 'Products', path: '#'},
  {title: 'News', path: '#'},
  {title: 'Contact', path: '#'},
  {title: 'Your Cart', icon:true, path: '/cart' }
  ];

export const cartGridFields = [
    {title: 'Product',type: 'data', prop: 'name'},
    {title: 'Price',type: 'data', prop: 'name'},
    {title: 'Quantity', type: 'component', prop: 'QuantityButton'},
    {title: 'Cost',type: 'data', prop: 'name'},
    ]
