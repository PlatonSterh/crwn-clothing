import './CollectionsOverview.scss';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectCollectionForPreview } from '../../redux/shop/shopSelectors';
import CollectionPreview from '../CollectionPreview/CollectionPreview';

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
});


const CollectionsOverview = ({ collections }) => {
    return (
        <div className="collections-overview">
            {
                collections.map(({id, ...otherCollectionProps}) => {
                    return <CollectionPreview key={id} {...otherCollectionProps} />
                })
            }
        </div>
    );
}

export default connect(mapStateToProps)(CollectionsOverview);