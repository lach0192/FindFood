import { BUSINESS_CLICKED, FETCH_DATA_SUCCESS, GOING_BACK, IS_FETCHING_DATA} from "./actions";

export default function reducers(state, action) {
    let modifiedState = Object.assign({}, state);

    switch(action.type) {
        case BUSINESS_CLICKED:

            let business = action.business;

            console.log("CLICKED ON");
            console.log(business);

            // set the selectBusiness in the state to the business clicked
            modifiedState.selectedBusiness = business;

            break;
        case IS_FETCHING_DATA:

            modifiedState.isFetching = action.isFetching;

            break;
        case GOING_BACK:

            modifiedState.isGoingBack = action.isGoingBack;

            break;
        case FETCH_DATA_SUCCESS:

            // to avoid state mutation
            let newBusinessData = modifiedState.data.map((i) => {
                return Object.assign({}, i);
            });

            for(let i = 0; i < action.data.businesses.length; i++){

                let id = action.data.businesses[i].id;
                let name = action.data.businesses[i].name;
                let phone = action.data.businesses[i].phone;
                let distance = action.data.businesses[i].distance;
                let rating = action.data.businesses[i].rating;
                let price = action.data.businesses[i].price;
                let image_url = action.data.businesses[i].image_url;

                let business = {
                    id: id,
                    name: name,
                    phone: phone,
                    distance: distance,
                    rating: rating,
                    price: price,
                    image_url: image_url
                };

                newBusinessData.push(business);
            }

            modifiedState.data = newBusinessData;

            console.log("modifiedState.data");
            console.log(modifiedState.data);

            break;
        default:
            return state;
    }

    return modifiedState;
}