import axios from "axios";

export const BUSINESS_CLICKED = "BUSINESS_CLICKED";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const IS_FETCHING_DATA = "IS_FETCHING_DATA";
export const GOING_BACK = "GOING_BACK";

export function businessClicked(business){
    return {
        type: BUSINESS_CLICKED,
        business: business
    };
}

export function fetchDataSuccess(data) {
    return {
        type: FETCH_DATA_SUCCESS,
        data: data
    };
}

export function isFetchingData(isFetching){
    return {
        type: IS_FETCHING_DATA,
        isFetching: isFetching
    };
}

export function goingBack(isGoingBack){
    return{
        type: GOING_BACK,
        isGoingBack: isGoingBack
    };
}

export function backToList(){
    return (dispatch)=>  {
        dispatch(goingBack(true));
    };
}

export function fetchData() {
    return (dispatch)=> {

        dispatch(isFetchingData(true));

        navigator.geolocation.getCurrentPosition(
            (position) => {

                console.log("in getGeo..");

                dispatch(fetchList(position.coords.latitude, position.coords.longitude));

                console.log("coords: " + position.coords.latitude + position.coords.longitude);
            },
            (error) => {
                console.log("Error", error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    };
}

export function fetchList(lat, long) {
    return (dispatch) => {

        console.log("in fetchList..");

        let key = "5m37VsCznPOv7nzFyERThZREpRDDa8_VrtRQh49IOPFUYGmUGzH_HdDtALSBHPr-xEGVGATWWb7P6DfhtAaGfignphljtZ4v5XwJ_UkeiRxzbNbxbXHLsM2w52VNWnYx";
        let url = "https://api.yelp.com/v3/businesses/search?latitude=" + lat + "&longitude=" + long;

        let options = {
            headers: {
                "Authorization": "Bearer " + key
            }
        };
        axios.get(url, options).then((response) => {

            console.log(response);
            return response.data;

        }).then((data) => {

            dispatch(isFetchingData(false));
            dispatch(fetchDataSuccess(data));
        }).catch(function (error) {
            console.log('error: ' + error.message);
            throw error;
        });
    };
}