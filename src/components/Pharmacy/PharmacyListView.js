import ItemView from './ItemView';

const PharmacyListView = ({pharmacies, deletePharmacy}) => {
    
    return (
<div>
    {pharmacies.map(pharmacy => (<ItemView pharmacy = {pharmacy} deleteUser = {deletePharmacy} />))}
</div>
    );
};

export default PharmacyListView;