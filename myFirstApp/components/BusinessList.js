import React, {Component} from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Spinner } from 'native-base';
import { connect } from "react-redux";
import BusinessListItem from "./BusinessListItem";

class BusinessList extends Component {

    render() {

        // SORT LIST
        let sorted = this.props.data.slice(0);
        sorted.sort(function(a, b){
            return a.distance - b.distance;
        });
        console.log("SORTED");
        console.log(sorted);

        // use sorted version to create ListItems
        const myList = sorted.map((item) => {
            return (
                <BusinessListItem {...item} key={item.id}/>
            );
        });

        return (
            <List>
                {myList}
            </List>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    };
};

export default connect(mapStateToProps)(BusinessList);