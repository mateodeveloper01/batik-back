import mercadopago from 'mercadopago';

 const createMpPreference = async({billing, products, shipping, user})=>{

      const payer = {
        name: billing.name || shipping.name,
        surname: billing.surname || shipping.surname,
        email: user.email,
        address: {
          street_name: billing.street_name || shipping.street_name,
          street_number:
            Number(billing.street_number) || Number(shipping.street_number),
        },
        identification: {
          type: billing.identification_type,
          number: billing.identification_num,
        },
        // phone: {
        //   number: billing.phone_num || shipping.phone_number,
        //   area_code: `+54${billing.phone_area_code || shipping.phone_area_code}`,
        // },
      };
    
      const shipments = {
        mode: "not_specified",
        cost: 100,
        free_shipping: false,
        receiver_address: {
          zip_code: shipping.zip_code,
          street_name: shipping.street_name,
          city_name: shipping.city,
          street_number: Number(shipping.street_number),
          floor: shipping.floor,
          apartment: undefined,
          state_name: shipping.province,
        },
      };
      const items = products.map((i) => {
        const { title, description, img, quantity, id, isNew, price } = i;
        return {
          title,
          description,
          picture_url: img,
          quantity,
          currency_id: "ARS",
          unit_price: Number(price),
        };
      });
    
      const result = await mercadopago.preferences.create({
        items,
        payer,
        shipments,
        metadata:{id:Math.random()},
        back_urls: {
          success: `${process.env.LOCAL_URL}/api/mp/success`,
          failure: `${process.env.LOCAL_URL}/api/mp/failure`,
          pending: `${process.env.LOCAL_URL}/api/mp/pending`,
        },
        notification_url: `https://1360-168-90-72-99.ngrok-free.app/api/mp/webhook`,
        external_reference: "http://localhost:3000/acount",
        marketplace: 'estoyre-loc123',
      });

      return result
}

export default createMpPreference