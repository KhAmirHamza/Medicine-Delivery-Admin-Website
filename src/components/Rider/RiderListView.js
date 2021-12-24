import ItemView from './ItemView';

const RiderListView = ({riders, deleteRider}) => {
    
    return (
<div>
    {riders.map(rider => (<ItemView rider = {rider} deleteRider = {deleteRider} />))}
</div>
    );
};

export default RiderListView;