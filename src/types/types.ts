export interface orderProp {
  shipping: shippingProp;
  products: productsProp[];
  billing: billingProp;
  user:{email:string}
}

interface billingProp {
  name: string;
  surname: string;
  phone_area_code: string;
  phone_num: string;

  identification_type: string;        
  identification_num: string;

  zip_code: string;
  street_name: string;
  street_number: string;
}

interface shippingProp {
  name: string;
  surname: string;

  phone_number: string;
  phone_area_code: string;

  province: string;
  city: string;
  street_name: string;
  street_number: string;
  zip_code: string;
  floor: string;
  department: string;
  observations: string;
}

interface productsProp {
  price: number;
  title: string;
  isNew: boolean;
  id: string | never;
  img: any;
  quantity: number;
  description: string;
}
