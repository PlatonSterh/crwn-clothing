import { connect } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cartSelectors';
import { createStructuredSelector } from 'reselect';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import  './CheckoutPage.scss';
import StripeButton from '../../components/StripeButton/StripeButton';

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

const Checkout = ({ cartItems, total }) => {
    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
            }
            <div className="total"><span>TOTAL: ${ total }</span></div>
            <div className="test-warning">
                *Please use the following test credit card for payments*
                <br />
                4242 4242 4242 4242 - Exp: 01 / 20 - CVC: 123
                <br />
            </div>
            <StripeButton price={total} />
        </div>
    );
}

export default connect(mapStateToProps)(Checkout);