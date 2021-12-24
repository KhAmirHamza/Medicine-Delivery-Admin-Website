import React from 'react';
import ItemView from './ItemView';

const SliderListView = ({sliders, deleteSlider}) => {
    return (
        <div>
            {sliders.map(slider => (<ItemView slider = {slider} deleteSlider = {deleteSlider} />))}
        </div>
    );
};

export default SliderListView;