import {DessertsTable} from "./ProductsTables/DessertsTable";
import {HotDrinksTable} from "./ProductsTables/HotDrinksTable";
import {AlcoholTable} from "./ProductsTables/AlcoholTable";

export const ProductTableManager = (props) => {
    const {currentProduct} = props


    switch (currentProduct) { //Desserts, HotDrinks, Alcohol
        case "Desserts":
            return (
                <DessertsTable/>
            )

        case "HotDrinks":
            return (
                <HotDrinksTable/>
            )

        case "Alcohol":
            return (
                <AlcoholTable/>
            )

        default:
            return (
                <>
                    there is no such product
                </>
            )
    }


}