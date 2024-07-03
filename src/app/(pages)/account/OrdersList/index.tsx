import React from 'react'
import Link from 'next/link'

import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { Gutter } from '../../../_components/Gutter'
import { HR } from '../../../_components/HR'
import { RenderParams } from '../../../_components/RenderParams'
import { formatDateTime } from '../../../_utilities/formatDateTime'

import classes from './index.module.scss'

interface Props {
  orders: Order[] // Deklaracja props orders jako tablicy typu Order
}

const OrdersList: React.FC<Props> = ({ orders }) => {
  // console.log('dupa1')
  // console.log(orders.length)
  // console.log('dupa2')
  return (
    <div>
      {(!orders || !Array.isArray(orders) || orders?.length === 0) && (
        <p className={classes.noOrders}>You have no orders.</p>
      )}
      <RenderParams />
      {orders && orders.length > 0 && (
        <ul className={classes.ordersList}>
          {orders?.map((order, index) => (
            <li key={order.id} className={classes.listItem}>
              <Link className={classes.item} href={`/orders/${order.id}`}>
                <div className={classes.itemContent}>
                  <h6 className={classes.itemTitle}>{`Order ${order.id}`}</h6>
                  <div className={classes.itemMeta}>
                    <p>{`Ordered On: ${formatDateTime(order.createdAt)}`}</p>
                    <p>
                      {'Total: €'}
                      {order.total}
                    </p>
                  </div>
                </div>
                <Button
                  appearance="secondary"
                  label="View Order"
                  className={classes.button}
                  el="button"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default OrdersList
