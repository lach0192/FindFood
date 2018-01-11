import React, {Component} from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Card, CardItem, Spinner, Thumbnail } from 'native-base';
import { connect } from "react-redux";
import * as actions from "../actions";
import BusinessList from "../components/BusinessList";
import { Image } from "react-native";

class Main extends Component {

    render() {

        let mainContent = {};
        let backButton = <Left />;

        if(this.props.isGoingBack){
            mainContent = <BusinessList/>;
        }
        else if(this.props.selectedBusiness){

            let distance = Math.round((this.props.selectedBusiness.distance / 1000) * 100) / 100;

            backButton =
                <Left>
                    <Button transparent onPress={this.props.backToList}>
                        <Icon name='arrow-back' />
                        <Text>Back</Text>
                    </Button>
                </Left>;

            mainContent =

                <Card>
                    <CardItem>
                        <Left>
                            <Body>
                            <Text>{this.props.selectedBusiness.name}</Text>
                            <Text note>{distance}km</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={{uri: this.props.selectedBusiness.image_url}} style={{height: 247, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>Rating: {this.props.selectedBusiness.rating}</Text>
                        </Left>
                        <Body>
                            <Text>Price: {this.props.selectedBusiness.price}</Text>
                        </Body>
                        <Right>
                            <Text>{this.props.selectedBusiness.phone}</Text>
                        </Right>
                    </CardItem>
                </Card>;
        }
        else if(this.props.isFetching){
            mainContent = <Spinner/>;
        }
        else if(!this.props.data[0]) {
            mainContent = <Button full light onPress={this.props.fetchData}><Text>Load</Text></Button>;
        }
        else{
            mainContent = <BusinessList/>;
        }

        return (
            <Container>
                <Header>
                    {backButton}
                    <Body>
                    <Title>Find Food</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    {mainContent}
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full>
                            <Text>Eric Lachapelle</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        selectedBusiness: state.selectedBusiness,
        isFetching: state.isFetching,
        isGoingBack: state.isGoingBack,
        backToList: state.backToList,
        fetchData: state.fetchData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(actions.fetchData()),
        backToList: () => dispatch(actions.backToList())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);