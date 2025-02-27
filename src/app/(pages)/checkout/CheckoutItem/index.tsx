import Link from 'next/link'

import { Media } from '../../../_components/Media'

import classes from './index.module.scss'

export const CheckoutItem = ({ product, title, metaImage, quantity, index, price, subtotal }) => {
  return (
    <li className={classes.item} key={index}>
      <Link href={`/products/${product.slug}`}>
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>€{price}
        </div>
        <p className={classes.quantity}>x{quantity}</p>
      </div>

      <div className={classes.subtotal}>€{subtotal}</div>
    </li>
  )
}
