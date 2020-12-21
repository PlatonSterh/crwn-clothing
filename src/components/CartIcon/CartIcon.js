import { connect } from 'react-redux';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartHidden } from '../../redux/cart/cartActions';
import { selectCartItemsCount } from '../../redux/cart/cartSelectors';
import './CartIcon.scss';

const mapStateToProps = state => {
    return {
        itemCount: selectCartItemsCount(state)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        toggleCartHidden: (() => dispatch(toggleCartHidden()))
    };
}

const CartIcon = ({ itemCount, toggleCartHidden }) => {
    return (
        <div onClick={toggleCartHidden} className="cart-icon">
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{ itemCount }</span>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);