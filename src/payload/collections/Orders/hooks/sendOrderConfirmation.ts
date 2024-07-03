import type { AfterChangeHook } from 'payload/dist/collections/config/types'

import type { Order } from '../../../payload-types'

export const sendOrderConfirmation: AfterChangeHook<Order> = async ({ req, doc, operation }) => {
  const { payload } = req
  let text = ''

  if (doc.paymentMethod === 'revolut') {
    text = `The details for the transfer are as follows:<br/>
    <strong>Account number in IBAN format:</strong><br/>
    LT56 3250 0003 8523 2427<br/>
    <strong>BIC / SWIFT code:</strong><br/>
    REVOLT21 <br/>
    <strong>Total Amount:</strong> <br/>
    €${doc.total}<br/>
    <strong>Reference</strong><br/>
    Order id: ${doc.id}<br/>
    <strong>Company name:</strong><br/>
    UiTeH<br/>
    <strong>Address:</strong><br/>
    Szkolna 1/3, <br/> 
    05-500 Piaseczno, <br/> 
    Poland<br/>`
  } else if (doc.paymentMethod === 'wise') {
    text = `The details for the transfer are as follows:<br/>
    <strong>Account number in IBAN format:</strong><br/>
    BE03 9679 8908 2084<br/>
    <strong>BIC / SWIFT code:</strong> <br/>
    TRWIBEB1XXX<br/>
    <strong>Total Amount:</strong> <br/>
    €${doc.total}<br/>
    <strong>Reference</strong><br/>
    Order id: ${doc.id}<br/>
    <strong>Company name:</strong><br/>
    UiTeH<br/>
    <strong>Address:</strong><br/>
    Szkolna 1/3, <br/> 
    05-500 Piaseczno, <br/> 
    Poland<br/>`
  } else if (doc.paymentMethod === 'crypto') {
    text = `The details for the transfer are as follows:<br/>
    <strong>BTC wallet address:</strong><br/>
    1DZj35SBrLXGPNtp9XnS8E1vArvBmXDtQn<br/>
    <strong>ETH wallet address:</strong><br/>
    0xf4f656a1316838cffebe664d279170ef2ba20e61<br/>`
  } else if (doc.paymentMethod === 'sepa') {
    text = `The details for the transfer are as follows:<br/>
    <strong>Account number in IBAN format:</strong><br/>
    PL05 1140 2004 0000 3512 0691 6805<br/>
    <strong>BIC / SWIFT code:</strong></br>
    BREXPLPWMBK</br>
    <strong>Total Amount:</strong></br>
    €${doc.total}</br>
    <strong>Reference</strong></br>
    Order id: ${doc.id}</br>
    <strong>Company name:</strong><br/>
    UiTeH<br/>
    <strong>Address:</strong><br/>
    Szkolna 1/3, <br/> 
    05-500 Piaseczno, <br/> 
    Poland<br/>`
  }
  if (operation === 'create') {
    await payload.sendEmail({
      to: doc.email,
      from: 'shop@planet-of-mushrooms.com',
      subject: 'New Order',
      html:
        '<b>Hey there!</b><br/>Thank you for your order. Total Amount of your order is: €' +
        doc.total +
        '.' +
        '<br/>' +
        'Your payment methof is: ' +
        doc.paymentMethod +
        '<br/>' +
        '<p>' +
        text +
        '</p>',
    })
  }
  if (operation === 'update') {
    if (doc.privateMessage === true) {
      await payload.sendEmail({
        to: doc.email,
        from: 'shop@planet-of-mushrooms.com',
        subject: 'Private Message',
        html: doc.messageContent + '<br/>',
      })
    } else {
      await payload.sendEmail({
        to: doc.email,
        from: 'shop@planet-of-mushrooms.com',
        subject: 'Order Updated',
        html:
          '<b>Hey there!</b><br/>You order is now updated' +
          '<br/>' +
          'Status of your order is: ' +
          doc.orderStatus +
          '<br/>',
      })
    }
  }

  return
}
