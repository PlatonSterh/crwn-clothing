import './collection-preview.styles.scss';
import CollectionItem from '../collection-item/collection-item.component.jsx';
import { Link, withRouter } from 'react-router-dom';

const CollectionPreview = ({ title, items, routeName, match }) => {
    return (
        <div className="collection-preview">
            <Link to={`${match.path}/${routeName}`}><h1 className="title">{ title.toUpperCase() }</h1></Link>
            <div className="preview">
                {
                    items.filter((item, index) => index < 4).map((item) => {
                        return <CollectionItem key={item.id} item={item} />;
                    })
                }
            </div>
        </div>
    );
}

export default withRouter(CollectionPreview);