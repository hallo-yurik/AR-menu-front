import React from 'react'
import {Card, Divider, List, Typography} from "antd";
import "../../../../Styles/CreateMenuComponentStyle.css"

export const CreateMenuModalComponent = (props) => {

    const {potentialDessertsArray, potentialHotDrinksArray, potentialAlcoholArray, errors} = props;

    return (
        <>
            {errors.length !== 0 && errors.length !== null
                ? <List.Item>
                    <List.Item.Meta
                        title={<Divider><Typography.Text type="danger">Menu can`t be
                            created</Typography.Text></Divider>}
                        description={
                            errors.map((error) => <div>
                                <Typography.Text type="danger" strong={true}>{error}</Typography.Text>
                            </div>)
                        }
                    />
                </List.Item>
                : null
            }


            <Divider orientation="left">Desserts</Divider>
            {potentialDessertsArray.map((dessert) => (
                <Card
                    title={dessert.name.toUpperCase()}
                    cover={
                        <img
                            alt={dessert.name.toLowerCase() + "Image"}
                            src={dessert.image}
                        />
                    }
                >
                    <List.Item>
                        <List.Item.Meta
                            title={<Divider>Price (UAH)</Divider>}
                            description={dessert.price}
                        />
                    </List.Item>

                    <List.Item>
                        <List.Item.Meta
                            title={<Divider>Ingredients</Divider>}
                            description={
                                dessert.ingredients.map((ingredient) => <div>{ingredient}</div>)
                            }
                        />
                    </List.Item>
                </Card>
            ))}

            <Divider orientation="left">Hot drinks</Divider>

            {potentialHotDrinksArray.map((hotDrink) => (
                <Card
                    title={hotDrink.name.toUpperCase()}
                >
                    <List.Item>
                        <List.Item.Meta
                            title={<Divider>Price (UAH)</Divider>}
                            description={hotDrink.price}
                        />
                    </List.Item>

                    <List.Item>
                        <List.Item.Meta
                            title={<Divider>Volume (ml)</Divider>}
                            description={hotDrink.volume}
                        />
                    </List.Item>

                </Card>


            ))}

            <Divider orientation="left">Alcohol</Divider>

            {potentialAlcoholArray.map((alcohol) => (
                <Card
                    title={alcohol.name.toUpperCase()}
                >
                    <List.Item>
                        <List.Item.Meta
                            title={<Divider>Price (UAH)</Divider>}
                            description={alcohol.price}
                        />
                    </List.Item>

                    <List.Item>
                        <List.Item.Meta
                            title={<Divider>Volume (ml)</Divider>}
                            description={alcohol.volume}
                        />
                    </List.Item>

                </Card>


            ))}
        </>

    )


}